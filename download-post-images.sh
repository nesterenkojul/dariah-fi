#!/bin/bash
# Downloads all in-text and featured images referenced in blog posts
# into public/media/, preserving original filenames (URL-decoded).

set -e

URLS_FILE="post-image-urls.txt"
DEST_DIR="media-source"

mkdir -p "$DEST_DIR"

total=$(wc -l < "$URLS_FILE")
count=0
failed=0

while IFS= read -r url; do
  count=$((count + 1))

  # Extract and URL-decode the filename
  filename=$(basename "$url" | python3 -c "import sys, urllib.parse; print(urllib.parse.unquote(sys.stdin.read().strip()))")

  # Strip any query string remnants that might have leaked into the filename
  filename="${filename%%\?*}"

  dest="$DEST_DIR/$filename"

  if [ -f "$dest" ]; then
    echo "[$count/$total] SKIP (exists): $filename"
    continue
  fi

  echo "[$count/$total] Downloading: $filename"
  if curl -sL -f -o "$dest" "$url"; then
    echo "  OK"
  else
    echo "  FAILED: $url"
    failed=$((failed + 1))
    rm -f "$dest"
  fi
done < "$URLS_FILE"

echo ""
echo "Done. $((total - failed))/$total downloaded successfully, $failed failed."
