# 🚀 4Devs — Feature Recommendations & Roadmap

> **Status:** Proposal · **Owner:** DTC Team · **Last updated:** October 2026
>
> This document consolidates the recommended features for 4Devs, ordered by impact and effort.
> It covers platform capabilities, upgrades to existing tools, new tools, and the correctness
> prerequisites that must be resolved before security-sensitive features are advertised.

---

## Guiding Principles

Every recommendation below must respect the four principles that define 4Devs:

1. **Privacy by architecture** — data stays in the browser unless a tool explicitly says otherwise.
2. **Offline first** — the core experience must work without a network after first load.
3. **Zero friction** — no account, no paywall, no install required for the web edition.
4. **Auditable security** — no security claim may exceed what the code actually verifies.

> ⚠️ **Rule:** a feature that requires a server call must be clearly labelled as *online* in the UI,
> and must degrade gracefully when offline.

---

## Priority Model

| Priority | Meaning | Target |
|---|---|---|
| **P0** | Trust, correctness, or security gap that invalidates an existing claim | Before the next public release |
| **P1** | High-impact platform feature that improves every tool | Next minor release |
| **P2** | Tool-level upgrades that deepen existing workflows | Following releases |
| **P3** | New tools and ecosystem expansion | Backlog / roadmap |

Effort estimates: **S** = ≤ 1 day, **M** = 2–4 days, **L** = 1–2 weeks, **XL** = multi-week.

---

## Phase 0 — Correctness & Trust Prerequisites (P0)

These are not new features, but they must ship before adding more security tooling.
They are documented in detail in the project audit.

| # | Item | Why it matters | Effort |
|---|---|---|---|
| 0.1 | **Make the PDF Signature Checker honest** | It currently extracts a certificate and displays “Valid Digital Signature Found” without verifying the signature, PDF byte ranges, or certificate chain. Either implement verification (`p7.verify()`, digest comparison, chain/trust anchors) or rename it **“PDF Signature Inspector”** and remove the word *Valid*. | L |
| 0.2 | **Harden password generation** | Replace modulo reduction with rejection sampling, replace `Math.random()` in passphrase/pronounceable presets with a CSPRNG, and guarantee the selected character classes. | S–M |
| 0.3 | **Patch vulnerable dependencies** | `dompurify` (XSS, used by Markdown preview), `pdfjs-dist` (malicious-PDF JS execution), `node-forge`, `react-router`, `figlet`. | M |
| 0.4 | **Fix or remove the speed tests** | `/logo.png` does not exist in production builds. Ship a real asset or endpoint, and label the result as an *approximate* check. | S |
| 0.5 | **Align privacy/offline wording** | Mark Currency, MAC Lookup, IP/GitHub lookups, and ASCII CDN fonts as *online* tools. | S |
| 0.6 | **Add `LICENSE`** | MIT is claimed everywhere, but no file exists and the footer link 404s. | S |
| 0.7 | **Replace the legacy deploy workflow** | `.github/workflows/prod.yml` targets an unrelated SSH host on `master`. Rewrite for GitHub Pages or delete. | S |

---

## Phase 1 — Platform Features (P1)

### 1.1 Installable PWA + true offline mode

**Problem:** the app claims to be offline-first, but there is no service worker. A reload while
offline breaks the experience, and some tools call external APIs at runtime.

**Recommendation:**
- Add `vite-plugin-pwa` with a Workbox service worker.
- Precache the app shell and lazy chunks; cache the last-used tool chunks at runtime.
- Show an **Online / Offline** badge in the header.
- Add an offline fallback page for uncached routes.
- Disable or clearly badge network-dependent tools while offline (Currency, MAC Lookup, IP info).

**Impact:** turns a marketing claim into a real capability. **Effort:** M.

---

### 1.2 Favorites, recents, and a personal workspace

**Recommendation:**
- Star/unstar tools from the dashboard, sidebar, and command palette.
- Show a **“Recently used”** row on `/app`.
- Store state in `localStorage` (no account), with export/import as JSON.
- Add a **Reset workspace** action in settings.

**Implementation notes:** extend `src/data/tools.js` with a stable `id`; add a `useWorkspace`
hook; reuse the existing drawer/navigation components. **Effort:** M.

---

### 1.3 Shareable tool state

