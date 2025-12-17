import { $, $$, addClass, insertAfter, insertBefore, prepend, removeClass, style } from '../../src/browser/dom';

describe('dOM helpers', () => {
    let parent: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
        parent = document.createElement('div');
        child = document.createElement('span');
        parent.appendChild(child);
    });

    it('should return the first element matching the given selector', () => {
        parent.innerHTML = '<span class="test"></span><span class="test"></span>';
        expect($('.test', parent)).toBe(parent.firstChild);
    });

    it('$$ should return all elements matching the given selector', () => {
        parent.innerHTML = '<span class="test"></span><span class="test"></span>';
        expect($$('.test', parent)).toHaveLength(2);
    });

    it('style should set the styles on the given element', () => {
        style(child, { color: 'red', fontSize: '20px' });
        expect(child.style.color).toBe('red');
        expect(child.style.fontSize).toBe('20px');
    });

    it('addClass should add class(es) to the given element', () => {
        addClass(child, 'test', 'test2');
        expect(child.classList.contains('test')).toBe(true);
        expect(child.classList.contains('test2')).toBe(true);
    });

    it('removeClass should remove class(es) from the given element', () => {
        child.classList.add('test', 'test2');
        removeClass(child, 'test', 'test2');
        expect(child.classList.contains('test')).toBe(false);
        expect(child.classList.contains('test2')).toBe(false);
    });

    it('insertBefore should insert node before the given node', () => {
        const newNode = document.createElement('span');
        insertBefore(child, newNode);
        expect(parent.firstChild).toBe(newNode);
        expect(newNode.nextSibling).toBe(child);
    });

    it('insertAfter should insert node after the given node', () => {
        const newNode = document.createElement('span');
        insertAfter(child, newNode);
        expect(child.nextSibling).toBe(newNode);
    });

    it('prepend should insert node at the beginning of the given node', () => {
        const newNode = document.createElement('span');
        prepend(child, newNode);
        expect(child.firstChild).toBe(newNode);
    });
});
