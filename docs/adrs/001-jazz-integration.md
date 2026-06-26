# ADR 001: Jazz as the Local-First Data and Sync Layer

**Date:** 2026-06-26  
**Status:** Accepted  
**Story:** 002 — Jazz Integration

---

## Context

SquadLog needs a data layer that supports:
- Offline-first operation (athletes log without a connection)
- Real-time sync between devices when online
- Multi-user collaboration (shared team feed)
- Conflict-free merging of concurrent updates

We evaluated plain REST + optimistic UI, CRDTs via Automerge, and Jazz.

## Decision

Use **Jazz** (jazz.tools) as the single data, sync, and identity layer.

Jazz provides CRDT-backed collaborative data structures (`CoMap`, `CoList`) with a built-in sync mesh and keypair-based identity — all in one library. It eliminates the need for a custom backend for the MVP and maps naturally to our domain: a Jazz `Group` becomes a team, a Jazz `Account` becomes an athlete.

### Packages

| Package | Workspace | Role |
|---|---|---|
| `jazz-tools` | `packages/core` | Schema definitions (`CoMap`, `CoList`, `Account`, `Profile`) |
| `jazz-expo` | `apps/mobile` | React provider, storage adapters (expo-sqlite + expo-secure-store) |
| `expo-secure-store` | `apps/mobile` | Secure credential persistence for the Jazz account keypair |

### Sync target

Jazz Cloud (`wss://cloud.jazz.tools`) — free tier, no server setup required for development. The URL is configured as `JAZZ_SYNC_URL` in `apps/mobile/src/app/_layout.tsx`. Add a `?key=<api-key>` query param when moving to production.

### Schema location

All Jazz schema classes live in `packages/core/src/schema.ts` and are exported from `@squad-log/core`. This keeps schema definitions decoupled from the mobile app and sharable with any future web client.

### Account auto-creation

`JazzProvider` handles keypair generation and storage transparently on first launch. No explicit "sign up" flow is needed at this stage — the account is anonymous until extended in story 004 (Auth & Identity).

## Implementation Notes

### Polyfills

`jazz-expo/polyfills` must be the **first import** in the app entry point (`_layout.tsx`) before any Jazz or React Native module, to install crypto and WebSocket shims.

### Schema design

```
AppAccount (Account)
 └─ profile: AppProfile (Profile)
     └─ name: string
 └─ root: CoMap (optional, created on first migration)
```

`AppAccount.migrate()` lazily creates the root `CoMap` on first load, establishing a stable storage root for future app data without requiring a new schema version.

### Jazz Group → Team

Each SquadLog team will be a Jazz `Group`. Members are added via the Group's access-control API. This is deferred to story 005 (Teams).

## Gotchas

1. **Import order matters.** `jazz-expo/polyfills` failing to load first will surface as `crypto.subtle is undefined` at runtime.
2. **Version pinning.** `jazz-expo` and `jazz-tools` must be on the same minor version. Pin both explicitly in their respective `package.json` files.
3. **expo-sqlite is not expo-sqlite-legacy.** Jazz uses the new `expo-sqlite` API (v15+); do not install `expo-sqlite-legacy` or it will conflict.
4. **Jazz Cloud rate limits.** The free tier is suitable for development. Evaluate a self-hosted Jazz mesh node before launch.

## Consequences

- All data is CRDT-backed — no migration scripts needed for additive schema changes.
- No custom sync server for the MVP.
- Keypair identity means no password-reset flow until story 004 adds device-linking.
- Future backend integration is possible: Jazz can sync to a custom server alongside Jazz Cloud.