**Recommendation:** encode simple tool inputs in the URL hash so a link reproduces a result:

- Color Converter → `#/tools/conversion/color-converter?c=%23ff6600`
- Regex Tester → pattern + flags
- Subnet Calculator → CIDR
- Text↔Binary → input mode

Rules: never serialize passwords, keys, uploaded files, or PDF contents. Show a
**“Copy share link”** action only for safe, non-sensitive fields. **Effort:** M.

---

### 1.4 Command palette upgrades

The palette already exists (`Ctrl/Cmd + K`, `Search.jsx`). Recommended enhancements:

- Fuzzy matching and highlighted matches.
- Category filters and recent tools at the top.
- Action commands, not just navigation (e.g., “Generate password”, “Toggle theme”).
- Discoverable shortcut help (`?` opens a shortcuts sheet).

**Effort:** S–M.

---

### 1.5 Settings and data controls

A small `/app/settings` page covering:

- Theme, density, and reduced-motion preference.
- Default password length / character sets.
- Export / import all local data (favorites, history, speed tests).
- Clear all local data with confirmation.
- “What is stored on this device?” transparency panel.

**Effort:** M.

---

### 1.6 Accessibility and keyboard-first polish

- Full keyboard navigation for every tool (no mouse-only controls).
- Visible focus rings, ARIA labels on icon-only buttons, and correct heading order.
- Respect `prefers-reduced-motion` for the theme wave transition and animations.
- Add an automated `axe`/`eslint-plugin-jsx-a11y` check to CI.
- Target WCAG 2.2 AA for contrast and focus.

**Effort:** M.

---

### 1.7 Internationalisation (English + Swahili)

The team is Tanzania-based; English/Swahili support would broaden reach.

- Extract UI strings into a lightweight i18n layer (`react-i18next` or a small custom dictionary).
- Persist language choice locally.
- Keep tool output (e.g., generated passwords) locale-independent.

**Effort:** L (incremental).

---

### 1.8 Optional, privacy-preserving feedback channel

The current “Suggest a feature” dialog discards all input. Replace it with one of:

- **Preferred:** open a prefilled GitHub issue URL (no backend, fully transparent).
- Store drafts locally and offer “Copy as Markdown”.
- Optionally add a tiny serverless endpoint only if a backend is ever introduced.

Do not display “Thank you” unless the submission actually left the browser. **Effort:** S.

---

## Phase 2 — Complete the Existing Tools (P1–P2)

### 2.1 Expose the four stubbed tools

Four pages exist as 12-line placeholders and are not routed or registered:

| File | Proposed tool |
|---|---|
| `src/pages/tools/conversion/EncodersDecoders.jsx` | Base64 / URL / HTML entity encoder-decoder |
| `src/pages/tools/conversion/TextCaseConverters.jsx` | Case & text transforms (upper, lower, title, slug, reverse) |
| `src/pages/tools/conversion/MathLogic.jsx` | Number base, bitwise, and logic utilities |
| `src/pages/tools/conversion/OtherConverters.jsx` | Timestamp, number-to-words, unit helpers |

Implement each, add a stable `id`, register it in `src/data/tools.js`, `src/menu-items/*`,
and `src/routes/MainRoutes.jsx`. **Effort:** M total (S each).

---

### 2.2 Suggested upgrades by tool

#### 🔐 CryptOK

| Tool | Recommended features |
|---|---|
| Password Generator | Rejection sampling; EFF-style wordlist for passphrases; per-class guarantees; entropy estimate; “avoid ambiguous characters”; history with manual clear; QR export already present |
| Password Analyzer | Actionable zxcvbn feedback, dictionary/pattern explanation, offline breach-check option via k-anonymity (opt-in, clearly online), downloadable report |
| PDF Signature Checker | Real cryptographic verification, signer-vs-issuer selection, certificate chain viewer, tamper/byte-range status, trust-store explanation, clear “verified / not verified / cannot verify” states |

#### 📝 Text Tools

| Tool | Recommended features |
|---|---|
| ASCII Generator | Bundle all FIGlet fonts locally (remove unpkg runtime dependency); live preview; copy/download as TXT/PNG; custom color/background |
| Emoji Picker | Lazy-load emoji data by category (current bundle is 1.35 MB); skin-tone selector; recent/favorites; shortcode search |

