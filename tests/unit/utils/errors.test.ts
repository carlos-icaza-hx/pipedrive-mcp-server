/**
 * Tests for utils/errors.ts
 */

import { describe, it, expect } from 'vitest';
import {
  createErrorResponse,
  handleApiError,
  formatErrorForMcp,
  getErrorResponse,
  destructiveOperationGuard,
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
        'DESTRUCTIVE_DISABLED',
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

  describe('getErrorResponse', () => {
    it('should return response error when present', () => {
      const error: ErrorResponse = {
        error: { code: 'NOT_FOUND', message: 'Not found' },
      };
      const result = getErrorResponse({ error });

      expect(result).toBe(error);
    });

    it('should return default error when response error is undefined', () => {
      const result = getErrorResponse({});

      expect(result.error.code).toBe('API_ERROR');
      expect(result.error.message).toBe('Unknown API error');
      expect(result.error.suggestion).toContain('API key');
    });

    it('should return default error when response error is null-ish', () => {
      const result = getErrorResponse({ error: undefined });

      expect(result.error.code).toBe('API_ERROR');
    });
  });

  describe('destructiveOperationGuard', () => {
    const originalEnv = process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE;

    afterEach(() => {
      if (originalEnv === undefined) {
        delete process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE;
      } else {
        process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE = originalEnv;
      }
    });

    it('should return null when PIPEDRIVE_ENABLE_DESTRUCTIVE is true', () => {
      process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE = 'true';
      expect(destructiveOperationGuard()).toBeNull();
    });

    it('should return MCP error response when env var is unset', () => {
      delete process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE;
      const result = destructiveOperationGuard();

      expect(result).not.toBeNull();
      expect(result!.isError).toBe(true);
      expect(result!.content[0].type).toBe('text');
      expect(result!.content[0].text).toContain('DESTRUCTIVE_DISABLED');
    });

    it('should return MCP error response when env var is false', () => {
      process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE = 'false';
      const result = destructiveOperationGuard();

      expect(result).not.toBeNull();
      expect(result!.isError).toBe(true);
    });

    it('should treat TRUE (uppercase) as disabled', () => {
      process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE = 'TRUE';
      const result = destructiveOperationGuard();

      expect(result).not.toBeNull();
      expect(result!.isError).toBe(true);
    });

    it('should treat 1 as disabled', () => {
      process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE = '1';
      const result = destructiveOperationGuard();

      expect(result).not.toBeNull();
      expect(result!.isError).toBe(true);
    });

    it('should treat yes as disabled', () => {
      process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE = 'yes';
      const result = destructiveOperationGuard();

      expect(result).not.toBeNull();
      expect(result!.isError).toBe(true);
    });

    it('should include suggestion in error response', () => {
      delete process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE;
      const result = destructiveOperationGuard();

      expect(result!.content[0].text).toContain('PIPEDRIVE_ENABLE_DESTRUCTIVE=true');
    });
  });
});
