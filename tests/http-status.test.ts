import { describe, expect, it } from 'vitest';
import { StatusCodes, ReasonPhrases, getStatusCode, getReasonPhrase } from '../src/http-status';

describe('StatusCodes', () => {
    it('should have correct values for informational codes', () => {
        expect(StatusCodes.CONTINUE).toBe(100);
        expect(StatusCodes.SWITCHING_PROTOCOLS).toBe(101);
        expect(StatusCodes.PROCESSING).toBe(102);
        expect(StatusCodes.EARLY_HINTS).toBe(103);
    });

    it('should have correct values for success codes', () => {
        expect(StatusCodes.OK).toBe(200);
        expect(StatusCodes.CREATED).toBe(201);
        expect(StatusCodes.ACCEPTED).toBe(202);
        expect(StatusCodes.NO_CONTENT).toBe(204);
    });

    it('should have correct values for redirect codes', () => {
        expect(StatusCodes.MULTIPLE_CHOICES).toBe(300);
        expect(StatusCodes.MOVED_PERMANENTLY).toBe(301);
        expect(StatusCodes.NOT_MODIFIED).toBe(304);
        expect(StatusCodes.PERMANENT_REDIRECT).toBe(308);
    });

    it('should have correct values for client error codes', () => {
        expect(StatusCodes.BAD_REQUEST).toBe(400);
        expect(StatusCodes.UNAUTHORIZED).toBe(401);
        expect(StatusCodes.FORBIDDEN).toBe(403);
        expect(StatusCodes.NOT_FOUND).toBe(404);
        expect(StatusCodes.IM_A_TEAPOT).toBe(418);
    });

    it('should have correct values for server error codes', () => {
        expect(StatusCodes.INTERNAL_SERVER_ERROR).toBe(500);
        expect(StatusCodes.NOT_IMPLEMENTED).toBe(501);
        expect(StatusCodes.BAD_GATEWAY).toBe(502);
        expect(StatusCodes.SERVICE_UNAVAILABLE).toBe(503);
    });
});

describe('ReasonPhrases', () => {
    it('should have correct values for informational phrases', () => {
        expect(ReasonPhrases.CONTINUE).toBe('Continue');
        expect(ReasonPhrases.SWITCHING_PROTOCOLS).toBe('Switching Protocols');
    });

    it('should have correct values for success phrases', () => {
        expect(ReasonPhrases.OK).toBe('OK');
        expect(ReasonPhrases.CREATED).toBe('Created');
        expect(ReasonPhrases.NO_CONTENT).toBe('No Content');
    });

    it('should have correct values for client error phrases', () => {
        expect(ReasonPhrases.BAD_REQUEST).toBe('Bad Request');
        expect(ReasonPhrases.NOT_FOUND).toBe('Not Found');
        expect(ReasonPhrases.IM_A_TEAPOT).toBe("I'm a teapot");
    });

    it('should have correct values for server error phrases', () => {
        expect(ReasonPhrases.INTERNAL_SERVER_ERROR).toBe('Internal Server Error');
        expect(ReasonPhrases.SERVICE_UNAVAILABLE).toBe('Service Unavailable');
    });
});

describe('getStatusCode', () => {
    it('should return correct status code for valid reason phrase', () => {
        expect(getStatusCode('OK')).toBe(StatusCodes.OK);
        expect(getStatusCode('Not Found')).toBe(StatusCodes.NOT_FOUND);
        expect(getStatusCode('Created')).toBe(StatusCodes.CREATED);
    });

    it('should return undefined for invalid reason phrase', () => {
        expect(getStatusCode('Invalid')).toBeUndefined();
        expect(getStatusCode('')).toBeUndefined();
    });

    it('should handle all valid reason phrases', () => {
        expect(getStatusCode('Continue')).toBe(StatusCodes.CONTINUE);
        expect(getStatusCode('Bad Gateway')).toBe(StatusCodes.BAD_GATEWAY);
        expect(getStatusCode('Too Many Requests')).toBe(StatusCodes.TOO_MANY_REQUESTS);
    });
});

describe('getReasonPhrase', () => {
    it('should return correct reason phrase for valid status code', () => {
        expect(getReasonPhrase(200)).toBe('OK');
        expect(getReasonPhrase(404)).toBe('Not Found');
        expect(getReasonPhrase(201)).toBe('Created');
    });

    it('should return undefined for invalid status code', () => {
        expect(getReasonPhrase(999)).toBeUndefined();
        expect(getReasonPhrase(0)).toBeUndefined();
    });

    it('should handle all valid status codes', () => {
        expect(getReasonPhrase(100)).toBe('Continue');
        expect(getReasonPhrase(502)).toBe('Bad Gateway');
        expect(getReasonPhrase(429)).toBe('Too Many Requests');
    });
});

describe('StatusCodes and ReasonPhrases alignment', () => {
    it('should have matching entries for each status code', () => {
        const statusCodeEntries = Object.entries(StatusCodes).filter(([key]) => isNaN(Number(key)));
        const reasonPhraseEntries = Object.entries(ReasonPhrases);

        expect(statusCodeEntries.length).toBe(reasonPhraseEntries.length);

        statusCodeEntries.forEach(([key, value]) => {
            const reasonPhrase = reasonPhraseEntries.find(
                ([, rv]) => rv === (ReasonPhrases as any)[key],
            );
            expect(reasonPhrase).toBeDefined();
        });
    });
});
