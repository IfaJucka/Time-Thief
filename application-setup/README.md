# Application Setup & Tooling Guide — TIME THIEF

This directory holds supporting setup, environment, and deployment reference documentation for **TIME THIEF**.

---

## 1. Root Configuration Layout (Why Core Configs Stay at Root)

`npm`, Vite, TypeScript, Vitest, IDE language servers, GitHub workflows, and Vercel expect core manifest and configuration files in the repository root by default. To preserve zero-flag tooling compatibility, the following essential files remain at the project root:

| Root File | Tool / Role |
|---|---|
| `package.json` & `package-lock.json` | npm dependency manifest, lockfile, and script entry points |
| `tsconfig.json` | Strict TypeScript compiler configuration (`src/`, `tests/`, config files) |
| `vite.config.ts` | Vite bundler and `@vitejs/plugin-react` configuration |
| `vitest.config.ts` | Vitest Node test runner configuration (`tests/**/*.test.ts`) |
| `index.html` | Vite client HTML entry mounting `/src/main.tsx` |
| `.env.example` | Safe environment variable template for future Phase 5 Supabase keys |

---

## 2. Local Development Prerequisites & Setup

- **Node.js:** v20+ LTS or v24+ (`v24.21.0` verified)
- **Package Manager:** `npm` *(on Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm.ps1`)*

```bash
npm install
npm run dev
```

### Environment Variables (Optional / Phase 5 Only)
The single-player MVP runs 100% offline and does not require any `.env` file. When Phase 5 Supabase features are enabled later:

```bash
cp .env.example .env.local
```

Populate `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` inside `.env.local` (ignored by `.gitignore`).

---

## 3. Verified Project Scripts

| Command | Underlying Action | Purpose |
|---|---|---|
| `npm run dev` | `vite` | Start local development server with HMR |
| `npm run build` | `tsc --noEmit && vite build` | Type-check and build production bundle to `dist/` |
| `npm run preview` | `vite preview` | Serve production `dist/` bundle locally |
| `npm run typecheck` | `tsc --noEmit` | Run strict TypeScript check across `src/` and `tests/` |
| `npm test` | `vitest run` | Execute Vitest unit tests in `tests/**/*.test.ts` |

---

## 4. Vercel Deployment Settings

- **Framework Preset:** Vite
- **Root Directory:** `.` (repository root)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
