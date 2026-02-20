import { kebabCase } from '../string.js';

/**
 * Wrapper for querySelector
 * @param selector HTML Selector as a string
 * @param context HTML element of document
 * @returns HTML Element
 */
export const $ = (
    selector: string,
    context: Document | HTMLElement = document,
): HTMLElement | null => context.querySelector(selector);

/**
 * Wrapper querySelectorAll
 * @param selector HTML Selector as a string
 * @param context HTML element of document
 * @returns NodeList of HTMLElements
 */
export const $$ = (
    selector: string,
    context: Document | HTMLElement = document,
): NodeListOf<HTMLElement> => context.querySelectorAll(selector);

// Styles
export const style = (el: HTMLElement, styles: Record<string, string>): void => {
    for (const name of Object.keys(styles)) {
        const value = styles[name];
        if (value) {
            el.style.setProperty(kebabCase(name), value);
        }
    }
};

// Class
export const addClass = (el: HTMLElement, ...classArgs: string[]): void =>
    el.classList.add(...classArgs);
export const removeClass = (el: HTMLElement, ...classArgs: string[]): void =>
    el.classList.remove(...classArgs);

// Dom operation
export const insertBefore = (node: HTMLElement, beforeNode: HTMLElement): void => {
    node.before(beforeNode);
};
export const insertAfter = (node: HTMLElement, afterNode: HTMLElement): void => {
    node.after(afterNode);
};
export const prepend = (node: HTMLElement, preNode: HTMLElement): void => {
    node.prepend(preNode);
};
