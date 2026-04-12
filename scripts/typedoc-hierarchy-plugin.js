import {
    DefaultTheme,
    DefaultThemeRenderContext,
    JSX,
    ReflectionKind,
    RendererEvent,
} from 'typedoc';
import { createRequire } from 'node:module';
import fsExtra from 'fs-extra';
import path from 'node:path';
import process from 'node:process';

const require = createRequire(import.meta.url);
const { copySync } = fsExtra;

const renderItemLink = (item, context) =>
    JSX.createElement(
        'a',
        {
            class: 'category__link js-category-link category__link--ts',
            'data-id': `/${context.router.getFullUrl(item)}`,
            href: context.urlTo(item),
        },
        item.title,
    );

const renderItemChildren = (item, context) =>
    JSX.createElement(
        'ul',
        null,
        item.children?.map(subItem =>
            JSX.createElement(
                'li',
                null,
                JSX.createElement(
                    'a',
                    {
                        class: 'category__link js-category-link',
                        'data-id': `/${context.router.getFullUrl(subItem)}`,
                        href: context.urlTo(subItem),
                    },
                    context.icons[subItem.kind](),
                    subItem.name,
                ),
            ),
        ),
    );

const renderDisabledItem = (item, context) =>
    JSX.createElement(
        JSX.Fragment,
        null,
        JSX.createElement('span', { class: 'category__link category__link--disable js-category-link category__link--ts' }, item.title),
        renderDisabledChildren(item, context),
    );

const renderDisabledChildren = (item, context) =>
    JSX.createElement(
        'ul',
        null,
        item.children.map(subItem =>
            JSX.createElement(
                'li',
                null,
                JSX.createElement(
                    'a',
                    {
                        class: 'category__link js-category-link',
                        'data-id': `/${context.router.getFullUrl(subItem)}`,
                        href: context.urlTo(subItem),
                    },
                    context.icons[subItem.kind](),
                    subItem.name,
                ),
            ),
        ),
    );

const Item = ({ item, context }) => {
    if ('id' in item) {
        return JSX.createElement(
            JSX.Fragment,
            null,
            renderItemLink(item, context),
            renderItemChildren(item, context),
        );
    }

    return renderDisabledItem(item, context);
};

const Navigation = ({ categories, context, id, items }) =>
    JSX.createElement(
        'ul',
        { class: 'js-category-list category', 'data-id': id },
        Object.entries(categories).map(([key, item]) =>
            JSX.createElement(
                'li',
                null,
                JSX.createElement(
                    'span',
                    { class: 'js-category-title category__title', 'data-id': item.id },
                    JSX.createElement('div', { class: 'category__folder', 'data-id': item.id }),
                    key,
                ),
                JSX.createElement(Navigation, { categories: item.categories, context, id: item.id, items: item.items }),
            ),
        ),
        items.map(item => JSX.createElement('li', null, JSX.createElement(Item, { context, item }))),
    );

const getName = item => {
    const fullFileName = item.sources?.[0]?.fullFileName ?? '';
    const targetFileName = fullFileName.replaceAll(path.sep, '/');
    const currentDirName = process.cwd().replaceAll(path.sep, '/');
    return targetFileName.replace(currentDirName, '').slice(1);
};

const makeAddToCategory = () => {
    const addToCategoryRecursive = (category, item, titleSplit, idx) => {
        const isLastSegment = idx === titleSplit.length - 1;

        if (isLastSegment) {
            if (item.kind === ReflectionKind.Module) {
                item.title = titleSplit[idx] ?? '';
                item.children = item.children ?? [];
                category.items.push(item);
                return;
            }

            const existingItem = category.items.find(entry => entry.title === titleSplit[idx]);
            if (existingItem) {
                existingItem.children?.push(item);
                return;
            }

            category.items.push({
                children: [item],
                title: titleSplit[idx] ?? '',
            });
            return;
        }

        const title = titleSplit[idx];
        if (!title) return;

        category.categories[title] ??= {
            categories: {},
            id: `${category.id}-${title}`,
            items: [],
        };

        const nextCategory = category.categories[title];
        addToCategoryRecursive(nextCategory, item, titleSplit, idx + 1);
    };

    return (category, item, titleSplit, idx) => addToCategoryRecursive(category, item, titleSplit, idx);
};

