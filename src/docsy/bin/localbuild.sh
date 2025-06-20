#!/bin/bash
# Local build script for Hugo documentation site

set -e

# Get the repository root directory
REPO_ROOT="$(git rev-parse --show-toplevel)"
DOCSY_DIR="$REPO_ROOT/src/hugo/docsy"
SPEC_DIR="$REPO_ROOT/spec"

echo "Repository root: $REPO_ROOT"
echo "Working in: $DOCSY_DIR"

# Check for required tools
check_dependencies() {
    if ! command -v yarn &> /dev/null; then
        echo "Error: yarn is not installed. Please install yarn first."
        exit 1
    fi

    if ! command -v hugo &> /dev/null; then
        echo "Error: hugo is not installed. Please install hugo first."
        exit 1
    fi

    # Check Hugo version
    HUGO_VERSION=$(hugo version | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | cut -d'v' -f2)
    REQUIRED_VERSION="0.147.6"
    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$HUGO_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        echo "Error: Hugo version $REQUIRED_VERSION or higher is required. Current version: $HUGO_VERSION"
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        echo "Error: jq is not installed. Please install jq first."
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        echo "Error: npm is not installed. Please install npm first."
        exit 1
    fi
}

# Clean up function
clean() {
    rm -rf "$DOCSY_DIR/docs.endorlabs.com"
    rm -rf "$DOCSY_DIR/resources"
    rm -rf "$DOCSY_DIR/node_modules"
    rm -rf "$DOCSY_DIR/.hugo_build.lock"
    rm -rf "$DOCSY_DIR/public"
    rm -rf "$DOCSY_DIR/assets/vendor"
}

# Create go.mod file
create_mod() {
    cat <<EOF >"$DOCSY_DIR/go.mod"
module github.com/endorlabs/docs

go 1.21

require (
    github.com/google/docsy v0.12.0 // indirect
    github.com/google/docsy/dependencies v0.7.2 // indirect
)
EOF
    cd "$DOCSY_DIR" && hugo mod verify
}

# Setup theme assets
setup_theme() {
    echo "Setting up theme assets..."
    cd "$DOCSY_DIR" && yarn install
    mkdir -p "$DOCSY_DIR/assets/vendor"
}

# Main build function
build() {
    echo "Starting local Hugo build..."

    # Clean and setup
    clean
    create_mod
    setup_theme

    echo "Generating API docs..."
    echo "--------------------------------------------------"

    # Set API domain and prepare OpenAPI spec
    ENDOR_API_DOMAIN="api.endorlabs.com"
    INPUT_OPENAPI_SPEC="$SPEC_DIR/internal/openapi/openapiv2.swagger.json"
    PROCESSED_SPEC="$DOCSY_DIR/content/includes/openapiv2.swagger.json"

    if [ -f "$INPUT_OPENAPI_SPEC" ]; then
        # Create includes directory if it doesn't exist
        mkdir -p "$DOCSY_DIR/content/includes"

        # Process the OpenAPI file to remove internal tags
        python3 "$DOCSY_DIR/remove_internal_tags.py" -i "$INPUT_OPENAPI_SPEC" -o "$PROCESSED_SPEC"

        jq '.schemes = ["https"] | .host = $ENDOR_API_DOMAIN' \
            --arg ENDOR_API_DOMAIN "$ENDOR_API_DOMAIN" \
            "$PROCESSED_SPEC" > "$DOCSY_DIR/content/includes/openapiv2.swagger.domain.json"

        # Create temporary config with absolute path to fix path resolution issues
        ABSOLUTE_PATH=$(realpath "$DOCSY_DIR/content/includes/openapiv2.swagger.domain.json")
        TEMP_CONFIG="$DOCSY_DIR/temp-redocly-config.yaml"

        cat > "$TEMP_CONFIG" << EOF
apis:
  external@latest:
    root: $ABSOLUTE_PATH
    decorators:
      remove-x-internal: on
EOF

        # Generate API documentation
        cd "$DOCSY_DIR" && \
        npx @redocly/cli bundle external@latest --output spec.json --config "$TEMP_CONFIG" && \
        npx @redocly/cli build-docs spec.json \
            --output content/en/api/index.html \
            --template "assets/redoc-assets/template.hbs"

        # Clean up ALL temporary files
        rm -f "$DOCSY_DIR/spec.json"
        rm -f "$DOCSY_DIR/temp-redocly-config.yaml"
        rm -f "$DOCSY_DIR/temp-config.yaml"
        rm -f "$DOCSY_DIR/test-spec.json"
        rm -f "$REPO_ROOT/test-config.yaml"
        rm -f "$DOCSY_DIR/content/includes/openapiv2.swagger.domain.json"
    else
        echo "Warning: OpenAPI spec file not found at $INPUT_OPENAPI_SPEC"
        echo "Skipping API documentation generation..."
    fi

    echo "Generating Hugo site..."
    echo "--------------------------------------------------"
    cd "$DOCSY_DIR" && hugo mod clean
    cd "$DOCSY_DIR" && hugo --source ./ --destination docs.endorlabs.com --minify --baseURL="http://localhost:1313/"

    # Start local server
    echo "Starting local server..."
    echo "Access your site at http://localhost:1313/"
    cd "$DOCSY_DIR" && hugo server -disableFastRender --source ./ --baseURL="http://localhost:1313/"
}

# Main execution
check_dependencies
build