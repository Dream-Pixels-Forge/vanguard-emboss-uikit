# Task Plan: Architecture & Feature Improvements

## Objective
Address open architecture recommendations from the Extend phase review:
1. Add forwardRef to interactive components
2. Create component authoring guide
3. Implement 4 GitHub feature requests (#5, #7, #8, #9)
4. Split monolithic test file into per-component tests

---

### Phase 1: Add forwardRef to interactive components
- [ ] Input
- [ ] Textarea
- [ ] Select (SelectTrigger)
- [ ] Switch
- [ ] Checkbox
- [ ] Radio (RadioGroupItem)
- [ ] Slider
- Verify: build + tests pass

### Phase 2: Create component authoring guide
- [ ] Write COMPONENT_GUIDE.md
- [ ] Add scripts/generate-barrel.ts (auto-discovery)
- [ ] Add per-component size-limit checks

### Phase 3: GitHub Feature #5 — Intersection Observer hook
- [ ] Create src/hooks/ directory
- [ ] Implement useIntersectionObserver
- [ ] Export from hooks barrel
- [ ] Add ./hooks subpath export in package.json
- [ ] Write tests

### Phase 4: GitHub Feature #7 — Toast queue management
- [ ] Extend toast.tsx with queue system (useReducer)
- [ ] Add deduplication and rate limiting
- [ ] Backward-compatible API
- [ ] Write tests

### Phase 5: GitHub Feature #8 — Keyboard shortcut system
- [ ] Create useHotkeys hook
- [ ] Create HotkeyProvider context
- [ ] Export from hooks barrel
- [ ] Write tests

### Phase 6: GitHub Feature #9 — Animation presets
- [ ] Add CSS variable tokens for animation speed/intensity
- [ ] Optional AnimationProvider context
- [ ] Update globals.css spring classes
- [ ] Update tailwind.config.js

### Phase 7: Test file splitting
- [ ] Create script or systematically split components.test.tsx (2261 lines)
- [ ] Create per-component test files
- [ ] Verify all tests still pass

## Blockers
None

## Dependencies
Phase 1 → Phase 2: independent
Phase 3 → Phase 6: independent of each other
Phase 7: independent
