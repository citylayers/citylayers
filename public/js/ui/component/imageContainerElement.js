/**
 * Image container element for displaying multiple images.
 * Extends ContentElement with proper OOP principles.
 */
class ImageContainerElement extends ContentElement {
    constructor(parentId, className, illustrations) {
        super(parentId || "main", undefined, className);
        this.className = className;
        this.images = illustrations;
        // Add ImageElement children for each illustration
        illustrations.forEach((illustration, index) => {
            this.addChild(new ImageElement(this.makeId(), `img_${index}`, illustration));
        });
    }
}
