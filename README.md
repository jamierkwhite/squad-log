# SquadLog

> A local-first team workout accountability platform for grassroots sports clubs.

## What is this?

SquadLog replaces buried group chat messages with a shared, always-visible team workout feed. Athletes log their off-field training, teammates see it, and the inherent social trust of in-person teams drives accountability — no gamification gimmicks needed.

## The Problem

Athletes at grassroots sports clubs do individual training between team sessions, but that work is invisible to the group. Workout logs dropped in WhatsApp get buried in minutes. The result: athletes miss out on the accountability and camaraderie that comes from knowing their teammates are (or aren't) putting in work.

## The Solution

A dedicated space where the only content is training logs. Open the app → see what your teammates have been doing → feel inspired to do your own session → log it → repeat.

**Core features:**
- 📝 **Log workouts** — structured but flexible activity logging
- 📊 **Team dashboard** — at-a-glance team activity, leaderboards, personal stats
- 📋 **Team feed** — chronological stream of everyone's training
- 🏷️ **Subgroups** — tag members by position, squad, or any grouping
- 📱 **Cross-platform** — iOS, Android, and Web from a single codebase

## Technical Philosophy

- **Local-first** — your device is the source of truth, not a cloud server
- **Privacy by design** — data syncs via CRDT, the relay server is zero-knowledge
- **Near-zero cost** — no commercial infrastructure dependencies
- **Open source** — community-owned, self-hostable

## Stack

| Layer | Technology |
|-------|-----------|
| Sync & Data | [Jazz](https://jazz.tools) (CoMap/CoList CRDTs) |
| Identity | Jazz Accounts (keypair-based) |
| Framework | Expo + React Native |
| Monorepo | Turborepo |
| Language | TypeScript (strict) |

## Project Status

🚧 **Early development** — Monorepo scaffolded, implementation in progress.

## Development

### Prerequisites

- Node.js >= 20
- npm >= 10
- For iOS: Xcode + CocoaPods
- For Android: Android Studio + Android SDK

### Setup

```sh
# Clone the repo
git clone <repo-url>
cd squad-log

# Install all workspace dependencies
npm install
```

### Running the app

```sh
# Start the Expo dev server (all platforms)
npm run dev

# Or target a specific platform
npm run -w @squad-log/mobile ios
npm run -w @squad-log/mobile android
npm run -w @squad-log/mobile web
```

### Workspace commands

```sh
# Typecheck all packages
npm run typecheck

# Lint all packages
npm run lint

# Run all tests
npm run test

# Build all packages
npm run build
```

### Project structure

```
squad-log/
├── apps/
│   └── mobile/           # @squad-log/mobile — Expo app (iOS, Android, Web)
├── packages/
│   ├── core/             # @squad-log/core — shared data model, constants, business logic
│   └── ui/               # @squad-log/ui — shared React Native components
├── docs/
│   └── adrs/             # Architecture Decision Records
├── turbo.json            # Turborepo pipeline config
├── package.json          # Workspace root
└── tsconfig.base.json    # Shared TypeScript config (strict mode)
```

## License

TBD — will be open source.
