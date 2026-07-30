#!/bin/bash
# Wikimedia Commons image search: wc.sh "query" [count] [width]
Q="$1"; N="${2:-8}"; W="${3:-1600}"
curl -s --get "https://commons.wikimedia.org/w/api.php" \
  --data-urlencode "action=query" \
  --data-urlencode "format=json" \
  --data-urlencode "generator=search" \
  --data-urlencode "gsrsearch=$Q" \
  --data-urlencode "gsrnamespace=6" \
  --data-urlencode "gsrlimit=$N" \
  --data-urlencode "prop=imageinfo" \
  --data-urlencode "iiprop=url|size|extmetadata" \
  --data-urlencode "iiurlwidth=$W" \
  | python3 -c '
import json,sys
d=json.load(sys.stdin)
pages=(d.get("query") or {}).get("pages") or {}
for p in pages.values():
    ii=(p.get("imageinfo") or [{}])[0]
    em=ii.get("extmetadata") or {}
    lic=(em.get("LicenseShortName") or {}).get("value","?")
    art=(em.get("Artist") or {}).get("value","?")
    import re
    art=re.sub("<[^>]+>","",art)[:28]
    print("|".join([
      p.get("title","")[5:75],
      lic[:18],
      str(ii.get("width"))+"x"+str(ii.get("height")),
      art.strip(),
      ii.get("thumburl",""),
    ]))
'
