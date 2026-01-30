/**
 * Tests for schemas/fields.ts
 */

import { describe, it, expect } from 'vitest';
import {
  FieldEntityTypeSchema,
  ListOrganizationFieldsSchema,
  ListDealFieldsSchema,
  ListPersonFieldsSchema,
  GetFieldSchema,
} from '../../../src/schemas/fields.js';

describe('fields schemas', () => {
  describe('FieldEntityTypeSchema', () => {
    it('should accept all valid entity types', () => {
      const types = ['organization', 'deal', 'person', 'product', 'activity', 'project'];
      types.forEach((type) => {
        const result = FieldEntityTypeSchema.parse(type);
        expect(result).toBe(type);
      });
    });

    it('should reject invalid entity type', () => {
      expect(() => FieldEntityTypeSchema.parse('user')).toThrow();
      expect(() => FieldEntityTypeSchema.parse('lead')).toThrow();
    });
  });

  describe('ListOrganizationFieldsSchema', () => {
    it('should accept minimal params', () => {
      const result = ListOrganizationFieldsSchema.parse({});
      expect(result.limit).toBe(50);
    });

    it('should accept pagination params', () => {
      const result = ListOrganizationFieldsSchema.parse({
        start: 50,
        limit: 100,
      });
      expect(result.start).toBe(50);
      expect(result.limit).toBe(100);
    });

    it('should accept limit up to 500 (v1 API)', () => {
      const result = ListOrganizationFieldsSchema.parse({ limit: 500 });
      expect(result.limit).toBe(500);
    });
  });

  describe('ListDealFieldsSchema', () => {
    it('should accept minimal params', () => {
      const result = ListDealFieldsSchema.parse({});
      expect(result.limit).toBe(50);
    });

    it('should accept pagination params', () => {
      const result = ListDealFieldsSchema.parse({
        start: 0,
        limit: 250,
      });
      expect(result.start).toBe(0);
      expect(result.limit).toBe(250);
    });
  });

  describe('ListPersonFieldsSchema', () => {
    it('should accept minimal params', () => {
      const result = ListPersonFieldsSchema.parse({});
      expect(result.limit).toBe(50);
    });

    it('should accept pagination params', () => {
      const result = ListPersonFieldsSchema.parse({
        start: 100,
        limit: 50,
      });
      expect(result.start).toBe(100);
    });
  });

  describe('GetFieldSchema', () => {
    it('should require entity_type and key', () => {
      expect(() => GetFieldSchema.parse({})).toThrow();
      expect(() => GetFieldSchema.parse({ entity_type: 'deal' })).toThrow();
      expect(() => GetFieldSchema.parse({ key: 'abc123' })).toThrow();
    });

    it('should accept valid params', () => {
      const result = GetFieldSchema.parse({
        entity_type: 'deal',
        key: 'abc123def456',
      });
      expect(result.entity_type).toBe('deal');
      expect(result.key).toBe('abc123def456');
    });

    it('should accept all valid entity types', () => {
      const types = ['organization', 'deal', 'person', 'product', 'activity', 'project'];
      types.forEach((entity_type) => {
        const result = GetFieldSchema.parse({ entity_type, key: 'field_key' });
        expect(result.entity_type).toBe(entity_type);
      });
    });

    it('should accept standard field names as key', () => {
      const standardFields = ['name', 'title', 'value', 'status', 'owner_id'];
      standardFields.forEach((key) => {
        const result = GetFieldSchema.parse({ entity_type: 'deal', key });
        expect(result.key).toBe(key);
      });
    });

    it('should accept 40-character hash as custom field key', () => {
      const customFieldKey = 'a'.repeat(40);
      const result = GetFieldSchema.parse({
        entity_type: 'person',
        key: customFieldKey,
      });
      expect(result.key).toBe(customFieldKey);
    });

    it('should reject invalid entity type', () => {
      expect(() => GetFieldSchema.parse({
        entity_type: 'invalid',
        key: 'field_key',
      })).toThrow();
    });
  });
});
