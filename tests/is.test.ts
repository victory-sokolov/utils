import { describe, expect, it } from 'vitest';
import { isDate } from '../src/is';

describe('test is utils', () => {
  it('is date', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("2025-02-27T11:50:00.000Z'"))).toBe(true);
    expect(isDate("2025-02-27T11:50:00.000Z'")).toBe(false);
  });
});
