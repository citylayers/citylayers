/**
 * Partner element component for displaying partner logos.
 * Extends ContentElement with proper OOP principles.
 */
class PartnerElement extends ContentElement {
    constructor(parentId, id, content) {
        super(parentId, id, content);
        // Override className from ContentElement
        this.className = ClassName.PARTNER;
        // Add three logo children
        for (let i = 0; i < 3; i++) {
            this.addChild(new Logo(this.makeId()));
        }
    }
}
