/**
 * Tests for utils/formatting.ts
 */

import { describe, it, expect } from 'vitest';
import { createListSummary } from '../../../src/utils/formatting.js';

describe('formatting', () => {
  describe('createListSummary', () => {
    it('should create basic list summary', () => {
      const result = createListSummary('deal', 10, false);
      expect(result).toBe('Found 10 deals.');
    });

    it('should use singular for count of 1', () => {
      const result = createListSummary('deal', 1, false);
      expect(result).toBe('Found 1 deal.');
    });

    it('should indicate more available', () => {
      const result = createListSummary('deal', 50, true);
      expect(result).toBe('Found 50 deals. More available with cursor pagination.');
    });

    it('should include additional info', () => {
      const result = createListSummary('deal', 25, false, '$1.2M total');
      expect(result).toBe('Found 25 deals. ($1.2M total).');
    });

    it('should combine all parts without double period', () => {
      const result = createListSummary('person', 100, true, '5 new');
      expect(result).toBe('Found 100 persons. (5 new). More available with cursor pagination.');
    });

    it('should work with zero count', () => {
      const result = createListSummary('activity', 0, false);
      expect(result).toBe('Found 0 activitys.'); // Note: simple pluralization adds 's'
    });
  });
});
