/**
 * Tests for schemas/users.ts
 */

import { describe, it, expect } from 'vitest';
import {
  ListUsersSchema,
  GetUserSchema,
  GetCurrentUserSchema,
} from '../../../src/schemas/users.js';

describe('users schemas', () => {
  describe('ListUsersSchema', () => {
    it('should accept empty object', () => {
      const result = ListUsersSchema.parse({});
      expect(result).toEqual({});
    });
  });

  describe('GetUserSchema', () => {
    it('should require id', () => {
      expect(() => GetUserSchema.parse({})).toThrow();
    });

    it('should accept valid id', () => {
      const result = GetUserSchema.parse({ id: 123 });
      expect(result.id).toBe(123);
    });

    it('should reject non-positive id', () => {
      expect(() => GetUserSchema.parse({ id: 0 })).toThrow();
      expect(() => GetUserSchema.parse({ id: -5 })).toThrow();
    });

    it('should reject non-integer id', () => {
      expect(() => GetUserSchema.parse({ id: 1.5 })).toThrow();
    });

    it('should reject string id', () => {
      expect(() => GetUserSchema.parse({ id: '123' })).toThrow();
    });
  });

  describe('GetCurrentUserSchema', () => {
    it('should accept empty object', () => {
      const result = GetCurrentUserSchema.parse({});
      expect(result).toEqual({});
    });
  });
});
