/**
 * Zod schemas for Organization-related operations
 */
import { z } from "zod";
/**
 * List organizations parameters
 */
export declare const ListOrganizationsSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
} & {
    filter_id: z.ZodOptional<z.ZodNumber>;
    ids: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    first_char: z.ZodOptional<z.ZodString>;
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
/**
 * Get organization parameters
 */
export declare const GetOrganizationSchema: z.ZodObject<{
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
 * Create organization parameters
 */
export declare const CreateOrganizationSchema: z.ZodObject<{
    name: z.ZodString;
    owner_id: z.ZodOptional<z.ZodNumber>;
    visible_to: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    address: z.ZodOptional<z.ZodString>;
    label_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    add_time: z.ZodOptional<z.ZodString>;
    custom_fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Update organization parameters
 */
export declare const UpdateOrganizationSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    name: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    visible_to: z.ZodOptional<z.ZodEnum<["1", "3", "5", "7"]>>;
    address: z.ZodOptional<z.ZodString>;
    label_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    custom_fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Search organizations parameters
 */
export declare const SearchOrganizationsSchema: z.ZodObject<{
    term: z.ZodString;
    exact_match: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    term: string;
    exact_match: boolean;
}, {
    term: string;
    limit?: number | undefined;
    exact_match?: boolean | undefined;
}>;
/**
 * Delete organization parameters
 */
export declare const DeleteOrganizationSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Type exports
 */
export type ListOrganizationsParams = z.infer<typeof ListOrganizationsSchema>;
export type GetOrganizationParams = z.infer<typeof GetOrganizationSchema>;
export type CreateOrganizationParams = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationParams = z.infer<typeof UpdateOrganizationSchema>;
export type SearchOrganizationsParams = z.infer<typeof SearchOrganizationsSchema>;
export type DeleteOrganizationParams = z.infer<typeof DeleteOrganizationSchema>;
//# sourceMappingURL=organizations.d.ts.map