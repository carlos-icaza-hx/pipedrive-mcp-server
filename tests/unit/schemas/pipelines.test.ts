/**
 * Tests for schemas/pipelines.ts
 */

import { describe, it, expect } from 'vitest';
import {
  ListPipelinesSchema,
  ListStagesSchema,
  GetStageSchema,
} from '../../../src/schemas/pipelines.js';

describe('pipelines schemas', () => {
  describe('ListPipelinesSchema', () => {
    it('should accept empty object', () => {
      const result = ListPipelinesSchema.parse({});
      expect(result).toEqual({});
    });

    it('should ignore unknown properties', () => {
      // Zod strips unknown properties by default
      const result = ListPipelinesSchema.parse({ unknown: 'value' });
      expect(result).toEqual({});
    });
  });

  describe('ListStagesSchema', () => {
    it('should accept empty object', () => {
      const result = ListStagesSchema.parse({});
      expect(result.pipeline_id).toBeUndefined();
    });

    it('should accept pipeline_id', () => {
      const result = ListStagesSchema.parse({ pipeline_id: 1 });
      expect(result.pipeline_id).toBe(1);
    });

    it('should reject non-positive pipeline_id', () => {
      expect(() => ListStagesSchema.parse({ pipeline_id: 0 })).toThrow();
      expect(() => ListStagesSchema.parse({ pipeline_id: -1 })).toThrow();
    });

    it('should reject non-integer pipeline_id', () => {
      expect(() => ListStagesSchema.parse({ pipeline_id: 1.5 })).toThrow();
    });
  });

  describe('GetStageSchema', () => {
    it('should require id', () => {
      expect(() => GetStageSchema.parse({})).toThrow();
    });

    it('should accept valid id', () => {
      const result = GetStageSchema.parse({ id: 5 });
      expect(result.id).toBe(5);
    });

    it('should reject non-positive id', () => {
      expect(() => GetStageSchema.parse({ id: 0 })).toThrow();
    });

    it('should reject non-integer id', () => {
      expect(() => GetStageSchema.parse({ id: 2.5 })).toThrow();
    });
  });
});
