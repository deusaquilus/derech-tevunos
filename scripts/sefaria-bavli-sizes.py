#!/usr/bin/env python3
import json, urllib.request, urllib.parse
from collections import defaultdict

BASE = "https://storage.googleapis.com/storage/v1/b/sefaria-export/o"
PREFIX = "json/Talmud/Bavli/"
SEDARIM = {"Seder Zeraim","Seder Moed","Seder Nashim","Seder Nezikin","Seder Kodashim","Seder Tahorot"}

items, token = [], None
while True:
    q = {"prefix": PREFIX, "fields": "items(name,size),nextPageToken", "maxResults": 1000}
    if token: q["pageToken"] = token
    with urllib.request.urlopen(f"{BASE}?{urllib.parse.urlencode(q)}") as r:
        d = json.load(r)
    items += d.get("items", [])
    token = d.get("nextPageToken")
    if not token: break

by_cat = defaultdict(int)          # Seder X / Rishonim / Acharonim / ...
core = defaultdict(int)            # core Gemara by version
total_all = total_nomerge = 0
for it in items:
    size = int(it["size"])
    parts = it["name"][len(PREFIX):].split("/")
    total_all += size
    if parts[-1] == "merged.json":
        continue
    total_nomerge += size
    by_cat[parts[0]] += size
    # core Gemara: Seder X/<Tractate>/<Lang>/<Version>.json
    if parts[0] in SEDARIM and len(parts) == 4:
        core[f"{parts[2]} / {parts[3][:-5]}"] += size

mb = lambda b: f"{b/1e6:8.1f} MB"
print(f"files: {len(items)}")
print(f"total incl merged: {mb(total_all)}")
print(f"total excl merged: {mb(total_nomerge)}\n")
print("by category (excl merged):")
for k, v in sorted(by_cat.items(), key=lambda x: -x[1]): print(f"  {mb(v)}  {k}")
print("\ncore Gemara by version:")
for k, v in sorted(core.items(), key=lambda x: -x[1]): print(f"  {mb(v)}  {k}")
