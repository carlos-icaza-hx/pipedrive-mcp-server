/**
 * Tests for schemas/mail.ts
 */

import { describe, it, expect } from 'vitest';
import {
  MailFolderSchema,
  GetPersonEmailsSchema,
  GetDealEmailsSchema,
  ListMailThreadsSchema,
  GetMailThreadSchema,
  GetMailMessageSchema,
} from '../../../src/schemas/mail.js';

describe('mail schemas', () => {
  describe('MailFolderSchema', () => {
    it('should accept valid folder values', () => {
      const folders = ['inbox', 'drafts', 'sent', 'archive'];
      folders.forEach((folder) => {
        const result = MailFolderSchema.parse(folder);
        expect(result).toBe(folder);
      });
    });

    it('should reject invalid folder value', () => {
      expect(() => MailFolderSchema.parse('spam')).toThrow();
      expect(() => MailFolderSchema.parse('trash')).toThrow();
    });
  });

  describe('GetPersonEmailsSchema', () => {
    it('should require id', () => {
      expect(() => GetPersonEmailsSchema.parse({})).toThrow();
    });

    it('should accept valid id with pagination', () => {
      const result = GetPersonEmailsSchema.parse({
        id: 123,
        start: 0,
        limit: 100,
      });
      expect(result.id).toBe(123);
      expect(result.start).toBe(0);
      expect(result.limit).toBe(100);
    });

    it('should use default limit', () => {
      const result = GetPersonEmailsSchema.parse({ id: 1 });
      expect(result.limit).toBe(50);
    });

    it('should accept limit up to 500 (v1 API)', () => {
      const result = GetPersonEmailsSchema.parse({ id: 1, limit: 500 });
      expect(result.limit).toBe(500);
    });

    it('should reject limit over 500', () => {
      expect(() => GetPersonEmailsSchema.parse({ id: 1, limit: 501 })).toThrow();
    });
  });

  describe('GetDealEmailsSchema', () => {
    it('should require id', () => {
      expect(() => GetDealEmailsSchema.parse({})).toThrow();
    });

    it('should accept valid id with pagination', () => {
      const result = GetDealEmailsSchema.parse({
        id: 456,
        start: 50,
        limit: 200,
      });
      expect(result.id).toBe(456);
      expect(result.start).toBe(50);
    });
  });

  describe('ListMailThreadsSchema', () => {
    it('should accept minimal params', () => {
      const result = ListMailThreadsSchema.parse({});
      expect(result.folder).toBe('inbox');
      expect(result.limit).toBe(50);
    });

    it('should accept folder parameter', () => {
      const result = ListMailThreadsSchema.parse({ folder: 'sent' });
      expect(result.folder).toBe('sent');
    });

    it('should accept pagination params', () => {
      const result = ListMailThreadsSchema.parse({
        folder: 'archive',
        start: 100,
        limit: 25,
      });
      expect(result.folder).toBe('archive');
      expect(result.start).toBe(100);
      expect(result.limit).toBe(25);
    });

    it('should reject invalid folder', () => {
      expect(() => ListMailThreadsSchema.parse({ folder: 'junk' })).toThrow();
    });
  });

  describe('GetMailThreadSchema', () => {
    it('should require id', () => {
      expect(() => GetMailThreadSchema.parse({})).toThrow();
    });

    it('should accept valid id', () => {
      const result = GetMailThreadSchema.parse({ id: 789 });
      expect(result.id).toBe(789);
    });

    it('should reject non-positive id', () => {
      expect(() => GetMailThreadSchema.parse({ id: 0 })).toThrow();
      expect(() => GetMailThreadSchema.parse({ id: -1 })).toThrow();
    });
  });

  describe('GetMailMessageSchema', () => {
    it('should require id', () => {
      expect(() => GetMailMessageSchema.parse({})).toThrow();
    });

    it('should accept valid id with default include_body', () => {
      const result = GetMailMessageSchema.parse({ id: 123 });
      expect(result.id).toBe(123);
      expect(result.include_body).toBe(false);
    });

    it('should accept include_body parameter', () => {
      const result = GetMailMessageSchema.parse({
        id: 123,
        include_body: true,
      });
      expect(result.include_body).toBe(true);
    });

    it('should accept include_body as false', () => {
      const result = GetMailMessageSchema.parse({
        id: 123,
        include_body: false,
      });
      expect(result.include_body).toBe(false);
    });
  });
});
