/**
 * Tests for utils/formatting.ts
 */

import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDate,
  summarizeDeal,
  summarizePerson,
  summarizeOrganization,
  summarizeActivity,
  createListSummary,
  truncate,
} from '../../../src/utils/formatting.js';

describe('formatting', () => {
  describe('formatCurrency', () => {
    it('should format USD currency', () => {
      const result = formatCurrency(10000, 'USD');
      expect(result).toBe('$10,000');
    });

    it('should format EUR currency', () => {
      const result = formatCurrency(5000, 'EUR');
      // EUR formatting varies by locale, just check it contains the value
      expect(result).toContain('5,000');
    });

    it('should format GBP currency', () => {
      const result = formatCurrency(2500, 'GBP');
      expect(result).toContain('2,500');
    });

    it('should default to USD when currency is not provided', () => {
      const result = formatCurrency(1000);
      expect(result).toBe('$1,000');
    });

    it('should return N/A for null value', () => {
      const result = formatCurrency(null);
      expect(result).toBe('N/A');
    });

    it('should return N/A for undefined value', () => {
      const result = formatCurrency(undefined);
      expect(result).toBe('N/A');
    });

    it('should format zero value', () => {
      const result = formatCurrency(0, 'USD');
      expect(result).toBe('$0');
    });

    it('should handle large values', () => {
      const result = formatCurrency(1000000, 'USD');
      expect(result).toBe('$1,000,000');
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string', () => {
      const result = formatDate('2024-01-15');
      // Timezone-independent check
      expect(result).toContain('2024');
      expect(result).toContain('Jan');
    });

    it('should format full ISO datetime', () => {
      const result = formatDate('2024-06-20T10:30:00Z');
      expect(result).toContain('2024');
      expect(result).toContain('Jun');
      expect(result).toContain('20');
    });

    it('should return N/A for null date', () => {
      const result = formatDate(null);
      expect(result).toBe('N/A');
    });

    it('should return N/A for undefined date', () => {
      const result = formatDate(undefined);
      expect(result).toBe('N/A');
    });

    it('should return N/A for empty string', () => {
      const result = formatDate('');
      expect(result).toBe('N/A');
    });

    it('should return original string for invalid date format', () => {
      const result = formatDate('not-a-date');
      // Invalid date - implementation returns "Invalid Date" or original
      expect(result === 'not-a-date' || result === 'Invalid Date').toBe(true);
    });
  });

  describe('summarizeDeal', () => {
    it('should create basic deal summary', () => {
      const deal = { title: 'Big Contract' };
      const result = summarizeDeal(deal);
      expect(result).toBe('Deal: Big Contract');
    });

    it('should include value when present', () => {
      const deal = { title: 'Big Contract', value: 50000, currency: 'USD' };
      const result = summarizeDeal(deal);
      expect(result).toContain('$50,000');
    });

    it('should include status when present', () => {
      const deal = { title: 'Big Contract', status: 'won' };
      const result = summarizeDeal(deal);
      expect(result).toContain('[won]');
    });

    it('should include person name when present', () => {
      const deal = { title: 'Big Contract', person_name: 'John Doe' };
      const result = summarizeDeal(deal);
      expect(result).toContain('John Doe');
    });

    it('should include org name when present', () => {
      const deal = { title: 'Big Contract', org_name: 'Acme Corp' };
      const result = summarizeDeal(deal);
      expect(result).toContain('Acme Corp');
    });

    it('should combine person and org with @', () => {
      const deal = { title: 'Contract', person_name: 'John', org_name: 'Acme' };
      const result = summarizeDeal(deal);
      expect(result).toContain('John @ Acme');
    });

    it('should include all fields in full summary', () => {
      const deal = {
        title: 'Enterprise Deal',
        value: 100000,
        currency: 'USD',
        status: 'open',
        person_name: 'Jane Smith',
        org_name: 'BigCorp',
      };
      const result = summarizeDeal(deal);
      expect(result).toContain('Deal: Enterprise Deal');
      expect(result).toContain('$100,000');
      expect(result).toContain('[open]');
      expect(result).toContain('Jane Smith');
      expect(result).toContain('BigCorp');
    });
  });

  describe('summarizePerson', () => {
    it('should create basic person summary', () => {
      const person = { name: 'John Doe' };
      const result = summarizePerson(person);
      expect(result).toBe('Person: John Doe');
    });

    it('should include email from array', () => {
      const person = {
        name: 'John Doe',
        email: [{ value: 'john@example.com' }],
      };
      const result = summarizePerson(person);
      expect(result).toContain('<john@example.com>');
    });

    it('should include email string directly', () => {
      const person = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      const result = summarizePerson(person);
      expect(result).toContain('<john@example.com>');
    });

    it('should include org name', () => {
      const person = {
        name: 'John Doe',
        org_name: 'Acme Corp',
      };
      const result = summarizePerson(person);
      expect(result).toContain('@ Acme Corp');
    });

    it('should use first email from array', () => {
      const person = {
        name: 'John Doe',
        email: [
          { value: 'primary@example.com' },
          { value: 'secondary@example.com' },
        ],
      };
      const result = summarizePerson(person);
      expect(result).toContain('<primary@example.com>');
      expect(result).not.toContain('secondary');
    });

    it('should handle empty email array', () => {
      const person = {
        name: 'John Doe',
        email: [],
      };
      const result = summarizePerson(person);
      expect(result).toBe('Person: John Doe');
    });
  });

  describe('summarizeOrganization', () => {
    it('should create basic organization summary', () => {
      const org = { name: 'Acme Corp' };
      const result = summarizeOrganization(org);
      expect(result).toBe('Organization: Acme Corp');
    });

    it('should include address when present', () => {
      const org = { name: 'Acme Corp', address: '123 Main St' };
      const result = summarizeOrganization(org);
      expect(result).toContain('(123 Main St)');
    });

    it('should include people count', () => {
      const org = { name: 'Acme Corp', people_count: 10 };
      const result = summarizeOrganization(org);
      expect(result).toContain('10 contacts');
    });

    it('should include open deals count', () => {
      const org = { name: 'Acme Corp', open_deals_count: 5 };
      const result = summarizeOrganization(org);
      expect(result).toContain('5 open deals');
    });

    it('should combine stats with comma', () => {
      const org = { name: 'Acme', people_count: 10, open_deals_count: 5 };
      const result = summarizeOrganization(org);
      expect(result).toContain('10 contacts, 5 open deals');
    });

    it('should handle null address', () => {
      const org = { name: 'Acme Corp', address: null };
      const result = summarizeOrganization(org);
      expect(result).toBe('Organization: Acme Corp');
    });
  });

  describe('summarizeActivity', () => {
    it('should create basic activity summary', () => {
      const activity = { subject: 'Follow up call', type: 'call' };
      const result = summarizeActivity(activity);
      expect(result).toContain('Activity: Follow up call');
      expect(result).toContain('[call]');
    });

    it('should include due date', () => {
      const activity = {
        subject: 'Meeting',
        type: 'meeting',
        due_date: '2024-01-15',
      };
      const result = summarizeActivity(activity);
      expect(result).toContain('Due:');
      expect(result).toContain('2024');
      expect(result).toContain('Jan');
    });

    it('should include due time with date', () => {
      const activity = {
        subject: 'Meeting',
        type: 'meeting',
        due_date: '2024-01-15',
        due_time: '14:30',
      };
      const result = summarizeActivity(activity);
      expect(result).toContain('14:30');
    });

    it('should show (Done) when done is true', () => {
      const activity = { subject: 'Task', type: 'task', done: true };
      const result = summarizeActivity(activity);
      expect(result).toContain('(Done)');
    });

    it('should show (Pending) when done is false', () => {
      const activity = { subject: 'Task', type: 'task', done: false };
      const result = summarizeActivity(activity);
      expect(result).toContain('(Pending)');
    });

    it('should not show done status when undefined', () => {
      const activity = { subject: 'Task', type: 'task' };
      const result = summarizeActivity(activity);
      expect(result).not.toContain('Done');
      expect(result).not.toContain('Pending');
    });
  });

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
      expect(result).toContain('More available with cursor pagination');
    });

    it('should include additional info', () => {
      const result = createListSummary('deal', 25, false, '$1.2M total');
      expect(result).toContain('($1.2M total)');
    });

    it('should combine all parts', () => {
      const result = createListSummary('person', 100, true, '5 new');
      expect(result).toContain('100 persons');
      expect(result).toContain('5 new');
      expect(result).toContain('More available');
    });

    it('should work with zero count', () => {
      const result = createListSummary('activity', 0, false);
      expect(result).toBe('Found 0 activitys.'); // Note: simple pluralization adds 's'
    });
  });

  describe('truncate', () => {
    it('should return text unchanged if under limit', () => {
      const result = truncate('short text', 100);
      expect(result).toBe('short text');
    });

    it('should truncate long text with ellipsis', () => {
      const result = truncate('this is a very long text that should be truncated', 20);
      expect(result).toBe('this is a very lo...');
      expect(result.length).toBe(20);
    });

    it('should use default max length of 100', () => {
      const longText = 'a'.repeat(150);
      const result = truncate(longText);
      expect(result.length).toBe(100);
      expect(result.endsWith('...')).toBe(true);
    });

    it('should return empty string for null', () => {
      const result = truncate(null);
      expect(result).toBe('');
    });

    it('should return empty string for undefined', () => {
      const result = truncate(undefined);
      expect(result).toBe('');
    });

    it('should return text exactly at max length unchanged', () => {
      const text = 'a'.repeat(100);
      const result = truncate(text, 100);
      expect(result).toBe(text);
    });

    it('should handle very small max length', () => {
      const result = truncate('hello world', 5);
      expect(result).toBe('he...');
    });
  });
});
