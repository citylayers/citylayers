# Quick Start - Phase 5 Migration

## Before You Start

1. **Read these files first:**
   - [PHASE4_COMPLETE.md](./PHASE4_COMPLETE.md) - What was done
   - [PHASE5_PLAN.md](./PHASE5_PLAN.md) - Detailed migration plan

2. **Verify clean starting point:**
   ```bash
   cd /mnt/c/Users/00sta/source/repos/citylayers
   git status
   npm run build  # Should pass
   ```

3. **Current state:**
   - Branch: `oop-refactor`
   - Files migrated: 13/30 (43%)
   - Build: ✅ Passing

---

## What's Left to Migrate

### 🟢 Easy (30 min)
- `question.ts` - 4 button classes

### 🟡 Medium (1.5 hours)
- 8 panel files

### 🔴 Hard (3 hours)
- `projectComponent.ts` - 20+ classes
- `inputElement.ts` - 15+ classes

**Total:** ~5 hours

---

## Migration Steps

### Step 1: Easy Wins (Start Here!)
```bash
# Migrate question.ts buttons
# Open: client/src/ui/panelcomponent/question.ts
# Convert: ExitButton, BackButton, NextButton, SubmitButton
# Test: npm run build
```

### Step 2: Panels (One at a time)
```bash
# Order: homePanel → legal → teamPanel → projectPanel → qPanel → projectCard → landing → teamComponent
# Test after each: npm run build
# Commit after each: git commit -m "refactor: migrate [Panel] to BaseComponent"
```

### Step 3: ProjectComponent (Careful!)
```bash
# Open: client/src/ui/component/projectComponent.ts
# Start with base classes: ProjectPanel, Card
# Then variants: ProjectCard, SectionCard
# Then info classes
# Test frequently, commit often
```

### Step 4: InputElement (Most Complex)
```bash
# Open: client/src/ui/component/inputElement.ts
# Start with InputElement base
# Then simple inputs
# Then containers
# Test with forms
```

### Step 5: Cleanup
```bash
# Remove old files
rm client/src/ui/component/celement.ts
rm client/src/ui/component/cbutton.ts

# Verify
grep -r "CElement" client/src/  # Should be empty
npm run build  # Should pass

# Document
# Create PHASE5_COMPLETE.md
# Update README.md
```

---

## Key Patterns

### Button Template
```typescript
import { ClassName } from "../../constants/ClassNames";
import { BaseComponent } from "../component/BaseComponent";

class MyButton extends BaseComponent {
    private clickHandler: () => void;

    constructor(parentId: string, onClick: () => void) {
        super(parentId, ClassName.BUTTON);
        this.clickHandler = onClick;
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }
}
```

### Panel Template
```typescript
import { ClassName } from "../../constants/ClassNames";
import { ContentPanel } from "./contentPanel";

class MyPanel extends ContentPanel {
    constructor(parentId: string, data: any) {
        super(parentId, "panel-id", data);
        this.className = ClassName.MY_PANEL;

        // Add children
        this.addChild(new Header(this.makeId()));
    }
}
```

---

## Remember

✅ **Test after every file**
✅ **Commit incrementally**
✅ **Use enum constants (ClassName, not CLASSNAMES)**
✅ **Private/protected members**
✅ **afterInit() for event handlers**
✅ **addChild() in constructor**

---

## Help

If stuck, refer to these migrated examples:
- Simple button: `client/src/ui/component/closeButton.ts`
- Image component: `client/src/ui/component/imageElement.ts`
- Container: `client/src/ui/component/imageContainerElement.ts`
- Panel base: `client/src/ui/panel/contentPanel.ts`

---

**Ready? Start with question.ts! 🚀**
