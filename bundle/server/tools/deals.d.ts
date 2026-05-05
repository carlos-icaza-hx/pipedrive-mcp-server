/**
 * Deal-related MCP tools for Pipedrive
 */
import { type ListDealsParams, type GetDealParams, type CreateDealParams, type UpdateDealParams, type SearchDealsParams, type DeleteDealParams } from "../schemas/deals.js";
/**
 * List deals with optional filtering
 */
export declare function listDeals(params: ListDealsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single deal by ID
 */
export declare function getDeal(params: GetDealParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Create a new deal
 */
export declare function createDeal(params: CreateDealParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Update an existing deal
 */
export declare function updateDeal(params: UpdateDealParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Search deals by term
 */
export declare function searchDeals(params: SearchDealsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Delete a deal
 */
export declare function deleteDeal(params: DeleteDealParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const dealTools: ({
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
            person_id: {
                type: string;
                description: string;
            };
            org_id: {
                type: string;
                description: string;
            };
            pipeline_id: {
                type: string;
                description: string;
            };
            stage_id: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
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
            title?: undefined;
            value?: undefined;
            currency?: undefined;
            expected_close_date?: undefined;
            probability?: undefined;
            visible_to?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            won_time?: undefined;
            lost_time?: undefined;
            lost_reason?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listDeals;
    schema: import("zod").ZodObject<{
        cursor: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        filter_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        ids: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        pipeline_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        stage_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<["open", "won", "lost", "deleted", "all_not_deleted"]>>;
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
        status?: "open" | "won" | "lost" | "deleted" | "all_not_deleted" | undefined;
        filter_id?: number | undefined;
        ids?: string | undefined;
        owner_id?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        pipeline_id?: number | undefined;
        stage_id?: number | undefined;
        updated_since?: string | undefined;
        updated_until?: string | undefined;
        sort_by?: "id" | "update_time" | "add_time" | undefined;
        include_fields?: string | undefined;
        custom_fields?: string | undefined;
    }, {
        cursor?: string | undefined;
        limit?: number | undefined;
        status?: "open" | "won" | "lost" | "deleted" | "all_not_deleted" | undefined;
        filter_id?: number | undefined;
        ids?: string | undefined;
        owner_id?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        pipeline_id?: number | undefined;
        stage_id?: number | undefined;
        updated_since?: string | undefined;
        updated_until?: string | undefined;
        sort_by?: "id" | "update_time" | "add_time" | undefined;
        sort_direction?: "asc" | "desc" | undefined;
        include_fields?: string | undefined;
        custom_fields?: string | undefined;
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
            person_id?: undefined;
            org_id?: undefined;
            pipeline_id?: undefined;
            stage_id?: undefined;
            status?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            title?: undefined;
            value?: undefined;
            currency?: undefined;
            expected_close_date?: undefined;
            probability?: undefined;
            visible_to?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            won_time?: undefined;
            lost_time?: undefined;
            lost_reason?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof getDeal;
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
            title: {
                type: string;
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            currency: {
                type: string;
                description: string;
            };
            owner_id: {
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
            pipeline_id: {
                type: string;
                description: string;
            };
            stage_id: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            expected_close_date: {
                type: string;
                description: string;
            };
            probability: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
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
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            id?: undefined;
            won_time?: undefined;
            lost_time?: undefined;
            lost_reason?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof createDeal;
    schema: import("zod").ZodObject<{
        title: import("zod").ZodString;
        value: import("zod").ZodOptional<import("zod").ZodNumber>;
        currency: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        pipeline_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        stage_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<["open", "won", "lost"]>>;
        expected_close_date: import("zod").ZodOptional<import("zod").ZodString>;
        probability: import("zod").ZodOptional<import("zod").ZodNumber>;
        visible_to: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodNumber, number, number>>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        add_time: import("zod").ZodOptional<import("zod").ZodString>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        title: string;
        value?: number | undefined;
        status?: "open" | "won" | "lost" | undefined;
        owner_id?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        pipeline_id?: number | undefined;
        stage_id?: number | undefined;
        add_time?: string | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        currency?: string | undefined;
        expected_close_date?: string | undefined;
        probability?: number | undefined;
        visible_to?: number | undefined;
        label_ids?: number[] | undefined;
    }, {
        title: string;
        value?: number | undefined;
        status?: "open" | "won" | "lost" | undefined;
        owner_id?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        pipeline_id?: number | undefined;
        stage_id?: number | undefined;
        add_time?: string | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        currency?: string | undefined;
        expected_close_date?: string | undefined;
        probability?: number | undefined;
        visible_to?: number | undefined;
        label_ids?: number[] | undefined;
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
            title: {
                type: string;
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            currency: {
                type: string;
                description: string;
            };
            owner_id: {
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
            pipeline_id: {
                type: string;
                description: string;
            };
            stage_id: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            expected_close_date: {
                type: string;
                description: string;
            };
            probability: {
                type: string;
                description: string;
            };
            won_time: {
                type: string;
                description: string;
            };
            lost_time: {
                type: string;
                description: string;
            };
            lost_reason: {
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
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            visible_to?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof updateDeal;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        title: import("zod").ZodOptional<import("zod").ZodString>;
        value: import("zod").ZodOptional<import("zod").ZodNumber>;
        currency: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        pipeline_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        stage_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<["open", "won", "lost"]>>;
        expected_close_date: import("zod").ZodOptional<import("zod").ZodString>;
        probability: import("zod").ZodOptional<import("zod").ZodNumber>;
        won_time: import("zod").ZodOptional<import("zod").ZodString>;
        lost_time: import("zod").ZodOptional<import("zod").ZodString>;
        lost_reason: import("zod").ZodOptional<import("zod").ZodString>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        value?: number | undefined;
        status?: "open" | "won" | "lost" | undefined;
        owner_id?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        pipeline_id?: number | undefined;
        stage_id?: number | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        title?: string | undefined;
        currency?: string | undefined;
        expected_close_date?: string | undefined;
        probability?: number | undefined;
        label_ids?: number[] | undefined;
        won_time?: string | undefined;
        lost_time?: string | undefined;
        lost_reason?: string | undefined;
    }, {
        id: number;
        value?: number | undefined;
        status?: "open" | "won" | "lost" | undefined;
        owner_id?: number | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
        pipeline_id?: number | undefined;
        stage_id?: number | undefined;
        custom_fields?: Record<string, unknown> | undefined;
        title?: string | undefined;
        currency?: string | undefined;
        expected_close_date?: string | undefined;
        probability?: number | undefined;
        label_ids?: number[] | undefined;
        won_time?: string | undefined;
        lost_time?: string | undefined;
        lost_reason?: string | undefined;
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
            person_id: {
                type: string;
                description: string;
            };
            org_id: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
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
            pipeline_id?: undefined;
            stage_id?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            custom_fields?: undefined;
            id?: undefined;
            title?: undefined;
            value?: undefined;
            currency?: undefined;
            expected_close_date?: undefined;
            probability?: undefined;
            visible_to?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            won_time?: undefined;
            lost_time?: undefined;
            lost_reason?: undefined;
        };
        required: string[];
    };
    handler: typeof searchDeals;
    schema: import("zod").ZodObject<{
        term: import("zod").ZodString;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<["open", "won", "lost", "deleted", "all_not_deleted"]>>;
        exact_match: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        term: string;
        exact_match: boolean;
        status?: "open" | "won" | "lost" | "deleted" | "all_not_deleted" | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
    }, {
        term: string;
        limit?: number | undefined;
        status?: "open" | "won" | "lost" | "deleted" | "all_not_deleted" | undefined;
        person_id?: number | undefined;
        org_id?: number | undefined;
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
            person_id?: undefined;
            org_id?: undefined;
            pipeline_id?: undefined;
            stage_id?: undefined;
            status?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            custom_fields?: undefined;
            title?: undefined;
            value?: undefined;
            currency?: undefined;
            expected_close_date?: undefined;
            probability?: undefined;
            visible_to?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            won_time?: undefined;
            lost_time?: undefined;
            lost_reason?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof deleteDeal;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
})[];
//# sourceMappingURL=deals.d.ts.map