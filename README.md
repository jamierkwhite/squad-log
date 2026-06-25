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

🚧 **Pre-development** — Architecture and roadmap defined, implementation starting soon.

See [`project-items/roadmap.md`](project-items/roadmap.md) for the full product roadmap.

## Development

Setup instructions will be added once the monorepo is scaffolded (Story 001).

## License

TBD — will be open source.
