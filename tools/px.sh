#!/bin/bash
# Pexels search scrape: px.sh "query with spaces" [limit]
Q=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$1")
N="${2:-18}"
curl -s --max-time 90 "https://r.jina.ai/https://www.pexels.com/search/$Q/" \
 | grep -oE "images\.pexels\.com/photos/[0-9]+/pexels-photo-[0-9]+\.jpe?g" \
 | sort -u | head -"$N"
