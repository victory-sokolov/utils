import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    dataToFile,
    detectDeviceType,
    downloadAsJson,
    getOs,
    isMobileDevice,
    isPageReloaded,
} from '../../src/browser/browser';

describe('browser utilities', () => {
    let _appendChildSpy: ReturnType<typeof vi.spyOn>;
    let _removeChildSpy: ReturnType<typeof vi.spyOn>;
    let clickSpy: ReturnType<typeof vi.spyOn>;
    let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
    let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;
    let originalCreateElement: typeof document.createElement;

    beforeEach(() => {
        const mockAnchor = {
            click: vi.fn(),
            download: '',
            href: '',
            remove: vi.fn(),
            setAttribute: vi.fn((attr, value) => {
                if (attr === 'href') mockAnchor.href = value;
                if (attr === 'download') mockAnchor.download = value;
            }),
        };

        originalCreateElement = document.createElement.bind(document);
        document.createElement = vi.fn(tagName => {
            if (tagName === 'a') {
                return mockAnchor as any;
            }
            return originalCreateElement(tagName);
        });

        _appendChildSpy = vi
            .spyOn(document.body, 'appendChild')
            .mockImplementation((node: Node) => node);
        _removeChildSpy = vi
            .spyOn(document.body, 'removeChild')
            .mockImplementation((child: Node) => child);
        vi.spyOn(document.body, 'append').mockImplementation(() => {});
        clickSpy = vi.spyOn(mockAnchor, 'click');
        createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mockurl');
        revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        document.createElement = originalCreateElement;
    });

    describe('dataToFile', () => {
        it('should create an anchor element, set attributes, click, and revoke URL', () => {
            const content = new ArrayBuffer(8);
            const fileName = 'test.txt';
            const contentType = 'text/plain';

            dataToFile(content, fileName, contentType);

            expect(document.createElement).toHaveBeenCalledWith('a');
            expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
            expect(clickSpy).toHaveBeenCalledWith();
            expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mockurl');
            const mockAnchorAfterCall = (document.createElement as ReturnType<typeof vi.fn>).mock
                .results[0]!.value;
            expect(mockAnchorAfterCall.download).toBe(fileName);
        });
    });

    describe('detectDeviceType and isMobileDevice', () => {
        let originalUserAgent: string;

        beforeEach(() => {
            originalUserAgent = navigator.userAgent;
        });

        afterEach(() => {
            Object.defineProperty(navigator, 'userAgent', {
                configurable: true,
                value: originalUserAgent,
            });
        });

        it('should detect Mobile for a mobile user agent string', () => {
            Object.defineProperty(navigator, 'userAgent', {
                configurable: true,
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
            });
            expect(detectDeviceType()).toBe('Mobile');
            expect(isMobileDevice()).toBe(true);
        });

        it('should detect Desktop for a desktop user agent string', () => {
            Object.defineProperty(navigator, 'userAgent', {
                configurable: true,
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            });
            expect(detectDeviceType()).toBe('Desktop');
            expect(isMobileDevice()).toBe(false);
        });
    });

    describe('getOs', () => {
        let userAgentDataGetter: ReturnType<typeof vi.spyOn>;
        let platformGetter: ReturnType<typeof vi.spyOn>;
        let originalUserAgentData: any;

        beforeEach(() => {
            originalUserAgentData = navigator.userAgentData;
            Object.defineProperty(navigator, 'userAgentData', {
                configurable: true,
                value: { platform: '' },
                writable: true,
            });

            userAgentDataGetter = vi.spyOn(navigator, 'userAgentData', 'get');
            platformGetter = vi.spyOn(navigator, 'platform', 'get');
        });

        afterEach(() => {
            Object.defineProperty(navigator, 'userAgentData', {
                configurable: true,
                value: originalUserAgentData,
            });
            vi.restoreAllMocks();
        });

        it('should return platform from userAgentData if available', () => {
            userAgentDataGetter.mockReturnValue({ platform: 'macOS' } as any);
            platformGetter.mockReturnValue('Win32');
            expect(getOs()).toBe('macOS');
        });

        it('should return platform from navigator.platform if userAgentData is not available', () => {
            userAgentDataGetter.mockReturnValue();
            platformGetter.mockReturnValue('Linux');
            expect(getOs()).toBe('Linux');
        });

        it('should return "unknown" if no platform information is available', () => {
            userAgentDataGetter.mockReturnValue();
            platformGetter.mockReturnValue('');
            expect(getOs()).toBe('unknown');
        });
    });

    describe('downloadAsJson', () => {
        it('should create an anchor, set attributes, click, and remove for JSON download', () => {
            const testObject = { key: 'value', num: 123 };
            const fileName = 'config';
            const expectedDataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(testObject),
            )}`;

            downloadAsJson(testObject, fileName);

            const mockAnchor = (document.createElement as ReturnType<typeof vi.fn>).mock.results[0]!
                .value;

            expect(document.createElement).toHaveBeenCalledWith('a');
            expect(mockAnchor.setAttribute).toHaveBeenCalledWith('href', expectedDataStr);
            expect(mockAnchor.setAttribute).toHaveBeenCalledWith('download', `${fileName}.json`);
            expect(document.body.append).toHaveBeenCalledWith(mockAnchor);
            expect(mockAnchor.click).toHaveBeenCalledWith();
            expect(mockAnchor.remove).toHaveBeenCalledWith();
        });
    });

    describe('isPageReloaded', () => {
        let originalPerformance: Performance;

        beforeEach(() => {
            originalPerformance = window.performance;

            const mockPerformance = {
                getEntriesByType: vi.fn(),
            };

            Object.defineProperty(window, 'performance', {
                configurable: true,
                value: mockPerformance,
            });
        });

        afterEach(() => {
            Object.defineProperty(window, 'performance', {
                configurable: true,
                value: originalPerformance,
            });
            vi.restoreAllMocks();
        });

        it('should return true if entryType is "reload"', () => {
            (window.performance.getEntriesByType as ReturnType<typeof vi.fn>).mockReturnValue([
                {
                    entryType: 'navigation',
                    name: 'http://localhost/',
                    type: 'reload',
                },
            ]);
            expect(isPageReloaded()).toBe(true);
        });

        it('should return false if entryType is not "reload"', () => {
            (window.performance.getEntriesByType as ReturnType<typeof vi.fn>).mockReturnValue([
                {
                    entryType: 'navigation',
                    name: 'http://localhost/',
                    type: 'navigate',
                },
            ]);
            expect(isPageReloaded()).toBe(false);
        });

        it('should return false if no navigation entries are found', () => {
            (window.performance.getEntriesByType as ReturnType<typeof vi.fn>).mockReturnValue([]);
            expect(isPageReloaded()).toBe(false);
        });

        it('should return false if performance is not available', () => {
            Object.defineProperty(window, 'performance', {
                configurable: true,
                value: undefined,
            });
            expect(isPageReloaded()).toBe(false);
        });

        it('should return false if getEntriesByType is not a function', () => {
            const mockPerformance = {
                getEntriesByType: null,
            };
            Object.defineProperty(window, 'performance', {
                configurable: true,
                value: mockPerformance,
            });
            expect(isPageReloaded()).toBe(false);
        });
    });
});
