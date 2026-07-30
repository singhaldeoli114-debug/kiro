#!/bin/bash
# Openverse search helper: ov.sh "query" [licenses] [count]
Q="$1"; LIC="${2:-cc0,by,by-sa}"; N="${3:-8}"
curl -s --get "https://api.openverse.org/v1/images/" \
  --data-urlencode "q=$Q" \
  --data-urlencode "license=$LIC" \
  --data-urlencode "page_size=$N" \
  | python3 -c '
import json,sys
d=json.load(sys.stdin)
for r in d.get("results",[]):
    print("|".join([
      (r.get("title") or "")[:60].replace("\n"," "),
      r.get("license","")+"/"+(r.get("license_version") or ""),
      str(r.get("width"))+"x"+str(r.get("height")),
      (r.get("creator") or "")[:22],
      r.get("foreign_landing_url","")[:60],
      r.get("url",""),
    ]))
'
