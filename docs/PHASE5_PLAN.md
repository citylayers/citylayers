# Phase 5 Plan - Complex Components Migration

## Quick Start for Next Session

```bash
cd /mnt/c/Users/00sta/source/repos/citylayers
git status                # Check current branch and changes
npm run build             # Verify starting point is clean
```

**Current Branch:** `oop-refactor`
**Starting Point:** Phase 4 complete (13/30 files migrated)

---

## Overview

Complete the client-side refactoring by migrating the remaining 17 files from old `CElement`/`CButton` architecture to new `BaseComponent` OOP pattern.

**Estimated Time:** 3-4 hours
**Complexity:** High (complex nested hierarchies)
**Risk:** Medium (many interdependencies)

---

## Files to Migrate (17 remaining)

### 1. Easy - Button Components (1 file, ~30 min)
**File:** `client/src/ui/panelcomponent/question.ts`

**Classes to migrate:**
- `ExitButton` extends CButton
- `BackButton` extends CButton
- `NextButton` extends CButton
- `SubmitButton` extends CButton

**Strategy:**
```typescript
// Convert from:
class NextButton extends CButton {
    constructor(parent: string) {
        super(parent, onclick);
        this.name = CLASSNAMES.NEXT;
    }
}

// To:
class NextButton extends BaseComponent {
    private clickHandler: () => void;

    constructor(parentId: string, onClick: () => void) {
        super(parentId, ClassName.NEXT);
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

---

### 2. Medium - Panel Files (8 files, ~1.5 hours)

#### Panel Files:
1. `client/src/ui/panel/homePanel.ts`
2. `client/src/ui/panel/projectPanel.ts`
3. `client/src/ui/panel/qPanel.ts`
4. `client/src/ui/panel/legal.ts`
5. `client/src/ui/panel/teamPanel.ts`
6. `client/src/ui/panel/projectCard.ts`

#### Panel Component Files:
7. `client/src/ui/panelcomponent/landing.ts`
8. `client/src/ui/panelcomponent/teamComponent.ts`

**Strategy:** Migrate in order, test after each
- All extend ContentPanel (already migrated to BaseComponent)
- Update constructor signatures
- Replace old load() patterns with new lifecycle hooks
- Use enum constants instead of CLASSNAMES object

**Testing after each panel:**
```bash
npm run build
# Check for TypeScript errors
# Verify no breaking changes
```

---

### 3. High Complexity - ProjectComponent (1 file, ~1.5 hours)
**File:** `client/src/ui/component/projectComponent.ts` (8.1K)

**Classes to migrate (20+):**
- Base classes:
  - `ProjectPanel` extends ContentPanel
  - `Card` extends CElement

- Card variants:
  - `ProjectCard` extends Card
  - `SectionCard` extends Card
  - `ProjectCardInfo` extends ContentPanel
  - `ProjectTeam` extends ContentPanel
  - `TeamPersonInfo` extends ContentPanel
  - `ProjectPeriodInfo` extends ContentPanel
  - `Recognition` extends ContentPanel

- Element classes:
  - `ProjectCardButton` extends CElement
  - `ProjectCardText` extends TextElement
  - `ProjectTitle` extends TextElement

**Migration Order:**
1. Start with base classes (ProjectPanel, Card)
2. Then variants (ProjectCard, SectionCard)
3. Then ContentPanel subclasses
4. Finally element classes
5. Test frequently, commit after each class

**Key Challenge:** Complex load() methods with dynamic element arrays
```typescript
// Old pattern:
this.elements = [ProjectTitle, ProjectCardInfo, ProjectCardButton];
load() {
    for (let e = 0; e < this.elements.length; e++) {
        let element = new this.elements[e](this.make_id(), this.id, this.content);
        element.initiate();
        element.load();
    }
}

