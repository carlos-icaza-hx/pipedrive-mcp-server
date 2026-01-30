/**
 * Tests for utils/errors.ts
 */

import { describe, it, expect } from 'vitest';
import {
  createErrorResponse,
  handleApiError,
  formatErrorForMcp,
  type ErrorResponse,
} from '../../../src/utils/errors.js';

describe('errors', () => {
  describe('createErrorResponse', () => {
    it('should create error response with code and message', () => {
      const result = createErrorResponse('NOT_FOUND', 'Resource not found');

      expect(result).toEqual({
        error: {
          code: 'NOT_FOUND',
          message: 'Resource not found',
          suggestion: undefined,
        },
      });
    });

    it('should create error response with suggestion', () => {
      const result = createErrorResponse(
        'RATE_LIMITED',
        'Too many requests',
        'Wait 60 seconds'
      );

      expect(result).toEqual({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests',
          suggestion: 'Wait 60 seconds',
        },
      });
    });

    it('should create error response for all error codes', () => {
      const codes = [
        'MISSING_API_KEY',
        'INVALID_API_KEY',
        'VALIDATION_ERROR',
        'NOT_FOUND',
        'RATE_LIMITED',
        'PERMISSION_DENIED',
        'API_ERROR',
        'NETWORK_ERROR',
      ] as const;

      codes.forEach((code) => {
        const result = createErrorResponse(code, 'Test message');
        expect(result.error.code).toBe(code);
      });
    });
  });

  describe('handleApiError', () => {
    it('should handle 400 Bad Request', () => {
      const result = handleApiError(400, { error: 'Invalid parameter' });

      expect(result.error.code).toBe('VALIDATION_ERROR');
      expect(result.error.message).toContain('Invalid parameter');
      expect(result.error.suggestion).toContain('Check your request parameters');
    });

    it('should handle 401 Unauthorized', () => {
      const result = handleApiError(401, { error: 'Invalid API key' });

      expect(result.error.code).toBe('INVALID_API_KEY');
      expect(result.error.message).toContain('invalid or expired');
      expect(result.error.suggestion).toContain('Verify your API key');
    });

    it('should handle 403 Forbidden', () => {
      const result = handleApiError(403, { error: 'Access denied' });

      expect(result.error.code).toBe('PERMISSION_DENIED');
      expect(result.error.message).toContain('Access denied');
      expect(result.error.suggestion).toContain('permissions');
    });

    it('should handle 404 Not Found', () => {
      const result = handleApiError(404, { error: 'Deal not found' });

      expect(result.error.code).toBe('NOT_FOUND');
      expect(result.error.message).toContain('not found');
      expect(result.error.suggestion).toContain('Verify the ID');
    });

    it('should handle 429 Too Many Requests', () => {
      const result = handleApiError(429, { error: 'Rate limit exceeded' });

      expect(result.error.code).toBe('RATE_LIMITED');
      expect(result.error.message).toContain('Rate limit');
      expect(result.error.suggestion).toContain('Wait 60 seconds');
    });

    it('should handle unknown status codes as API_ERROR', () => {
      const result = handleApiError(500, { error: 'Internal server error' });

      expect(result.error.code).toBe('API_ERROR');
      expect(result.error.message).toContain('500');
      expect(result.error.message).toContain('Internal server error');
    });

    it('should handle body without error field', () => {
      const result = handleApiError(400, { message: 'Something went wrong' });

      expect(result.error.code).toBe('VALIDATION_ERROR');
      expect(result.error.message).toContain('Unknown error');
    });

    it('should handle null body', () => {
      const result = handleApiError(500, null);

      expect(result.error.code).toBe('API_ERROR');
      expect(result.error.message).toContain('Unknown error');
    });

    it('should handle string body', () => {
      const result = handleApiError(400, 'Error string');

      expect(result.error.code).toBe('VALIDATION_ERROR');
      expect(result.error.message).toContain('Unknown error');
    });
  });

  describe('formatErrorForMcp', () => {
    it('should format error without suggestion', () => {
      const error: ErrorResponse = {
        error: {
          code: 'NOT_FOUND',
          message: 'Resource not found',
        },
      };

      const result = formatErrorForMcp(error);

      expect(result).toBe('Error [NOT_FOUND]: Resource not found');
    });

    it('should format error with suggestion', () => {
      const error: ErrorResponse = {
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests',
          suggestion: 'Wait 60 seconds',
        },
      };

      const result = formatErrorForMcp(error);

      expect(result).toBe(
        'Error [RATE_LIMITED]: Too many requests\nSuggestion: Wait 60 seconds'
      );
    });

    it('should handle empty suggestion', () => {
      const error: ErrorResponse = {
        error: {
          code: 'API_ERROR',
          message: 'Server error',
          suggestion: '',
        },
      };

      const result = formatErrorForMcp(error);

      // Empty string is falsy, so no suggestion line
      expect(result).toBe('Error [API_ERROR]: Server error');
    });
  });
});
