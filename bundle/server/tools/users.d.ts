/**
 * User MCP tools for Pipedrive
 */
import { type ListUsersParams, type GetUserParams, type GetCurrentUserParams } from "../schemas/users.js";
/**
 * List all users
 */
export declare function listUsers(_params: ListUsersParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single user by ID
 */
export declare function getUser(params: GetUserParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get the current user (API key owner)
 */
export declare function getCurrentUser(_params: GetCurrentUserParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const userTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listUsers;
    schema: import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    handler: typeof getUser;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
})[];
//# sourceMappingURL=users.d.ts.map