#### 🔄 Conversion Tools

| Tool | Recommended features |
|---|---|
| Markdown → HTML | GFM task lists and tables (verify), Mermaid diagrams, TOC generator, “copy as JSX”, export standalone HTML with embedded CSS; keep sanitisation on by default and warn when disabled |
| Color Converter | Palette generation, WCAG contrast checker with pass/fail labels, CSS variables / Tailwind / SCSS export, eyedropper, image color extraction |
| Code Converter | Add TOML and XML; JSON Schema validation; format/minify; diff view; preserve comments where possible |
| Currency Converter | Offline fallback snapshot with timestamp; historical chart; crypto pairs (optional); explicit “rates are online” badge |
| Text ↔ Binary | Batch mode, file input, custom separators (already), byte/bit grouping |

#### 🖼️ Image/Video

| Tool | Recommended features |
|---|---|
| Image Resizer | Batch processing, format conversion (WebP/AVIF), target file-size mode, EXIF stripping, drag-and-drop folders |
| Photo Editor | Undo/redo stack, layer list, crop presets, text styling presets, export scale |
| QR Generator | Logo embedding, styled dots/eyes, batch CSV generation, SVG/PNG/EPS export, scan test |

#### 📄 OpenDoc

| Tool | Recommended features |
|---|---|
| PDF Editor | Merge/split, page extraction, compression, watermark, page numbers, metadata editor, form-field export; keep all processing local |
| (new) PDF Tools hub | One entry point for merge, split, compress, rotate, sign-check, and metadata |

> PDF parsing must run against a patched `pdfjs-dist`; treat every uploaded PDF as untrusted.

#### 🛠️ Dev Gun

| Tool | Recommended features |
|---|---|
| Pigeon API | Saved collections, environments/variables, request history, cURL/OpenAPI import, auth helpers, response headers/cookies viewer; clearly document CORS limits |
| Regex Tester | Plain-English explanation, replace preview, match highlighting, common-pattern library, save/share patterns, named groups |
| File Meta Reader | Batch files, SHA-256/MD5 hashing, metadata removal, GPS map preview, JSON/CSV export |

#### 📡 WiFi Shark

| Tool | Recommended features |
|---|---|
| Speed Test History | Replace the logo probe with a real measurement endpoint (e.g., a downloadable fixed-size asset or Cloudflare speed endpoint); add upload, latency/jitter, server selection, CSV export, and an “approximate” disclaimer |
| Subnet Calculator | IPv6 support, VLSM splitting, overlap detection, binary visualization, export |
| MAC Lookup | Offline OUI database (IEEE snapshot) with optional online fallback; batch lookup |
| WiFi QR Decoder | Camera scanning, batch image decode, clear warning about handling credentials |
| Default Router Passwords | Source attribution and last-updated date; search by brand/model; prominent legal/ethical notice |
| Port Lookup | Service/version filters, copy `nmap`/firewall snippets, custom port ranges |

---

## Phase 3 — New Tools (P2–P3)

These are high-demand developer utilities that fit the existing registry model.

| Proposed tool | Description | Effort |
|---|---|---|
| **JWT Debugger** | Decode header/payload, show expiry, verify HMAC signatures locally (never transmit tokens) | M |
| **Hash Generator** | MD5/SHA-1/SHA-256/SHA-512 for text and files, using WebCrypto where possible | S |
| **Diff Checker** | Side-by-side text/JSON diff with unified patch export | M |
| **Timestamp Converter** | Unix ↔ ISO ↔ local time, timezone picker, relative time | S |
| **Cron Parser** | Explain cron expressions, next-run preview, common presets | M |
| **Base64 / URL Encoder** | Text, files, and data-URL modes with charset handling | S |
| **Lorem / Mock Data** | Lorem ipsum, names, emails, UUIDs, JSON fixtures (CSPRNG-based) | S |
| **UUID / ULID Generator** | Bulk generation, versions, copy/export | S |
| **Unit & Data Converter** | Bytes, time, temperature, length, base conversions | S |
| **JSON Formatter & Validator** | Pretty-print, minify, JSONPath query, schema validation | M |
| **Image → Text (OCR)** | Local OCR via Tesseract.js, lazy-loaded, offline after first cache | L |
| **SVG Optimizer** | SVGO in-browser, preview, download | M |
| **Certificate Inspector** | Paste PEM/DER to inspect X.509 fields, SANs, expiry, chain (pairs with PDF checker) | M |
| **Password Vault Export Auditor** | Offline CSV audit of exported password-manager files (no storage) | L |

