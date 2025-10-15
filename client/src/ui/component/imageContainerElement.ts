import { ContentElement } from "./contentElement";
import { Illustration } from '../../../../src/logic/illustration';
import { ImageElement } from "./imageElement";

/**
 * Image container element for displaying multiple images.
 * Extends ContentElement with proper OOP principles.
 */
class ImageContainerElement extends ContentElement {
    private images: Illustration[];

    constructor(parentId: string, className: string, illustrations: Illustration[]) {
        super(parentId || "main", undefined, className);
        this.className = className;
        this.images = illustrations;

        // Add ImageElement children for each illustration
        illustrations.forEach((illustration, index) => {
            this.addChild(new ImageElement(this.makeId(), `img_${index}`, illustration));
        });
    }
}

export { ImageContainerElement };