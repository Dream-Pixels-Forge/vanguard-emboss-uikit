# Next Session Handoff — v0.5.0 Incoming

## State on Session End
- **Branch**: `main` at `52bce47` — "v0.4.0: complete shadcn/ui parity at 51 components"
- **PR #15**: Merged (squash) and deleted
- **Tests**: 210 passing
- **Build**: 116.86 KB ESM / 83.90 KB CJS
- **Registry**: 51 components

## What's Left (for v0.5.0)
Build these 6 remaining shadcn/ui components:

| Component | Effort | Notes |
|-----------|--------|-------|
| **Button Group** | Low | Container for grouped buttons, no deps |
| **Direction** | Very Low | RTL/LTR provider + hook, no deps |
| **Input Group** | Medium | Wraps inputs with addons, reuses existing Input/Textarea |
| **Item** | Medium-High | Flexible list-item with media/title/desc/actions |
| **Native Select** | Low | Styled `<select>` element, no deps |
| **Typography** | Low | CSS utility classes (we already have Text component) |

**Toast**: Skip — deprecated by shadcn/ui in favor of Sonner (we already have it).

## Workflow for New Session
1. Run `@swarm_session_recover` to restore context
2. Run `git pull` to get latest main
3. Start at **Implement (I)** phase
4. Build each component following existing patterns (registry entry, stories, tests, audit)
5. Cut v0.5.0 when done