const addToCategory = makeAddToCategory();

const formatFileHierarchy = values => {
    const result = {
        categories: {},
        id: 'root',
        items: [],
    };

    for (const item of values) {
        addToCategory(result, item, getName(item).split('/'), 0);
    }

    return result;
};

const createExpandIcon = () =>
    JSX.createElement(
        'svg',
        {
            fill: 'currentColor',
            viewBox: '0 0 490.72 490.72',
            x: '0px',
            xmlns: 'http://www.w3.org/2000/svg',
            y: '0px',
        },
        JSX.createElement('path', {
            d: 'M480.027,288.027H10.693c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667h213.333v144.96l-45.76-45.76c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l64,64c4.16,4.16,10.88,4.16,15.04,0l64-64c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0l-45.867,45.76V309.36h234.667c5.867,0,10.667-4.8,10.667-10.667C490.693,292.827,485.893,288.027,480.027,288.027z',
        }),
        JSX.createElement('path', {
            d: 'M10.693,224.027h469.333c5.867,0,10.667-4.8,10.667-10.667c0-5.867-4.8-10.667-10.667-10.667H245.36V36.4l45.76,45.76c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827l-64-64c-4.16-4.16-10.88-4.16-15.04,0l-64,64c-4.053,4.267-3.947,10.987,0.213,15.04c4.16,3.947,10.667,3.947,14.827,0l45.867-45.76v166.293H10.693c-5.867,0-10.667,4.8-10.667,10.667C0.027,219.227,4.827,224.027,10.693,224.027z',
        }),
    );

const createCollapseIcon = () =>
    JSX.createElement(
        'svg',
        { fill: 'currentColor', viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' },
        JSX.createElement('path', {
            d: 'M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z',
            'fill-rule': 'evenodd',
        }),
    );

const createTargetIcon = () =>
    JSX.createElement(
        'svg',
        { fill: 'currentColor', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
        JSX.createElement('circle', { cx: '12', cy: '12', r: '3' }),
        JSX.createElement('path', {
            d: 'M13 4.069V2h-2v2.069A8.008 8.008 0 0 0 4.069 11H2v2h2.069A8.007 8.007 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z',
        }),
    );

const renderNavigationButtons = () =>
    JSX.createElement(
        'div',
        { class: 'tree-config' },
        JSX.createElement(
            'button',
            { class: 'tree-config__button tree-config__button--expand js-tree-expand', title: 'Expand All' },
            createExpandIcon(),
        ),
        JSX.createElement(
            'button',
            { class: 'tree-config__button tree-config__button--collapse js-tree-collapse', title: 'Collapse All' },
            createCollapseIcon(),
        ),
        JSX.createElement(
            'button',
            { class: 'tree-config__button tree-config__button--target js-tree-target', title: 'Scroll to current file' },
            createTargetIcon(),
        ),
    );

const renderNavigationTree = (categories, context) =>
    JSX.createElement('div', { class: 'tree-content' }, JSX.createElement(Navigation, { categories, context, id: categories.id, items: categories.items }));

const navigation = context => props => {
    const categories = formatFileHierarchy(props.model.project.children ?? []);

    return JSX.createElement(
        'div',
        { class: 'tree' },
        renderNavigationButtons(),
        renderNavigationTree(categories, context),
    );
};

class OverrideThemeContext extends DefaultThemeRenderContext {
    navigation = context => navigation(this)(context);
}

class OverrideTheme extends DefaultTheme {
    constructor(renderer) {
        super(renderer);
        this.owner.on(RendererEvent.END, event => {
            const themeEntry = require.resolve('typedoc-theme-hierarchy');
            copySync(path.join(themeEntry, '../assets'), path.join(event.outputDirectory, 'assets'));
        });
    }

    getRenderContext(pageEvent) {
        return new OverrideThemeContext(this.router, this, pageEvent, this.application.options);
    }
}

export function load(app) {
    app.renderer.hooks.on('head.end', context =>
        JSX.createElement('link', { href: context.relativeURL('assets/hierarchy.css'), rel: 'stylesheet' }),
    );

    app.renderer.hooks.on('body.end', context =>
        JSX.createElement('script', { src: context.relativeURL('assets/hierarchy-theme.js') }),
    );

    app.renderer.defineTheme('hierarchy', OverrideTheme);
}
