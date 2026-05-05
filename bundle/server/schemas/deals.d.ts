/**
 * Zod schemas for Deal-related operations
 */
import { z } from "zod";
/**
 * List deals parameters
 */
export declare const ListDealsSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
} & {
    filter_id: z.ZodOptional<z.ZodNumber>;
    ids: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    pipeline_id: z.ZodOptional<z.ZodNumber>;
    stage_id: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["open", "won", "lost", "deleted", "all_not_deleted"]>>;
    updated_since: z.ZodOptional<z.ZodString>;
    updated_until: z.ZodOptional<z.ZodString>;
    sort_by: z.ZodOptional<z.ZodEnum<["id", "update_time", "add_time"]>>;
    sort_direction: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    include_fields: z.ZodOptional<z.ZodString>;
    custom_fields: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Get deal parameters
 */
export declare const GetDealSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    include_fields: z.ZodOptional<z.ZodString>;
    custom_fields: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    include_fields?: string | undefined;
    custom_fields?: string | undefined;
}, {
    id: number;
    include_fields?: string | undefined;
    custom_fields?: string | undefined;
}>;
/**
 * Create deal parameters
 */
export declare const CreateDealSchema: z.ZodObject<{
    title: z.ZodString;
    value: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    pipeline_id: z.ZodOptional<z.ZodNumber>;
    stage_id: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["open", "won", "lost"]>>;
    expected_close_date: z.ZodOptional<z.ZodString>;
    probability: z.ZodOptional<z.ZodNumber>;
    visible_to: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    label_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    add_time: z.ZodOptional<z.ZodString>;
    custom_fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Update deal parameters
 */
export declare const UpdateDealSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    title: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    pipeline_id: z.ZodOptional<z.ZodNumber>;
    stage_id: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["open", "won", "lost"]>>;
    expected_close_date: z.ZodOptional<z.ZodString>;
    probability: z.ZodOptional<z.ZodNumber>;
    won_time: z.ZodOptional<z.ZodString>;
    lost_time: z.ZodOptional<z.ZodString>;
    lost_reason: z.ZodOptional<z.ZodString>;
    label_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    custom_fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Search deals parameters
 */
export declare const SearchDealsSchema: z.ZodObject<{
    term: z.ZodString;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["open", "won", "lost", "deleted", "all_not_deleted"]>>;
    exact_match: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Delete deal parameters
 */
export declare const DeleteDealSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Type exports for use in tool implementations
 */
export type ListDealsParams = z.infer<typeof ListDealsSchema>;
export type GetDealParams = z.infer<typeof GetDealSchema>;
export type CreateDealParams = z.infer<typeof CreateDealSchema>;
export type UpdateDealParams = z.infer<typeof UpdateDealSchema>;
export type SearchDealsParams = z.infer<typeof SearchDealsSchema>;
export type DeleteDealParams = z.infer<typeof DeleteDealSchema>;
//# sourceMappingURL=deals.d.ts.map