

## Revert Header to Transparent — No Background, No Color

Goal: remove the solid `#080d1a` background and border from the navigation header so it reverts to a fully transparent overlay. Hero owns its own background; the header should sit on top without painting any color.

### Root cause

In the previous "remove glass" pass, `src/components/Navigation.tsx` was given a solid dark fill:

```tsx
className={overlay
  ? "absolute … bg-[#080d1a] border-b border-white/[0.06]"
  : `sticky … ${scrolled
      ? "bg-[#080d1a] border-b border-white/[0.08] shadow-…"
      : "bg-[#080d1a] border-b border-white/[0.04]"}`}
```

That hard-codes a dark band across every page — including light/cream body pages where it now looks like a foreign block.

### The fix — single file, single edit

```text
EDIT  src/components/Navigation.tsx   (nav className only)
```

Replace the className expression so the `<nav>` carries:
- **No background** (no `bg-*`)
- **No border**
- **No shadow**
- **No backdrop-filter**

Keep only positioning (`sticky top-0` / `absolute top-0`) and `z-[9999]`.

```tsx
<nav className={overlay
  ? "absolute top-0 left-0 right-0 z-[9999]"
  : "sticky top-0 z-[9999]"}>
```

The `scrolled` state and its `useEffect` listener stay in place but no longer drive any visual change — left intact for now to avoid touching unrelated logic. Can be removed in a follow-up if desired.

### Mobile menu panel — unchanged

The mobile slide-in panel keeps its own dark glass background (`rgba(8,11,22,0.96)`) — that's an opened dialog, not the header bar itself. Untouched.

### Constraints respected

- Hero (`HeroHomepage`) untouched
- Footer untouched
- Plume tokens untouched
- No JSX logic, no state, no new dependencies
- Mobile menu, dropdown, search, cart, donate, login button — all untouched

### Out of scope

- Removing the now-unused `scrolled` state (cosmetic cleanup, can follow)
- Hero, footer, body pages
- Auth page styling
- Pre-existing TypeScript lints

### Files touched

```text
EDIT  src/components/Navigation.tsx   (1 className expression, ~3 lines)
```

### Estimated diff

~3 lines changed. Zero new files, zero deletions of meaningful logic.

