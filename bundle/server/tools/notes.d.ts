/**
 * Note-related MCP tools for Pipedrive
 */
import { type ListNotesParams, type GetNoteParams, type CreateNoteParams, type UpdateNoteParams, type DeleteNoteParams } from "../schemas/notes.js";
/**
 * List notes with optional filtering
 */
export declare function listNotes(params: ListNotesParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single note by ID
 */
export declare function getNote(params: GetNoteParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Create a new note
 */
export declare function createNote(params: CreateNoteParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Update an existing note
 */
export declare function updateNote(params: UpdateNoteParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Delete a note
 */
export declare function deleteNote(params: DeleteNoteParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const noteTools: ({
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
            deal_id: {
                type: string;
                description: string;
            };
            person_id: {
                type: string;
                description: string;
            };
            org_id: {
                type: string;
                description: string;
            };
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            sort: {
                type: string;
                enum: string[];
                description: string;
            };
            sort_direction: {
                type: string;
                enum: string[];
                description: string;
            };
            id?: undefined;
            content?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listNotes;
    schema: import("zod").ZodObject<{
        start: import("zod").ZodOptional<import("zod").ZodNumber>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        sort: import("zod").ZodOptional<import("zod").ZodEnum<["id", "add_time", "update_time"]>>;
        sort_direction: import("zod").ZodOptional<import("zod").ZodEnum<["asc", "desc"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        sort?: "id" | "update_time" | "add_time" | undefined;
        start?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        sort_direction?: "asc" | "desc" | undefined;
        deal_id?: number | undefined;
        lead_id?: string | undefined;
        pinned_to_deal_flag?: boolean | undefined;
        pinned_to_person_flag?: boolean | undefined;
        pinned_to_organization_flag?: boolean | undefined;
    }, {
        limit?: number | undefined;
        sort?: "id" | "update_time" | "add_time" | undefined;
        start?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        sort_direction?: "asc" | "desc" | undefined;
        deal_id?: number | undefined;
        lead_id?: string | undefined;
        pinned_to_deal_flag?: boolean | undefined;
        pinned_to_person_flag?: boolean | undefined;
        pinned_to_organization_flag?: boolean | undefined;
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
            start?: undefined;
            limit?: undefined;
            deal_id?: undefined;
            person_id?: undefined;
            org_id?: undefined;
            lead_id?: undefined;
            pinned_to_deal_flag?: undefined;
            pinned_to_person_flag?: undefined;
            pinned_to_organization_flag?: undefined;
            sort?: undefined;
            sort_direction?: undefined;
            content?: undefined;
        };
        required: string[];
    };
    handler: typeof getNote;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            content: {
                type: string;
                description: string;
            };
            deal_id: {
                type: string;
                description: string;
            };
            person_id: {
                type: string;
                description: string;
            };
            org_id: {
                type: string;
                description: string;
            };
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            sort?: undefined;
            sort_direction?: undefined;
            id?: undefined;
        };
        required: string[];
    };
    handler: typeof createNote;
    schema: import("zod").ZodObject<{
        content: import("zod").ZodString;
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        content: string;
        person_id?: number | undefined;
        org_id?: number | undefined;
        deal_id?: number | undefined;
        lead_id?: string | undefined;
        pinned_to_deal_flag?: boolean | undefined;
        pinned_to_person_flag?: boolean | undefined;
        pinned_to_organization_flag?: boolean | undefined;
    }, {
        content: string;
        person_id?: number | undefined;
        org_id?: number | undefined;
        deal_id?: number | undefined;
        lead_id?: string | undefined;
        pinned_to_deal_flag?: boolean | undefined;
        pinned_to_person_flag?: boolean | undefined;
        pinned_to_organization_flag?: boolean | undefined;
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
            content: {
                type: string;
                description: string;
            };
            deal_id: {
                type: string;
                description: string;
            };
            person_id: {
                type: string;
                description: string;
            };
            org_id: {
                type: string;
                description: string;
            };
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            sort?: undefined;
            sort_direction?: undefined;
        };
        required: string[];
    };
    handler: typeof updateNote;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        content: import("zod").ZodOptional<import("zod").ZodString>;
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        person_id?: number | undefined;
        org_id?: number | undefined;
        deal_id?: number | undefined;
        lead_id?: string | undefined;
        pinned_to_deal_flag?: boolean | undefined;
        pinned_to_person_flag?: boolean | undefined;
        pinned_to_organization_flag?: boolean | undefined;
        content?: string | undefined;
    }, {
        id: number;
        person_id?: number | undefined;
        org_id?: number | undefined;
        deal_id?: number | undefined;
        lead_id?: string | undefined;
        pinned_to_deal_flag?: boolean | undefined;
        pinned_to_person_flag?: boolean | undefined;
        pinned_to_organization_flag?: boolean | undefined;
        content?: string | undefined;
    }>;
})[];
//# sourceMappingURL=notes.d.ts.map