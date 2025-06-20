import argparse
import json
import os
import sys
from typing import Dict, Any, Set, List, Optional

# Define type aliases for clarity
JsonDict = Dict[str, Any]
JsonList = List[Any]

def parse_arguments() -> argparse.Namespace:
    """Parses command-line flags and returns configuration."""
    parser = argparse.ArgumentParser(
        description="Clean an OpenAPI JSON file by removing internal tags."
    )

    # Define command-line flags
    parser.add_argument(
        "-i", "--input",
        required=True,
        help="Path to the input OpenAPI JSON file"
    )
    parser.add_argument(
        "-o", "--output",
        help="Path to the output OpenAPI JSON file (optional). "
             "Defaults to <input_name>.cleaned.<ext>"
    )

    args = parser.parse_args()

    # Set default output file if not provided
    if not args.output:
        base, ext = os.path.splitext(args.input)
        dir_name = os.path.dirname(base)
        file_name = os.path.basename(base)
        # Handle cases where input might be in the current directory
        if dir_name:
             args.output = os.path.join(dir_name, f"{file_name}.cleaned{ext}")
        else:
             args.output = f"{file_name}.cleaned{ext}"

    return args

def read_openapi_file(file_path: str) -> Optional[JsonDict]:
    """Reads and parses the OpenAPI JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            if not isinstance(data, dict):
                print(f"Error: Input file '{file_path}' does not contain a valid JSON object.", file=sys.stderr)
                return None
            return data
    except FileNotFoundError:
        print(f"Error: Input file not found: {file_path}", file=sys.stderr)
        return None
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON in file '{file_path}': {e}", file=sys.stderr)
        return None
    except IOError as e:
        print(f"Error reading file '{file_path}': {e}", file=sys.stderr)
        return None

def check_property_internal(prop: JsonDict) -> bool:
    """Checks if a single property is marked as internal."""
    if not isinstance(prop, dict):
        return False

    # Check if property is marked as internal
    prop_x_internal = prop.get("x-internal", False)
    if isinstance(prop_x_internal, bool) and prop_x_internal:
        return True

    # Check if property's schema is marked as internal
    return is_schema_internal(prop)

def is_schema_internal(schema: JsonDict) -> bool:
    """Checks if a schema is marked as internal."""
    if not isinstance(schema, dict):
        return False

    # Check if schema itself is marked as internal
    x_internal = schema.get("x-internal", False)
    if isinstance(x_internal, bool) and x_internal:
        return True

    # Check properties of the schema
    properties = schema.get("properties", {})
    if not isinstance(properties, dict):
        return False

    return any(check_property_internal(prop) for prop in properties.values())

def check_content_schema(content: JsonDict) -> bool:
    """Checks if any schema in content is internal."""
    if not isinstance(content, dict):
        return False
    return any(is_schema_internal(media_type.get("schema", {}))
              for media_type in content.values()
              if isinstance(media_type, dict))

def check_request_body(request_body: JsonDict) -> bool:
    """Checks if request body schema is internal."""
    if not isinstance(request_body, dict):
        return False
    return check_content_schema(request_body.get("content", {}))

def check_responses(responses: JsonDict) -> bool:
    """Checks if any response schema is internal."""
    if not isinstance(responses, dict):
        return False
    return any(check_content_schema(response.get("content", {}))
              for response in responses.values()
              if isinstance(response, dict))

def check_parameters(parameters: List[Any]) -> bool:
    """Checks if any parameter schema is internal."""
    if not isinstance(parameters, list):
        return False
    return any(is_schema_internal(param.get("schema", {}))
              for param in parameters
              if isinstance(param, dict))

def is_operation_internal(operation: JsonDict) -> bool:
    """Checks if an operation or its request/response schemas are marked as internal."""
    if not isinstance(operation, dict):
        return False

    # Check if operation itself is marked as internal
    x_internal = operation.get("x-internal", False)
    if isinstance(x_internal, bool) and x_internal:
        return True

    # Check request body, responses, and parameters
    return (check_request_body(operation.get("requestBody", {})) or
            check_responses(operation.get("responses", {})) or
            check_parameters(operation.get("parameters", [])))

def find_internal_tags(openapi_data: JsonDict) -> Set[str]:
    """Identifies tags associated with operations marked as internal."""
    internal_tags: Set[str] = set()
    paths = openapi_data.get("paths", {})

    if not isinstance(paths, dict):
        print("Warning: 'paths' field is missing or not a dictionary.", file=sys.stderr)
        return internal_tags

    for _, path_item_raw in paths.items():
        collect_internal_tags_from_path(path_item_raw, internal_tags)

    return internal_tags

def collect_internal_tags_from_path(path_item_raw: Any, internal_tags: Set[str]) -> None:
    """Extracts internal tags from a path item."""
    if not isinstance(path_item_raw, dict):
        return # Skip if path item is not a dictionary

    path_item: JsonDict = path_item_raw
    for method, operation_raw in path_item.items():
        # Skip non-operation fields like 'parameters' or extensions 'x-*'
        # Standard HTTP methods are typically lowercase in OpenAPI spec,
        # but check explicitly known fields to be safe.
        if method in ["parameters", "servers", "summary", "description"] or \
           (isinstance(method, str) and method.startswith('x-')):
            continue

        collect_internal_tags_from_operation(operation_raw, internal_tags)

def collect_internal_tags_from_operation(operation_raw: Any, internal_tags: Set[str]) -> None:
    """Extracts internal tags from an operation if marked 'x-internal' or uses internal schema."""
    if not isinstance(operation_raw, dict):
        return # Skip if operation is not a dictionary

    operation: JsonDict = operation_raw

    # Check if operation or its schemas are internal
    if not is_operation_internal(operation):
        return # Not marked as internal

    # If internal, collect its tags
    tags_raw = operation.get("tags", [])
    if not isinstance(tags_raw, list):
        return # Tags should be a list

    for tag_raw in tags_raw:
        if isinstance(tag_raw, str):
            internal_tags.add(tag_raw)

def filter_internal_tags(openapi_data: JsonDict, implicit_internal_tags: Set[str]) -> None:
    """Removes internal tags from the top-level 'tags' array."""
    tags_raw = openapi_data.get("tags")

    if not isinstance(tags_raw, list):
        # If 'tags' field is missing or not a list, there's nothing to filter
        return

    filtered_tags: JsonList = []
    for tag_raw in tags_raw:
        if not isinstance(tag_raw, dict):
            # Preserve tags that are not dictionaries (though unusual in spec)
            filtered_tags.append(tag_raw)
            continue

        tag: JsonDict = tag_raw
        name = tag.get("name")
        if not isinstance(name, str):
            # Preserve tags without a valid string name (unusual)
            filtered_tags.append(tag)
            continue

        # Check if explicitly marked as internal in the tag definition
        tag_x_internal = tag.get("x-internal", False)
        is_explicitly_internal = isinstance(tag_x_internal, bool) and tag_x_internal

        # Check if implicitly internal (all operations using it are internal)
        is_implicitly_internal = name in implicit_internal_tags

        if is_explicitly_internal or is_implicitly_internal:
            print(f"Removing internal tag: {name}")
            continue # Skip this tag

        # If not internal, keep it
        filtered_tags.append(tag)

    # Update the OpenAPI data with the filtered list
    openapi_data["tags"] = filtered_tags

def write_openapi_file(openapi_data: JsonDict, output_path: str) -> bool:
    """Writes the modified OpenAPI document to a file."""
    try:
        with open(output_path, 'w', encoding='utf-8') as file:
            # Use indent=2 for pretty printing, matching Go's MarshalIndent
            json.dump(openapi_data, file, indent=2, ensure_ascii=False)
        return True
    except IOError as e:
        print(f"Error writing to output file '{output_path}': {e}", file=sys.stderr)
        return False
    except TypeError as e:
        # This might happen if the data structure became invalid somehow
        print(f"Error serializing data to JSON: {e}", file=sys.stderr)
        return False

def main() -> None:
    """Main execution function."""
    args = parse_arguments()

    # Read and parse OpenAPI file
    openapi_data = read_openapi_file(args.input)
    if openapi_data is None:
        sys.exit(1)

    # Find tags associated only with internal operations
    implicit_internal_tags = find_internal_tags(openapi_data)

    # Filter out tags marked as internal (explicitly or implicitly)
    filter_internal_tags(openapi_data, implicit_internal_tags)

    # Write modified OpenAPI file
    if not write_openapi_file(openapi_data, args.output):
        sys.exit(1)

    print(f"Processed OpenAPI file and removed internal tags. Output written to {args.output}")

if __name__ == "__main__":
    main()