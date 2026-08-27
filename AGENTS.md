# AGENTS.md

## Cursor Cloud specific instructions

Telegram Drive is a single-product **Tauri v2 desktop app** (React 19 + TypeScript + Vite frontend, Rust backend). All code lives under `app/`. There are no separate long-running microservices; the Rust backend, bundled SQLite, and the optional REST/file-sharing HTTP servers are all embedded in the single Tauri process. Standard setup/run commands are documented in `README.md`; standard scripts are in `app/package.json`.

### Services / how to run
Run everything from `app/`:
- **Dev app (frontend + Rust backend + desktop window):** `npm run tauri dev`. Tauri auto-starts Vite (`beforeDevCommand`) on `http://localhost:1420` (strict port) and then launches the desktop window.
- **Frontend only:** `npm run dev` (Vite). Opening `localhost:1420` in a plain browser only shows a "Desktop App Required" notice — the real UI needs the Tauri window because it calls the Rust backend.
- **Typecheck + production build:** `npm run build` (`tsc && vite build`). There is no ESLint/lint script; `tsc` via `npm run build` is the closest thing to a lint/typecheck gate.
- **Optional REST API** (`http://localhost:8550/api/v1`, see `REST_API_Documentation.md`) and **file-sharing server** are off by default and enabled at runtime inside the app settings after login.

### Non-obvious caveats
- **Rust toolchain must be ≥ 1.85.** The `grammers` dependency requires Cargo `edition2024`. The VM's default rustup toolchain is set to `stable` (currently 1.96.x); if `rustc --version` shows 1.83, run `rustup default stable`. Building with an older toolchain fails with `feature edition2024 is required`.
- **First `npm run tauri dev` compiles 300+ Rust crates (~2 min here, longer on cold caches).** The Cargo target dir and registry persist in the VM snapshot, so subsequent builds are fast. It fetches `grammers` from a git rev, so network access to GitHub is required on a cold build.
- **GUI runs on the existing X display (`DISPLAY=:1`).** `libEGL`/DRI3 warnings about accelerated rendering are harmless (software rendering) and do not prevent the window from working.
- **Full end-to-end use requires external Telegram credentials** (`api_id`/`api_hash` from my.telegram.org) plus interactive phone/QR login — not available headless. For local verification without real credentials, the setup screen accepts any non-empty API ID/Hash and advances (credentials are persisted via `tauri-plugin-store` to `config.json`), and a dev-only **"Dev Mode"** button on the auth screen (`import.meta.env.DEV`) bypasses login and opens the dashboard/file explorer.
- **This fork has no ads.** Ads, donation prompts, and the post-login `AdGateway` were removed. The auth screen's dev-only **Dev Mode** button goes straight to the dashboard.