// New pattern:
constructor(parentId: string, id: string, project: Project) {
    super(parentId, ClassName.CARD, id, project);

    this.addChild(new ProjectTitle(this.makeId(), id, project));
    this.addChild(new ProjectCardInfo(this.makeId(), id, project));
    this.addChild(new ProjectCardButton(this.makeId(), id, project));
}
```

---

### 4. Highest Complexity - InputElement (1 file, ~1.5 hours)
**File:** `client/src/ui/component/inputElement.ts` (9.8K)

**Classes to migrate (15+):**

#### Base Input Classes:
- `InputElement` extends CElement
- `InputContainer` extends ContentPanel

#### Input Types:
- `TextInputElement` extends InputElement
- `ImageInputElement` extends InputElement
- `RangeInputElement` extends InputElement
- `CheckboxInputElement` extends InputElement

#### Container Classes:
- `TextInputContainer` extends InputContainer
- `ImageInputContainer` extends InputContainer
- `ImageInputContainerElement` extends InputContainer
- `RangeContainerElement` extends InputContainer
- `RangeLabelElement` extends InputContainer
- `CheckboxContainerElement` extends InputContainer

#### Complex Elements:
- `CheckboxElement` extends InputContainer
- `CheckboxLabelElement` extends InputElement

**Migration Order:**
1. InputElement base (handles initiate/action/load)
2. Simple inputs (Text, Image)
3. InputContainer base
4. Simple containers (Text, Image)
5. Complex inputs (Range, Checkbox)
6. Test extensively with form functionality

**Key Challenge:** Custom `initiate(answerTree, nextid)` signature
```typescript
// Old pattern:
initiate(answerTree: AnswerTree, nextid: Map<string, string>) {
    let element = this.init_input(answerTree, nextid);
    this.init_extra(element);
}

// New pattern:
class InputElement extends BaseComponent {
    protected answerTree: AnswerTree;
    protected nextIds: Map<string, string>;

    constructor(parentId: string, id: string,
                answerTree: AnswerTree, nextIds: Map<string, string>) {
        super(parentId, "input", id);
        this.answerTree = answerTree;
        this.nextIds = nextIds;
    }

    protected afterInit(): void {
        const element = this.getElement();
        if (element) {
            this.initExtra(element);
            element.addEventListener('change', (ev) => this.handleAction(ev));
        }
    }

    protected handleAction(ev: Event): void {
        const target = ev.target as HTMLInputElement;
        this.answerTree.add(this.id, target.value);
        this.activateNext();
    }
}
```

---

### 5. Cleanup (30 min)

After all migrations complete:

1. **Remove old base classes:**
   ```bash
   rm client/src/ui/component/celement.ts
   rm client/src/ui/component/cbutton.ts
   ```

2. **Verify no imports remain:**
   ```bash
   grep -r "from.*celement" client/src/
   grep -r "from.*cbutton" client/src/
   grep -r "import.*CElement" client/src/
   grep -r "import.*CButton" client/src/
   # Should return nothing
   ```

3. **Final build:**
   ```bash
   npm run build
   # Should pass with 0 errors
   ```

4. **Update documentation:**
   - Mark Phase 5 as complete
   - Update metrics in README.md
   - Create final summary

---

## Testing Strategy

After each migration batch:

1. **Build test:**
   ```bash
   npm run build
   ```

2. **Type check:**
   - Look for TypeScript errors
   - Verify all imports resolve

3. **Pattern check:**
   ```bash
   # Verify using new constants
   grep -r "CLASSNAMES\." client/src/ui/component/[migrated-file].ts
   # Should return nothing

   # Verify using enum
   grep -r "ClassName\." client/src/ui/component/[migrated-file].ts
   # Should find usages
   ```

4. **Commit incrementally:**
   ```bash
   git add client/src/ui/component/[file].ts
   git commit -m "refactor: migrate [Component] to BaseComponent"
   ```

---

## Common Patterns to Apply

### Pattern 1: Simple Button
```typescript
class MyButton extends BaseComponent {
    private clickHandler: () => void;

