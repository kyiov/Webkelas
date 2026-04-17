# 🌿 Design Spec: Moss & Stone Transformation

**Project:** Webkelas: Legacy Batch 2026  
**Topic:** Visual Redesign (Earthy/Organic Theme)  
**Status:** Approved for Implementation

---

## 🎨 Visual Identity: Moss & Stone

This theme transforms the current tech-heavy aesthetic into a grounded, organic, and "Legacy" feel. It uses muted greens, deep charcoals, and parchment-like text colors.

### 1. Color Palette (CSS Variables)
Update `:root` in `src/index.css`:
- `--bg-color`: `#1e201e` (Dark Charcoal/Stone)
- `--card-bg`: `#3c3d37` (Muted Stone Gray)
- `--text-main`: `#ecdfcc` (Ivory/Parchment)
- `--text-muted`: `#94a3b8` (Muted Slate)
- `--primary`: `#697565` (Moss Green)
- `--primary-hover`: `#82954b` (Olive Green)
- `--primary-glow`: `rgba(105, 117, 101, 0.15)`
- `--border-color`: `rgba(236, 223, 204, 0.1)`

### 2. Texture & Effects
- Add a subtle **noise/grain overlay** to the background to simulate stone texture.
- Soften the `glass-card` blur and border intensity to feel more like natural materials.
- Update `text-glow` to use the new `--primary-glow`.

---

## 📦 Iconography: Phosphor Icons

Migration from `lucide-react` to `@phosphor-icons/react`.

### 1. Components to Update:
- **Navbar.jsx**: 
  - `Menu` -> `List`
  - `X` -> `X` (Phosphor)
  - `Sun`/`Moon` -> `SunDim`/`MoonStars`
- **Hero.jsx**: 
  - `Sparkles` -> `Sparkle`
  - `ArrowDown` -> `ArrowDown`
- **SecretWall.jsx**: 
  - `MessageCircle` -> `ChatTeardropDots`
  - `Send` -> `PaperPlaneTilt`
  - `Sparkles` -> `Sparkle`
  - `User` -> `UserCircle`
- **AdminDashboard.jsx**:
  - `Settings` -> `Gear`
  - `Lock` -> `LockSimple`
  - `Shield` -> `ShieldCheck`
  - `Trash2` -> `Trash`
  - `Plus` -> `PlusCircle`

### 2. Icon Style:
- Use `weight="duotone"` or `weight="bold"` consistently for a "weighted" organic feel.

---

## 🛠️ Technical Implementation Plan

1. **Phase 1: Styles & Dependencies**
   - Update `src/index.css` with new color variables and grain texture.
   - Install `@phosphor-icons/react` and uninstall `lucide-react`.

2. **Phase 2: Component Refactor**
   - Update `Navbar.jsx`, `Hero.jsx`, `SecretWall.jsx`, and `AdminDashboard.jsx`.
   - Update `GlassCard.jsx` to ensure hover effects match the Moss & Stone palette.

3. **Phase 3: Cleanup & Verification**
   - Remove any remaining "Camo" logic if present (already partially handled).
   - Ensure theme toggling still works with the new color palette (Light mode should also be adjusted to a "Light Stone" version).

---

## 📄 Spec Review
- [x] No TBDs or placeholders.
- [x] Internal consistency (colors match across all components).
- [x] Scope is focused on visual transformation.
- [x] Ambiguity check: "Duotone" weight selected for consistent iconography.

---

*Prepared by Gemini CLI for Webkelas Team.*
