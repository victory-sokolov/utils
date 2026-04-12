(() => {
    const CANONICAL_DOCS_BASE_URL = 'https://victory-sokolov.github.io/utils/';
    const MENU_ID = 'ai-toolbar-menu-panel';
    const STATUS_TIMEOUT_MS = 1600;

    const getPageUrl = () => window.location.href;
    const getPublishedPathname = () => {
        const { pathname } = window.location;
        const docsIndex = pathname.lastIndexOf('/docs/');

        if (docsIndex >= 0) {
            return pathname.slice(docsIndex + '/docs/'.length);
        }

        if (pathname.startsWith('/utils/')) {
            return pathname.slice('/utils/'.length);
        }

        if (pathname === '/utils') {
            return 'index.html';
        }

        return pathname.replace(/^\/+/, '');
    };

    const getCanonicalPageUrl = () =>
        new URL(getPublishedPathname() + window.location.search + window.location.hash, CANONICAL_DOCS_BASE_URL).toString();

    const withTrailingSlash = value => (value.endsWith('/') ? value : `${value}/`);

    const getBaseUrl = () => {
        const base = document.documentElement.dataset.base ?? './';
        return new URL(withTrailingSlash(base), window.location.href);
    };

    const getCanonicalBaseUrl = () => {
        const base = document.documentElement.dataset.base ?? './';
        return new URL(withTrailingSlash(base), CANONICAL_DOCS_BASE_URL);
    };

    const toMarkdownPath = pathname => {
        if (pathname.endsWith('/index.html')) {
            return pathname.replace(/\/index\.html$/, '/markdown/index.md');
        }

        if (pathname.endsWith('/hierarchy.html')) {
            return pathname.replace(/\/hierarchy\.html$/, '/markdown/index.md');
        }

        const sectionMatch = pathname.match(/\/(functions|types|interfaces|enums|variables|modules)\/([^/]+)\.html$/);
        if (sectionMatch) {
            const [, section, slug] = sectionMatch;
            return pathname.replace(`/${section}/${slug}.html`, `/markdown/${section}/${slug}.md`);
        }

        return null;
    };

    const getMarkdownUrl = () => {
        const markdownPath = toMarkdownPath(`/${getPublishedPathname()}`);
        if (!markdownPath) {
            return null;
        }

        return new URL(markdownPath, getCanonicalBaseUrl()).toString();
    };

    const buildPrompt = () => `Read from this URL: ${getCanonicalPageUrl()} and explain it to me`;

    const setStatus = (statusNode, message) => {
        statusNode.textContent = message;
        window.clearTimeout(setStatus.timeoutId);
        setStatus.timeoutId = window.setTimeout(() => {
            statusNode.textContent = '';
        }, STATUS_TIMEOUT_MS);
    };

    const copyText = async text => {
        await navigator.clipboard.writeText(text);
    };

    const openAssistant = async (statusNode, assistantName, url) => {
        await copyText(buildPrompt());
        window.open(url, '_blank', 'noopener,noreferrer');
        setStatus(statusNode, `Prompt copied for ${assistantName}`);
    };

    const createActionButton = ({ action, description, icon, label }) => {
        const button = document.createElement('button');
        button.className = 'ai-toolbar-menu__action';
        button.dataset.action = action;
        button.type = 'button';

        const iconNode = document.createElement('span');
        iconNode.className = 'ai-toolbar-menu__action-icon';
        iconNode.setAttribute('aria-hidden', 'true');
        iconNode.textContent = icon;

        const content = document.createElement('span');
        content.className = 'ai-toolbar-menu__action-content';

        const title = document.createElement('span');
        title.className = 'ai-toolbar-menu__title';
        title.textContent = label;

        const subtitle = document.createElement('span');
        subtitle.className = 'ai-toolbar-menu__description';
        subtitle.textContent = description;

        content.append(title, subtitle);
        button.append(iconNode, content);
        return button;
    };

    const mount = () => {
        const host = document.getElementById('tsd-toolbar-links');
        if (!host || host.dataset.aiToolbarMounted === 'true') {
            return;
        }

        host.dataset.aiToolbarMounted = 'true';

        const wrap = document.createElement('div');
        wrap.className = 'ai-toolbar-menu';

        const trigger = document.createElement('button');
        trigger.className = 'ai-toolbar-menu__trigger';
        trigger.type = 'button';
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', MENU_ID);

        const triggerGlyph = document.createElement('span');
        triggerGlyph.className = 'ai-toolbar-menu__trigger-glyph';
        triggerGlyph.setAttribute('aria-hidden', 'true');
        triggerGlyph.textContent = '⧉';

        const triggerLabel = document.createElement('span');
        triggerLabel.className = 'ai-toolbar-menu__trigger-label';
        triggerLabel.textContent = 'Copy page';

        const triggerIcon = document.createElement('span');
        triggerIcon.className = 'ai-toolbar-menu__trigger-icon';
        triggerIcon.setAttribute('aria-hidden', 'true');
        triggerIcon.textContent = '▾';

        trigger.append(triggerGlyph, triggerLabel, triggerIcon);

        const panel = document.createElement('div');
        panel.className = 'ai-toolbar-menu__panel';
        panel.id = MENU_ID;
        panel.hidden = true;

        const status = document.createElement('div');
        status.className = 'ai-toolbar-menu__status';
        status.setAttribute('aria-live', 'polite');

        const actions = [
            {
                action: 'copy-page',
                description: 'Copy this page URL.',
                icon: '⧉',
                label: 'Copy page URL',
            },
            {
                action: 'view-markdown',
                description: 'Open the markdown version when available.',
                icon: 'M',
                label: 'View as Markdown',
            },
            {
                action: 'open-claude',
                description: 'Copy the page prompt and open Claude.',
                icon: 'AI',
                label: 'Open in Claude',
            },
            {
                action: 'open-chatgpt',
                description: 'Copy the page prompt and open ChatGPT.',
                icon: 'AI',
                label: 'Open in ChatGPT',
            },
        ];

        for (const config of actions) {
            panel.append(createActionButton(config));
        }

        panel.append(status);
        wrap.append(trigger, panel);
        host.append(wrap);

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
                return;
            }

            closeMenu();
        });

        panel.addEventListener('click', async event => {
            const button = event.target.closest('[data-action]');
            if (!(button instanceof HTMLButtonElement)) {
                return;
            }

            const { action } = button.dataset;

            try {
                if (action === 'copy-page') {
                    await copyText(getPageUrl());
                    setStatus(status, 'Page URL copied');
                }

                if (action === 'view-markdown') {
                    const markdownUrl = getMarkdownUrl();
                    if (!markdownUrl) {
                        setStatus(status, 'No markdown page for this view');
                    } else {
                        window.open(markdownUrl, '_blank', 'noopener,noreferrer');
                        setStatus(status, 'Opened markdown page');
                    }
                }

                if (action === 'open-claude') {
                    await openAssistant(status, 'Claude', 'https://claude.ai/');
                }

                if (action === 'open-chatgpt') {
                    await openAssistant(status, 'ChatGPT', 'https://chatgpt.com/');
                }
            } catch {
                setStatus(status, 'Action failed');
            } finally {
                closeMenu();
            }
        });

        document.addEventListener('click', event => {
            if (!wrap.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
        return;
    }

    mount();
})();