    constructor(parentId: string, onClick: () => void) {
        super(parentId, ClassName.MY_BUTTON);
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

### Pattern 2: Container with Dynamic Children
```typescript
class MyContainer extends BaseComponent {
    constructor(parentId: string, items: Item[]) {
        super(parentId, ClassName.CONTAINER);

        // Add children in constructor
        items.forEach((item, index) => {
            this.addChild(new ItemComponent(this.makeId(), `item_${index}`, item));
        });
    }
}
```

### Pattern 3: Panel Extending ContentPanel
```typescript
class MyPanel extends ContentPanel {
    constructor(parentId: string, data: any) {
        super(parentId, "my-panel-id", data);
        this.className = ClassName.MY_PANEL;

        // Add children
        this.addChild(new Header(this.makeId()));
        this.addChild(new Content(this.makeId(), data));
    }
}
```

### Pattern 4: Input with Event Handling
```typescript
class MyInput extends BaseComponent {
    private changeHandler: (value: string) => void;

    constructor(parentId: string, onChange: (value: string) => void) {
        super(parentId, ClassName.INPUT);
        this.changeHandler = onChange;
    }

    protected getElementTag(): string {
        return 'input';
    }

    protected afterInit(): void {
        this.addEventListener('change', (ev: Event) => {
            const target = ev.target as HTMLInputElement;
            this.changeHandler(target.value);
        });
    }
}
```

---

## Troubleshooting

### Issue: Type errors with old signatures
**Solution:** Check if component still uses old CElement methods like `make_id()` → should be `makeId()`

### Issue: Element not appearing
**Solution:** Verify `initiate()` called, then `load()` called for children

### Issue: Event handlers not working
**Solution:** Ensure handlers attached in `afterInit()` hook, not in constructor

### Issue: Children not rendering
**Solution:** Call `this.addChild()` in constructor, then `child.load()` will be called automatically

### Issue: Build errors after migration
**Solution:** Check all imports updated to use new constants (ClassName, not CLASSNAMES)

---

## Success Criteria

Phase 5 complete when:

- [ ] All 17 remaining files migrated to BaseComponent
- [ ] Old celement.ts and cbutton.ts removed
- [ ] `npm run build` passes with 0 errors
- [ ] No imports of CElement or CButton remain
- [ ] All components use enum constants (ClassName, DisplayStyle, etc.)
- [ ] Git commits made incrementally
- [ ] Documentation updated (PHASE5_COMPLETE.md)
- [ ] README.md updated with final metrics

---

## Phase 5 Checklist

### Session Start
- [ ] Read PHASE4_COMPLETE.md
- [ ] Read PHASE5_PLAN.md (this file)
- [ ] Check git status
- [ ] Run `npm run build` to verify clean state
- [ ] Create backup branch (optional): `git branch phase5-backup`

### Easy Migrations
- [ ] Migrate question.ts buttons (4 classes)
- [ ] Test build
- [ ] Commit

### Medium Migrations
- [ ] Migrate homePanel.ts
- [ ] Migrate legal.ts
- [ ] Migrate teamPanel.ts
- [ ] Migrate projectPanel.ts
- [ ] Migrate qPanel.ts
- [ ] Migrate projectCard.ts
- [ ] Migrate landing.ts
- [ ] Migrate teamComponent.ts
- [ ] Test build after each
- [ ] Commit incrementally

### High Complexity
- [ ] Migrate projectComponent.ts (20+ classes)
  - [ ] Base classes first
  - [ ] Test frequently
  - [ ] Commit after each major class
- [ ] Migrate inputElement.ts (15+ classes)
  - [ ] Base input classes
  - [ ] Container classes
  - [ ] Complex inputs
  - [ ] Test with forms
  - [ ] Commit after each section

### Cleanup
- [ ] Verify no CElement/CButton imports
- [ ] Remove celement.ts
- [ ] Remove cbutton.ts
- [ ] Final build test
- [ ] Final commit

### Documentation
- [ ] Create PHASE5_COMPLETE.md
- [ ] Update README.md
- [ ] Update CLAUDE.md with final metrics
- [ ] Commit documentation

---

## Estimated Timeline

| Task | Time | Cumulative |
|------|------|------------|
| Session prep | 10 min | 10 min |
| Question buttons | 30 min | 40 min |
| Panel files (8) | 1.5 hours | 2h 10min |
| ProjectComponent | 1.5 hours | 3h 40min |
| InputElement | 1.5 hours | 5h 10min |
| Cleanup | 30 min | 5h 40min |
| Documentation | 20 min | 6 hours |

**Total:** ~6 hours (with breaks and testing)

---

## Quick Commands Reference

```bash
# Build
npm run build

# Search for old patterns
grep -r "extends CElement" client/src/
grep -r "extends CButton" client/src/
grep -r "CLASSNAMES\." client/src/

# Search for new patterns
grep -r "extends BaseComponent" client/src/
grep -r "ClassName\." client/src/

# Count TypeScript files
find client/src/ui -name "*.ts" | wc -l

# Git workflow
git add [file]
git commit -m "refactor: migrate [Component] to BaseComponent"
git status
```

---

**Ready to start Phase 5?** Read this file first, then begin with question.ts buttons!

---

*Created: 2025-10-13*
*For: Phase 5 Client-Side Refactoring*
