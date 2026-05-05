/**
 * Organization-related MCP tools for Pipedrive
 */
import { type ListOrganizationsParams, type GetOrganizationParams, type CreateOrganizationParams, type UpdateOrganizationParams, type SearchOrganizationsParams, type DeleteOrganizationParams } from "../schemas/organizations.js";
/**
 * List organizations with optional filtering
 */
export declare function listOrganizations(params: ListOrganizationsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single organization by ID
 */
export declare function getOrganization(params: GetOrganizationParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Create a new organization
 */
export declare function createOrganization(params: CreateOrganizationParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Update an existing organization
 */
export declare function updateOrganization(params: UpdateOrganizationParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Search organizations by name
 */
export declare function searchOrganizations(params: SearchOrganizationsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Delete an organization
 */
export declare function deleteOrganization(params: DeleteOrganizationParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const organizationTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            cursor: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            filter_id: {
                type: string;
                description: string;
            };
            ids: {
                type: string;
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            first_char: {
                type: string;
                description: string;
            };
            updated_since: {
                type: string;
                description: string;
            };
            updated_until: {
                type: string;
                description: string;
            };
            sort_by: {
                type: string;
                enum: string[];
                description: string;
            };
            sort_direction: {
                type: string;
                enum: string[];
                description: string;
            };
            include_fields: {
                type: string;
                description: string;
            };
            custom_fields: {
                type: string;
                description: string;
            };
            id?: undefined;
            name?: undefined;
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listOrganizations;
    schema: import("zod").ZodObject<{
        cursor: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        filter_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        ids: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        first_char: import("zod").ZodOptional<import("zod").ZodString>;
        updated_since: import("zod").ZodOptional<import("zod").ZodString>;
        updated_until: import("zod").ZodOptional<import("zod").ZodString>;
        sort_by: import("zod").ZodOptional<import("zod").ZodEnum<["id", "update_time", "add_time"]>>;
        sort_direction: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["asc", "desc"]>>>;
        include_fields: import("zod").ZodOptional<import("zod").ZodString>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        sort_direction: "asc" | "desc";
        cursor?: string | undefined;
        filter_id?: number | undefined;
        ids?: string | undefined;
        owner_id?: number | undefined;
        updated_since?: string | undefined;
        updated_until?: string | undefined;
        sort_by?: "id" | "update_time" | "add_time" | undefined;
        include_fields?: string | undefined;
        custom_fields?: string | undefined;
        first_char?: string | undefined;
    }, {
        cursor?: string | undefined;
        limit?: number | undefined;
        filter_id?: number | undefined;
        ids?: string | undefined;
        owner_id?: number | undefined;
        updated_since?: string | undefined;
        updated_until?: string | undefined;
        sort_by?: "id" | "update_time" | "add_time" | undefined;
        sort_direction?: "asc" | "desc" | undefined;
        include_fields?: string | undefined;
        custom_fields?: string | undefined;
        first_char?: string | undefined;
    }>;
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
            include_fields: {
                type: string;
                description: string;
            };
            custom_fields: {
                type: string;
                description: string;
            };
            cursor?: undefined;
            limit?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            owner_id?: undefined;
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            name?: undefined;
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof getOrganization;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        include_fields: import("zod").ZodOptional<import("zod").ZodString>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        include_fields?: string | undefined;
        custom_fields?: string | undefined;
    }, {
        id: number;
        include_fields?: string | undefined;
        custom_fields?: string | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            label_ids: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            add_time: {
                type: string;
                description: string;
            };
            custom_fields: {
                type: string;
                description: string;
            };
            cursor?: undefined;
            limit?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            id?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof createOrganization;
    schema: import("zod").ZodObject<{
        name: import("zod").ZodString;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        visible_to: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodNumber, number, number>>;
        address: import("zod").ZodOptional<import("zod").ZodString>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        add_time: import("zod").ZodOptional<import("zod").ZodString>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        owner_id?: number | undefined;
        add_time?: string | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        visible_to?: number | undefined;
        label_ids?: number[] | undefined;
        address?: string | undefined;
    }, {
        name: string;
        owner_id?: number | undefined;
        add_time?: string | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        visible_to?: number | undefined;
        label_ids?: number[] | undefined;
        address?: string | undefined;
    }>;
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
            name: {
                type: string;
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            label_ids: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            custom_fields: {
                type: string;
                description: string;
            };
            cursor?: undefined;
            limit?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof updateOrganization;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        name: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        visible_to: import("zod").ZodOptional<import("zod").ZodEnum<["1", "3", "5", "7"]>>;
        address: import("zod").ZodOptional<import("zod").ZodString>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        owner_id?: number | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        visible_to?: "1" | "3" | "5" | "7" | undefined;
        label_ids?: number[] | undefined;
        name?: string | undefined;
        address?: string | undefined;
    }, {
        id: number;
        owner_id?: number | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        visible_to?: "1" | "3" | "5" | "7" | undefined;
        label_ids?: number[] | undefined;
        name?: string | undefined;
        address?: string | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            term: {
                type: string;
                description: string;
            };
            exact_match: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            cursor?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            owner_id?: undefined;
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            custom_fields?: undefined;
            id?: undefined;
            name?: undefined;
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
        };
        required: string[];
    };
    handler: typeof searchOrganizations;
    schema: import("zod").ZodObject<{
        term: import("zod").ZodString;
        exact_match: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        term: string;
        exact_match: boolean;
    }, {
        term: string;
        limit?: number | undefined;
        exact_match?: boolean | undefined;
    }>;
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
            cursor?: undefined;
            limit?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            owner_id?: undefined;
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            custom_fields?: undefined;
            name?: undefined;
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof deleteOrganization;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
})[];
//# sourceMappingURL=organizations.d.ts.map