# Agents Log

This file documents decisions, discoveries, and notes made by AI agents working on this codebase.

---

## 001: Monorepo Setup

**Branch:** `jw/agent/monorepo-setup`
**Date:** 2026-06-25
**Story:** [project-items/phase-0-foundation/001-monorepo-setup.md](project-items/phase-0-foundation/001-monorepo-setup.md)

### Approach

Manual Turborepo setup rather than `npx create-turbo@latest` — the interactive scaffold doesn't match our exact workspace structure or package naming convention (`@squad-log/*`), and we need precise control over the Expo SDK version and expo-router template.

Expo app created via `npx create-expo-app@latest` with the blank-typescript template, then customised for workspace compatibility. Dependencies managed from root via npm workspaces (single `node_modules`).

### Decisions

- **Package manager:** npm workspaces (not pnpm or yarn) — already using npm, workspaces support is sufficient at this scale.
- **App name constant:** `APP_NAME` exported from `packages/core/src/constants.ts` — keeps the name in one place, satisfies the "keep app name configurable" requirement.
- **Expo SDK:** 53 (latest at time of writing); includes expo-router 4 by default.
- **tsconfig:** `moduleResolution: "bundler"` in the base config — required for Expo/Metro and aligns with modern TypeScript practices.
- **turbo.json pipelines:** `build` depends on upstream builds (`^build`); `dev` is marked persistent; `lint` and `test` are independent.

### Notes

- `packages/ui` peer-depends on `react` and `react-native` rather than declaring them as direct dependencies — correct pattern for a component library to avoid version conflicts with the host app.
- The root `.gitignore` was updated to cover monorepo artifacts: `node_modules`, `.turbo`, `dist`, `.expo`, and iOS/Android build outputs.

---
