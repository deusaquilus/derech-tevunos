# Downstream agent: integrate the complete Ramchal icon set

Read `ICONS_REFERENCE_COMPLETE_V3.md`, starting with its Integration contract. Import **all 159 entries** from `ICON_MANIFEST.json` into the application's icon registry. Each entry has `include_in_application: true`. The five review-provenance icons are deliberately included; do not filter them out.

Copy the current SVG for each matching key and add every missing key. Keep stable identifiers. Preserve geometry, color, opacity, aspect ratio and orientation. Give repeated inline SVG IDs unique prefixes. Keep source-first Hebrew definitions and fresh English translations, following the reference. Maintain accurate source citations and actual source examples.

The archive has 160 SVGs: 159 current icons and one retained previous Subject. Keep that alternative separately; `subject-bearer` remains active. Do not rename the old drawing to the active key or display both as different constructs.

Start with `ALL_ICONS_GALLERY.html` to inspect every current icon. `index.html` provides the broader illustrated guide and source examples. Its selected/review labels are design history, not exclusion rules for this export. `source/` contains supporting passages and the complete original text. This release is a new all-icons export, distinct from the older selected-only V2 archive.

Run `python3 tools/verify_package.py` from any working directory to verify the extracted package. Then verify all 159 keys in the application's own registry and report additions, replacements and any unmapped application concepts. Keep unrelated application assets and behavior intact.

The root reference and `ICON_MANIFEST.json` govern this release. Supporting review snapshots may retain older ledger counts. Do not infer taxonomy from folder names or flatten Explanation fit and method into one enum. `obverse` has only its accessible title clarified; every icon's geometry is preserved.
