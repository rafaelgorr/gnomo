#!/bin/bash
set -euo pipefail

INPUT_DIR="./tsp-output/@typespec/openapi3"
OUTPUT_DIR="../../back/src/generated/contracts"

mkdir -p "$OUTPUT_DIR"

# Generate Rust contracts
for file in "$INPUT_DIR"/openapi.*.yaml; do
    [ -f "$file" ] || continue

    name=$(basename "$file" .yaml)
    route="${name#openapi.}"

    # Convert route name to snake_case
    module=$(echo "$route" | sed -E 's/([a-z0-9])([A-Z])/\1_\2/g' | tr '[:upper:]' '[:lower:]')

    echo "Generating $module..."

    omg \
        -i "$file" \
        -o "$OUTPUT_DIR/$module" \
        -m all
done

# Generate mod.rs
{
    for dir in "$OUTPUT_DIR"/*/; do
        [ -d "$dir" ] || continue

        module=$(basename "$dir")
        echo "pub mod $module;"
    done
} > "$OUTPUT_DIR/mod.rs"

echo "Contracts generated successfully!"