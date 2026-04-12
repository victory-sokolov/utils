(function () {
    'use strict';

    const CANONICAL_DOCS_BASE_URL = 'https://victory-sokolov.github.io/utils/';
    const MENU_ID = 'ai-toolbar-menu-panel';
    const STATUS_TIMEOUT_MS = 1600;

    const getPathAfterDocs = (pathname, prefix) => pathname.slice(pathname.lastIndexOf(prefix) + prefix.length);

    const getPublishedPathname = () => {
        const { pathname } = globalThis.location;
        const docsIndex = pathname.lastIndexOf('/docs/');

        if (docsIndex !== -1) {
            return getPathAfterDocs(pathname, '/docs/');
        }

        if (pathname.startsWith('/utils/')) {
            return getPathAfterDocs(pathname, '/utils/');
        }

        if (pathname === '/utils') {
            return 'index.html';
        }

        return pathname.replace(/^\/+/, '');
    };

    const getCanonicalPageUrl = () =>
        new URL(getPublishedPathname() + globalThis.location.search + globalThis.location.hash, CANONICAL_DOCS_BASE_URL).toString();

    const getCanonicalBaseUrl = () => CANONICAL_DOCS_BASE_URL;

    const toMarkdownPath = (pathname) => {
        if (pathname.endsWith('/index.html')) {
            return pathname.replace(/\/index\.html$/, '/markdown/index.md');
        }

        if (pathname.endsWith('/hierarchy.html')) {
            return pathname.replace(/\/hierarchy\.html$/, '/markdown/index.md');
        }

        const sectionMatch = pathname.match(/\/(functions|types|interfaces|enums|variables|modules)\/([^/]+)\.html$/);
        if (sectionMatch) {
            const replaced = pathname.replace(`/${sectionMatch[1]}/${sectionMatch[2]}.html`, `/markdown/${sectionMatch[1]}/${sectionMatch[2]}.md`);
            return replaced;
        }

        const nodeMatch = pathname.match(/\/node\/(functions|types|interfaces|enums|variables|modules)\/([^/]+)\.html$/);
        if (nodeMatch) {
            const replaced = pathname.replace(`/node/${nodeMatch[1]}/${nodeMatch[2]}.html`, `/markdown/node/${nodeMatch[1]}/${nodeMatch[2]}.md`);
            return replaced;
        }

        return null;
    };

    const getMarkdownUrl = () => {
        const published = getPublishedPathname();
        const markdownPath = toMarkdownPath('/' + (published || 'index.html'));
        if (!markdownPath) {
            return null;
        }

        return new URL(markdownPath.replace(/^\//, ''), getCanonicalBaseUrl()).toString();
    };

    const buildPrompt = () => 'Read from this URL: ' + getCanonicalPageUrl() + ' and explain it to me';

    const setStatus = (statusNode, message) => {
        statusNode.textContent = message;
        globalThis.clearTimeout(setStatus.timeoutId);
        setStatus.timeoutId = globalThis.setTimeout(() => {
            statusNode.textContent = '';
        }, STATUS_TIMEOUT_MS);
    };

    const copyText = (text) => navigator.clipboard.writeText(text);

    const openAssistant = async (statusNode, assistantName, url) => {
        globalThis.open(url, '_blank', 'noopener,noreferrer');
        await copyText(buildPrompt());
        setStatus(statusNode, 'Prompt copied for ' + assistantName);
    };

    const createIconElement = (className, ariaHidden, textContent) => {
        const element = document.createElement('span');
        element.className = className;
        element.setAttribute('aria-hidden', String(ariaHidden));
        element.textContent = textContent;
        return element;
    };

    const createActionButton = (config) => {
        const button = document.createElement('button');
        button.className = 'ai-toolbar-menu__action';
        button.dataset.action = config.action;
        button.type = 'button';

        const iconNode = createIconElement('ai-toolbar-menu__action-icon', true, config.icon);
        const content = document.createElement('span');
        content.className = 'ai-toolbar-menu__action-content';

        const title = document.createElement('span');
        title.className = 'ai-toolbar-menu__title';
        title.textContent = config.label;

        const subtitle = document.createElement('span');
        subtitle.className = 'ai-toolbar-menu__description';
        subtitle.textContent = config.description;

        content.append(title, subtitle);
        button.append(iconNode, content);
        return button;
    };

    const createTriggerButton = () => {
        const trigger = document.createElement('button');
        trigger.className = 'ai-toolbar-menu__trigger';
        trigger.type = 'button';
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', MENU_ID);

        const triggerGlyph = createIconElement('ai-toolbar-menu__trigger-glyph', true, '\u29E9');
        const triggerLabel = createIconElement('ai-toolbar-menu__trigger-label', false, 'Copy page');
        const triggerIcon = createIconElement('ai-toolbar-menu__trigger-icon', true, '\u25BE');

        trigger.append(triggerGlyph, triggerLabel, triggerIcon);
        return trigger;
    };

    const createStatusElement = () => {
        const status = document.createElement('div');
        status.className = 'ai-toolbar-menu__status';
        status.setAttribute('aria-live', 'polite');
        return status;
    };

    const createPanelElement = () => {
        const panel = document.createElement('div');
        panel.className = 'ai-toolbar-menu__panel';
        panel.id = MENU_ID;
        panel.hidden = true;

        const actions = [
            { action: 'copy-page', description: 'Copy this page URL.', icon: '\u29E9', label: 'Copy page URL' },
            { action: 'view-markdown', description: 'Open the markdown version when available.', icon: 'M', label: 'View as Markdown' },
            { action: 'open-claude', description: 'Copy the page prompt and open Claude.', icon: 'AI', label: 'Open in Claude' },
            { action: 'open-chatgpt', description: 'Copy the page prompt and open ChatGPT.', icon: 'AI', label: 'Open in ChatGPT' },
        ];

        for (let i = 0; i < actions.length; i++) {
            panel.append(createActionButton(actions[i]));
        }

        const status = createStatusElement();
        panel.append(status);
        return { panel, status };
    };

    const createWrapElement = () => {
        const wrap = document.createElement('div');
        wrap.className = 'ai-toolbar-menu';
        return wrap;
    };

    const attachElements = (wrap, trigger, panel, host) => {
        wrap.append(trigger, panel);
        host.append(wrap);
    };

    const handleCopyPage = async (statusNode, closeMenuCallback) => {
        await copyText(getCanonicalPageUrl());
        setStatus(statusNode, 'Page URL copied');
        closeMenuCallback();
    };

    const handleViewMarkdown = (statusNode, closeMenuCallback) => {
        const markdownUrl = getMarkdownUrl();
        if (markdownUrl) {
            globalThis.open(markdownUrl, '_blank', 'noopener,noreferrer');
            setStatus(statusNode, 'Opened markdown page');
        } else {
            setStatus(statusNode, 'No markdown page for this view');
        }
        closeMenuCallback();
    };

    const handleOpenAssistant = async (statusNode, assistantName, url, closeMenuCallback) => {
        await openAssistant(statusNode, assistantName, url);
        closeMenuCallback();
    };

    const handlePanelClick = (event, statusNode, closeMenuCallback) => {
        const button = event.target.closest('[data-action]');
        if (!(button instanceof HTMLButtonElement)) {
            return;
        }

        const action = button.dataset.action;

        if (action === 'copy-page') {
            handleCopyPage(statusNode, closeMenuCallback);
            return;
        }

        if (action === 'view-markdown') {
            handleViewMarkdown(statusNode, closeMenuCallback);
            return;
        }

        if (action === 'open-claude') {
            handleOpenAssistant(statusNode, 'Claude', 'https://claude.ai/', closeMenuCallback);
            return;
        }

        if (action === 'open-chatgpt') {
            handleOpenAssistant(statusNode, 'ChatGPT', 'https://chatgpt.com/', closeMenuCallback);
        }
    };

    const mount = () => {
        const host = document.querySelector('#tsd-toolbar-links');
        if (!host || host.dataset.aiToolbarMounted === 'true') {
            return;
        }

        host.dataset.aiToolbarMounted = 'true';

        const trigger = createTriggerButton();
        const panelAndStatus = createPanelElement();
        const panel = panelAndStatus.panel;
        const statusNode = panelAndStatus.status;
        const wrap = createWrapElement();

        attachElements(wrap, trigger, panel, host);

        const closeMenu = () => {
            panel.hidden = true;
            trigger.setAttribute('aria-expanded', 'false');
        };

        const openMenu = () => {
            panel.hidden = false;
            trigger.setAttribute('aria-expanded', 'true');
        };

        trigger.addEventListener('click', () => {
            if (panel.hidden) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        panel.addEventListener('click', (event) => {
            handlePanelClick(event, statusNode, closeMenu);
        });

        globalThis.document.addEventListener('click', (event) => {
            if (!wrap.contains(event.target)) {
                closeMenu();
            }
        });

        globalThis.document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    };

    if (globalThis.document.readyState === 'loading') {
        globalThis.document.addEventListener('DOMContentLoaded', mount, { once: true });
        return;
    }

    mount();
})();