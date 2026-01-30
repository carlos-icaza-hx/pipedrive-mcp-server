# Contributing to Pipedrive MCP Server

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/pipedrive-mcp-server.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`

## Development Setup

1. Copy `.env.example` to `.env` and add your Pipedrive API key
2. Run in development mode: `npm run dev`
3. Build: `npm run build`
4. Test with MCP Inspector: `npx @modelcontextprotocol/inspector node dist/index.js`

## Code Style

- Use TypeScript with strict mode
- Follow existing patterns in the codebase
- Use Zod for schema validation
- Log to stderr (not stdout) to avoid STDIO protocol corruption
- Include JSDoc comments for public functions

## Adding New Tools

1. Create schema in `src/schemas/` following existing patterns
2. Implement handler in `src/tools/` following existing patterns
3. Register tool in `src/tools/index.ts`
4. Add documentation to README.md

### Tool Structure

```typescript
export const myTools = [
  {
    name: "pipedrive_my_tool",
    description: "Clear description of what the tool does",
    inputSchema: {
      type: "object",
      properties: {
        // Define parameters
      },
      required: ["required_param"],
    },
    handler: myToolHandler,
    schema: MyToolSchema,
  },
];
```

## Testing

- Test tools using MCP Inspector before submitting
- Verify error handling with missing/invalid API keys
- Test pagination for list endpoints
- Test with real Pipedrive data when possible

## Submitting Changes

1. Ensure code builds without errors: `npm run build`
2. Update documentation if adding/changing features
3. Commit with clear, descriptive messages
4. Push to your fork
5. Create a Pull Request with:
   - Clear description of changes
   - Any related issues
   - Screenshots/examples if relevant

## Reporting Issues

When reporting issues, please include:

- Node.js version
- npm version
- Error messages (from stderr)
- Steps to reproduce
- Expected vs actual behavior

## Questions?

Open an issue for questions or join the discussion in existing issues.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
