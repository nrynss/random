#!/bin/bash

# Bazel: resolve tools provided by bazel in the build sandbox
set -e

WORKSPACE_ROOT=$(pwd)
YARN="$WORKSPACE_ROOT/$YARN_BINARY"
NPX="$WORKSPACE_ROOT/$NPX_BINARY"

# If running "serve" we are not in the bazel sandbox to have the tools.
if [[ -z "$YARN_BINARY" ]]; then
  YARN=$(which yarn)
  if [[ -z "$YARN" ]]; then
     echo "Please install yarn"
     exit
  fi
fi

# Generate API docs and build the site
build() {
    pushd src/hugo/docsy || exit

    clean
    clean_mod
    create_mod

    echo "install dependencies"
    echo "--------------------------------------------------"

    $YARN install

    echo "generate api docs"
    echo "--------------------------------------------------"

    ENDOR_API_DOMAIN="api.endorlabs.com"
    INPUT_OPENAPI_SPEC="content/includes/openapiv2.swagger.json"

    # Create includes directory if it doesn't exist
    mkdir -p content/includes

    jq '.schemes = ["https"] | .host = $ENDOR_API_DOMAIN' --arg ENDOR_API_DOMAIN "$ENDOR_API_DOMAIN" "$INPUT_OPENAPI_SPEC" > content/includes/openapiv2.swagger.domain.json

    # Create temporary config with absolute path to fix path resolution issues
    ABSOLUTE_PATH=$(realpath content/includes/openapiv2.swagger.domain.json)
    TEMP_CONFIG="temp-redocly-config.yaml"

    cat > "$TEMP_CONFIG" << EOF
apis:
  external@latest:
    root: $ABSOLUTE_PATH
    decorators:
      remove-x-internal: on
EOF

    # Generate API documentation with the @redocly/cli package
    $NPX @redocly/cli bundle external@latest --output spec.json --config "$TEMP_CONFIG"
    $NPX @redocly/cli build-docs spec.json \
        --output static/api/index.html \
        --template "assets/redoc-assets/template.hbs"

    # Clean up ALL temporary files
    rm -f spec.json
    rm -f "$TEMP_CONFIG"
    rm -f temp-config.yaml
    rm -f test-spec.json
    rm -f ../../../test-config.yaml
    rm -f content/includes/openapiv2.swagger.domain.json

    echo "generate hugo site"
    echo "--------------------------------------------------"
    hugo mod clean
    hugo mod get -u ./...
    hugo mod tidy
    export LANG=en_US.UTF-8
    export LC_ALL=en_US.UTF-8
    hugo --source ./ --destination docs.endorlabs.com --ignoreCache
    clean_mod

    popd || exit

    cp -r "$DOCS_PATH" "$OUTS"
}

# serve the site
serve() {
    pushd src/hugo/docsy || exit

    clean
    create_mod
    setup-gopath --bypass-gomock

    echo "install dependencies"
    echo "--------------------------------------------------"
    $YARN install

    hugo serve

    clean_mod

    popd || exit
}

create_mod() {
    cat <<EOF >go.mod
module github.com/endorlabs/docs
go 1.21
require (
    github.com/google/docsy v0.12.0 // indirect
    github.com/google/docsy/dependencies v0.7.2 // indirect
)
EOF

    go mod tidy
}

clean_mod() {
    rm -f go.mod
    rm -f go.sum
}

clean() {
    rm -rf docs.endorlabs.com
    rm -rf resources
    rm -rf node_modules
    rm -rf .hugo_build.lock
}

export OUTS=$2
export DOCS_PATH=src/hugo/docsy/docs.endorlabs.com

$1