---

## Phase 4 — Ecosystem Expansion (P3)

### 4.1 Desktop edition (Tauri)

The desktop app is already described in `PURPOSE.md`. Prioritise features a browser cannot provide:

- Clipboard manager with history and pinning.
- Screenshot capture and screen recording.
- CORS-free API testing in Pigeon API.
- Native file-system batch processing for image/PDF tools.
- Local encrypted store for collections and settings.

### 4.2 CLI companion

A small `4devs` CLI that reuses the same core utilities (hashing, encoding, subnet math,
password generation) would extend the brand to terminal users. Publish as an npm package
and keep the algorithms in a shared, tested module.

### 4.3 Browser extension

A “send selection to 4Devs” context-menu extension for text tools (Markdown, encoders,
regex, color). Optional and privacy-preserving: no background network access.

---

## Phase 5 — Engineering & Quality Recommendations

These support the features above and should be scheduled alongside them.

| Area | Recommendation |
|---|---|
| **Testing** | Add Vitest + React Testing Library. Priority: password randomness, subnet math, encoders, PDF parsing, color conversion, currency formatting. |
| **Lint/format** | Raise ESLint `ecmaVersion` to 2022+ (numeric separators currently fail parsing), run Prettier across `src`, and gate CI on lint. |
| **CI** | Add a GitHub Actions workflow running `lint`, `test`, and `build` on pull requests. Replace the legacy SSH deploy workflow. |
| **Dependencies** | Keep one lockfile (Yarn 4 is declared), enable Dependabot/Renovate, and run `npm audit` in CI. |
| **Bundle size** | Add `manualChunks` for MUI/Emotion; lazy-load emoji data and PDF workers; target < 500 KB per initial chunk. |
| **Theme** | Memoize `createTheme` and `componentsOverride`; replace ad-hoc dark-mode overrides with palette tokens. |
| **Docs** | Keep `README`, `PURPOSE`, and this roadmap in sync with the actual tool list; document online vs offline tools explicitly. |
| **Security** | Add a CSP where hosting allows it; never disable DOMPurify silently; keep uploaded files in memory and revoke object URLs. |
| **Accessibility** | Add `axe` checks and keyboard smoke tests for every tool. |
| **Analytics** | Stay analytics-free, or use a privacy-first, aggregate-only option with explicit opt-in. |

---

## Definition of Done (per feature)

A feature is complete only when:

- [ ] It works with the keyboard and on mobile widths.
- [ ] It has a loading, empty, error, and success state.
- [ ] It handles malformed input without crashing.
- [ ] It makes no network call unless labelled **online**.
- [ ] Sensitive data is never written to the URL, logs, or storage.
- [ ] It is registered in `data/tools.js`, the sidebar, and the router.
- [ ] It has at least one unit or interaction test for core logic.
- [ ] Documentation and privacy labels are updated.

---

## Suggested Roadmap

| Release | Focus | Contents |
|---|---|---|
| **v1.1 — Trust** | P0 | PDF checker honesty, password CSPRNG, dependency patches, speed-test fix, LICENSE, deploy workflow |
| **v1.2 — Platform** | P1 | PWA/offline, favorites/recents, settings, palette upgrades, feedback via GitHub |
| **v1.3 — Completion** | P1–P2 | Four stubbed tools exposed; Markdown, Color, Pigeon API upgrades |
| **v1.4 — Depth** | P2 | Image batch tools, PDF merge/split/compress, regex explainer, IPv6 subnet |
| **v2.0 — Expansion** | P3 | JWT debugger, hash generator, diff, cron, OCR/SVG; desktop parity features |

---

## See Also

- [`PURPOSE.md`](./PURPOSE.md) — product vision and scope
- [`LICENSING.md`](./LICENSING.md) — MIT licensing and third-party notices
- `src/data/tools.js` — canonical tool registry
- `src/routes/MainRoutes.jsx` — route registry
- `src/menu-items/` — sidebar registry

---

*DTC Team © 2026 — MIT License*
