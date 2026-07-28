"""
Google Fonts resolver + downloader.

Pixy's /templates endpoint exposes a `fonts` array of family names per template.
This module maps those family names to actual downloadable font files from the
google/fonts GitHub repository, and caches them locally.

Licence note: google/fonts hosts families under ofl/, apache/ and ufl/ which
correspond to SIL Open Font License 1.1, Apache License 2.0 and Ubuntu Font
Licence 1.0 respectively. The licence directory is recorded per family so it can
be reported in the analysis output.
"""

from __future__ import annotations

import json
import os
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

GH_API = "https://api.github.com/repos/google/fonts/contents"
GH_RAW = "https://raw.githubusercontent.com/google/fonts/main"

LICENCE_DIRS = {
    "ofl": "SIL Open Font License 1.1",
    "apache": "Apache License 2.0",
    "ufl": "Ubuntu Font Licence 1.0",
}

# Families whose repo directory name does not match the slugified family name.
SLUG_OVERRIDES = {
    "PT Sans": "ptsans",
    "PT Serif": "ptserif",
    "PT Mono": "ptmono",
    "PT Sans Narrow": "ptsansnarrow",
    "PT Sans Caption": "ptsanscaption",
    "PT Serif Caption": "ptserifcaption",
    "Fredoka One": "fredoka",
}


def slugify(family: str) -> str:
    if family in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[family]
    return re.sub(r"[^a-z0-9]", "", family.lower())


class FontCache:
    """Resolves and caches Google Fonts families on disk."""

    def __init__(self, cache_dir: str | Path):
        self.dir = Path(cache_dir)
        self.dir.mkdir(parents=True, exist_ok=True)
        self.index_path = self.dir / "_index.json"
        self.index: dict = self._load_index()

    def _load_index(self) -> dict:
        if self.index_path.exists():
            try:
                return json.loads(self.index_path.read_text())
            except Exception:
                return {}
        return {}

    def _save_index(self) -> None:
        self.index_path.write_text(json.dumps(self.index, indent=1, sort_keys=True))

    # -- network helpers ---------------------------------------------------
    def _gh_json(self, url: str, retries: int = 3):
        headers = {"Accept": "application/vnd.github+json", "User-Agent": "pixy-analyser"}
        tok = os.environ.get("GITHUB_TOKEN")
        if tok:
            headers["Authorization"] = f"Bearer {tok}"
        for attempt in range(retries):
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=30) as r:
                    return json.load(r)
            except urllib.error.HTTPError as e:
                if e.code == 404:
                    return None
                if e.code in (403, 429) and attempt < retries - 1:
                    time.sleep(2 ** attempt * 3)
                    continue
                return None
            except Exception:
                if attempt < retries - 1:
                    time.sleep(1.5 * (attempt + 1))
                    continue
                return None
        return None

    def _download(self, url: str, dest: Path, retries: int = 3) -> bool:
        if dest.exists() and dest.stat().st_size > 2000:
            return True
        for attempt in range(retries):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "pixy-analyser"})
                with urllib.request.urlopen(req, timeout=60) as r:
                    data = r.read()
                if len(data) < 2000:
                    return False
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(data)
                return True
            except Exception:
                if attempt < retries - 1:
                    time.sleep(1.5 * (attempt + 1))
        return False

    # -- resolution -------------------------------------------------------
    def resolve(self, family: str) -> dict:
        """Return metadata + local file paths for a family.

        Result shape:
          {family, found, licence, licenceDir, sourceUrl, files:[{file,path,kind,axes,weight,style}]}
        """
        if family in self.index:
            cached = self.index[family]
            if cached.get("found"):
                # verify files still present
                if all(Path(f["path"]).exists() for f in cached.get("files", [])):
                    return cached
            else:
                return cached

        slug = slugify(family)
        entry = {
            "family": family,
            "found": False,
            "licence": None,
            "licenceDir": None,
            "sourceUrl": None,
            "files": [],
            "note": None,
        }

        listing = None
        lic_dir = None
        for d in ("ofl", "apache", "ufl"):
            listing = self._gh_json(f"{GH_API}/{d}/{slug}")
            if isinstance(listing, list) and listing:
                lic_dir = d
                break

        if not isinstance(listing, list) or not listing:
            entry["note"] = "family directory not found in google/fonts"
            self.index[family] = entry
            self._save_index()
            return entry

        entry["found"] = True
        entry["licenceDir"] = lic_dir
        entry["licence"] = LICENCE_DIRS.get(lic_dir)
        entry["sourceUrl"] = f"https://github.com/google/fonts/tree/main/{lic_dir}/{slug}"

        ttf = [f for f in listing if f["name"].lower().endswith((".ttf", ".otf"))]
        # Prefer variable fonts (bracketed axis names), then statics.
        variable = [f for f in ttf if "[" in f["name"]]
        statics = [f for f in ttf if "[" not in f["name"]]

        chosen = []
        chosen.extend(variable[:4])

        # Keep a useful spread of statics; cap to limit download volume.
        # Roman (upright) weights are ranked ahead of italics so that a family's
        # core weights are always available for matching.
        weight_order = (
            "regular",
            "medium",
            "semibold",
            "bold",
            "black",
            "extrabold",
            "light",
            "thin",
            "extralight",
        )

        def rank(f):
            n = f["name"].lower()
            is_italic = "italic" in n
            w = min(
                (i for i, k in enumerate(weight_order) if k in n),
                default=len(weight_order),
            )
            return (is_italic, w, len(n))

        chosen.extend(sorted(statics, key=rank)[:10])

        fam_dir = self.dir / slug
        for f in chosen:
            dest = fam_dir / f["name"]
            url = f.get("download_url") or f"{GH_RAW}/{lic_dir}/{slug}/{f['name']}"
            if self._download(url, dest):
                entry["files"].append(
                    {
                        "file": f["name"],
                        "path": str(dest),
                        "kind": "variable" if "[" in f["name"] else "static",
                        "axes": re.findall(r"\[([^\]]+)\]", f["name"]),
                        "style": "italic" if "italic" in f["name"].lower() else "normal",
                        "sourceUrl": url,
                    }
                )

        if not entry["files"]:
            entry["found"] = False
            entry["note"] = "directory found but no font files downloadable"

        self.index[family] = entry
        self._save_index()
        return entry
