#!/bin/bash
set -euo pipefail

INPUT_DIR="./tsp-output/@typespec/openapi3"
FRONT_OUTPUT_DIR="../../front/src/generated/contracts"

# Generate Rust contracts
for file in "$INPUT_DIR"/openapi.*.yaml; do
    [ -f "$file" ] || continue

    name=$(basename "$file" .yaml)
    route="${name#openapi.}"

    # Convert route name to snake_case
    module=$(echo "$route" | sed -E 's/([a-z0-9])([A-Z])/\1_\2/g' | tr '[:upper:]' '[:lower:]')

    echo "Generating TypeScript client: $module"

    npx openapi-typescript \
        "$file" \
        -o "$FRONT_OUTPUT_DIR/${module}.d.ts"
done
