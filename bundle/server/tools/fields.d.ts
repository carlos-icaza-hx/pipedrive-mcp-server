/**
 * Field metadata MCP tools for Pipedrive (v1 API)
 * These tools help discover custom field definitions and map hash keys to human-readable names.
 */
import { type ListOrganizationFieldsParams, type ListDealFieldsParams, type ListPersonFieldsParams, type GetFieldParams } from "../schemas/fields.js";
/**
 * List organization fields
 */
export declare function listOrganizationFields(params: ListOrganizationFieldsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * List deal fields
 */
export declare function listDealFields(params: ListDealFieldsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * List person fields
 */
export declare function listPersonFields(params: ListPersonFieldsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single field by key
 */
export declare function getField(params: GetFieldParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const fieldTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            entity_type?: undefined;
            key?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listOrganizationFields;
    schema: import("zod").ZodObject<{
        start: import("zod").ZodOptional<import("zod").ZodNumber>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        start?: number | undefined;
    }, {
        limit?: number | undefined;
        start?: number | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            entity_type: {
                type: string;
                enum: string[];
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
        };
        required: string[];
    };
    handler: typeof getField;
    schema: import("zod").ZodObject<{
        entity_type: import("zod").ZodEnum<["organization", "deal", "person", "product", "activity", "project"]>;
        key: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
        key: string;
    }, {
        entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
        key: string;
    }>;
})[];
//# sourceMappingURL=fields.d.ts.map