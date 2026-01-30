import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/index.ts', // Main entry point is hard to unit test
        'src/tools/index.ts', // Just re-exports tool definitions
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 65, // Lower threshold due to extensive defensive error handling branches
        statements: 80,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
