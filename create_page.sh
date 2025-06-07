#!/usr/bin/env bash
set -euo pipefail

TEMPLATE="_templates/wrapper.html"
CONTENT_FILE="$1"   # e.g. body/index.html
OUTPUT_FILE="$2"    # e.g. index.html

# Make sure arguments exist
if [[ ! -f "$TEMPLATE" ]]; then
  echo "Error: template '$TEMPLATE' not found." >&2
  exit 1
fi
if [[ ! -f "$CONTENT_FILE" ]]; then
  echo "Error: content file '$CONTENT_FILE' not found." >&2
  exit 1
fi

# Header color
if [[ "$(basename "$OUTPUT_FILE")" == "index.html" ]]; then
  COLOR="text-white" 
else
  COLOR="text-gray-800"
fi

# Use sed's 'r' command to read the content file when the placeholder is matched,
# then delete the placeholder line.
sed -e "/%content%/{
    r $CONTENT_FILE
    d
}" \
    -e "s/%text-color-header%/${COLOR}/g" \
    "$TEMPLATE" > "$OUTPUT_FILE"

echo "Generated $OUTPUT_FILE from $CONTENT_FILE"