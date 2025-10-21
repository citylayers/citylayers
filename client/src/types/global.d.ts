/**
 * Global type declarations for classes loaded via script tags
 * Only declare types that are NOT defined in TypeScript source files
 */

declare const Illustration: any;

interface Window {
    uuidv4: () => string;
}
