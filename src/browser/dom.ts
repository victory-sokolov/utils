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

// styles
export const style = (el: HTMLElement, styles: { [key: string]: string }) => {
    Object.keys(styles).forEach((name: string) => (el.style[name] = styles[name]));
};

// class
export const addClass = (el: HTMLElement, ...classArgs: string[]) => el.classList.add(...classArgs);
export const removeClass = (el: HTMLElement, ...classArgs: string[]) =>
    el.classList.remove(...classArgs);

// dom operation
export const insertBefore = (node: HTMLElement, beforeNode: HTMLElement) =>
    node.insertAdjacentElement('beforebegin', beforeNode);
export const insertAfter = (node: HTMLElement, afterNode: HTMLElement) =>
    node.insertAdjacentElement('afterend', afterNode);
export const prepend = (node: HTMLElement, preNode: HTMLElement) =>
    node.insertAdjacentElement('afterbegin', preNode);
