/**
 * Tests for schemas/notes.ts
 */

import { describe, it, expect } from 'vitest';
import {
  ListNotesSchema,
  GetNoteSchema,
  CreateNoteSchema,
  UpdateNoteSchema,
  DeleteNoteSchema,
} from '../../../src/schemas/notes.js';

describe('notes schemas', () => {
  describe('ListNotesSchema', () => {
    it('should accept minimal params', () => {
      const result = ListNotesSchema.parse({});
      expect(result.limit).toBe(50);
    });

    it('should accept all filter parameters', () => {
      const params = {
        start: 0,
        limit: 100,
        deal_id: 1,
        person_id: 2,
        org_id: 3,
        lead_id: 'abc-123-def',
        pinned_to_deal_flag: true,
        pinned_to_person_flag: false,
        pinned_to_organization_flag: true,
        sort: 'add_time',
        sort_direction: 'asc',
      };

      const result = ListNotesSchema.parse(params);
      expect(result.deal_id).toBe(1);
      expect(result.person_id).toBe(2);
      expect(result.org_id).toBe(3);
      expect(result.lead_id).toBe('abc-123-def');
      expect(result.pinned_to_deal_flag).toBe(true);
      expect(result.sort).toBe('add_time');
      expect(result.sort_direction).toBe('asc');
    });

    it('should accept all valid sort values', () => {
      const sortFields = ['id', 'add_time', 'update_time'];
      sortFields.forEach((sort) => {
        const result = ListNotesSchema.parse({ sort });
        expect(result.sort).toBe(sort);
      });
    });

    it('should reject invalid sort value', () => {
      expect(() => ListNotesSchema.parse({ sort: 'invalid' })).toThrow();
    });

    it('should accept v1 pagination parameters', () => {
      const result = ListNotesSchema.parse({
        start: 50,
        limit: 100,
      });
      expect(result.start).toBe(50);
      expect(result.limit).toBe(100);
    });
  });

  describe('GetNoteSchema', () => {
    it('should require id', () => {
      expect(() => GetNoteSchema.parse({})).toThrow();
    });

    it('should accept valid id', () => {
      const result = GetNoteSchema.parse({ id: 123 });
      expect(result.id).toBe(123);
    });

    it('should reject non-positive id', () => {
      expect(() => GetNoteSchema.parse({ id: 0 })).toThrow();
      expect(() => GetNoteSchema.parse({ id: -1 })).toThrow();
    });
  });

  describe('CreateNoteSchema', () => {
    it('should require content', () => {
      expect(() => CreateNoteSchema.parse({})).toThrow();
    });

    it('should accept minimal required params', () => {
      const result = CreateNoteSchema.parse({
        content: 'This is a note',
      });
      expect(result.content).toBe('This is a note');
    });

    it('should reject empty content', () => {
      expect(() => CreateNoteSchema.parse({
        content: '',
      })).toThrow();
    });

    it('should accept all optional fields', () => {
      const params = {
        content: '<p>HTML note content</p>',
        deal_id: 1,
        person_id: 2,
        org_id: 3,
        lead_id: 'lead-uuid-123',
        pinned_to_deal_flag: true,
        pinned_to_person_flag: false,
        pinned_to_organization_flag: true,
      };

      const result = CreateNoteSchema.parse(params);
      expect(result.content).toBe('<p>HTML note content</p>');
      expect(result.deal_id).toBe(1);
      expect(result.person_id).toBe(2);
      expect(result.org_id).toBe(3);
      expect(result.lead_id).toBe('lead-uuid-123');
      expect(result.pinned_to_deal_flag).toBe(true);
      expect(result.pinned_to_person_flag).toBe(false);
      expect(result.pinned_to_organization_flag).toBe(true);
    });

    it('should accept HTML content', () => {
      const htmlContent = '<h1>Meeting Notes</h1><ul><li>Point 1</li><li>Point 2</li></ul>';
      const result = CreateNoteSchema.parse({
        content: htmlContent,
      });
      expect(result.content).toBe(htmlContent);
    });

    it('should reject negative IDs', () => {
      expect(() => CreateNoteSchema.parse({
        content: 'Test',
        deal_id: -1,
      })).toThrow();
    });
  });

  describe('UpdateNoteSchema', () => {
    it('should require id', () => {
      expect(() => UpdateNoteSchema.parse({})).toThrow();
    });

    it('should accept id with no updates', () => {
      const result = UpdateNoteSchema.parse({ id: 123 });
      expect(result.id).toBe(123);
    });

    it('should accept all updatable fields', () => {
      const params = {
        id: 123,
        content: 'Updated note content',
        deal_id: 10,
        person_id: 20,
        org_id: 30,
        lead_id: 'new-lead-id',
        pinned_to_deal_flag: true,
        pinned_to_person_flag: true,
        pinned_to_organization_flag: false,
      };

      const result = UpdateNoteSchema.parse(params);
      expect(result.id).toBe(123);
      expect(result.content).toBe('Updated note content');
      expect(result.deal_id).toBe(10);
      expect(result.pinned_to_deal_flag).toBe(true);
    });

    it('should reject empty content on update', () => {
      expect(() => UpdateNoteSchema.parse({
        id: 123,
        content: '',
      })).toThrow();
    });

    it('should allow updating just pin flags', () => {
      const result = UpdateNoteSchema.parse({
        id: 123,
        pinned_to_deal_flag: true,
      });
      expect(result.pinned_to_deal_flag).toBe(true);
    });
  });

  describe('DeleteNoteSchema', () => {
    it('should require id', () => {
      expect(() => DeleteNoteSchema.parse({})).toThrow();
    });

    it('should accept valid id', () => {
      const result = DeleteNoteSchema.parse({ id: 789 });
      expect(result.id).toBe(789);
    });

    it('should reject non-positive id', () => {
      expect(() => DeleteNoteSchema.parse({ id: 0 })).toThrow();
    });
  });
});
