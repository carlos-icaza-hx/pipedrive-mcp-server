/**
 * Zod schemas for Note-related operations
 */
import { z } from "zod";
/**
 * List notes parameters
 */
export declare const ListNotesSchema: z.ZodObject<{
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
} & {
    deal_id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    lead_id: z.ZodOptional<z.ZodString>;
    pinned_to_deal_flag: z.ZodOptional<z.ZodBoolean>;
    pinned_to_person_flag: z.ZodOptional<z.ZodBoolean>;
    pinned_to_organization_flag: z.ZodOptional<z.ZodBoolean>;
    sort: z.ZodOptional<z.ZodEnum<["id", "add_time", "update_time"]>>;
    sort_direction: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Get note parameters
 */
export declare const GetNoteSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Create note parameters
 */
export declare const CreateNoteSchema: z.ZodObject<{
    content: z.ZodString;
    deal_id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    lead_id: z.ZodOptional<z.ZodString>;
    pinned_to_deal_flag: z.ZodOptional<z.ZodBoolean>;
    pinned_to_person_flag: z.ZodOptional<z.ZodBoolean>;
    pinned_to_organization_flag: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Update note parameters
 */
export declare const UpdateNoteSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    content: z.ZodOptional<z.ZodString>;
    deal_id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    lead_id: z.ZodOptional<z.ZodString>;
    pinned_to_deal_flag: z.ZodOptional<z.ZodBoolean>;
    pinned_to_person_flag: z.ZodOptional<z.ZodBoolean>;
    pinned_to_organization_flag: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
/**
 * Delete note parameters
 */
export declare const DeleteNoteSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Type exports
 */
export type ListNotesParams = z.infer<typeof ListNotesSchema>;
export type GetNoteParams = z.infer<typeof GetNoteSchema>;
export type CreateNoteParams = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteParams = z.infer<typeof UpdateNoteSchema>;
export type DeleteNoteParams = z.infer<typeof DeleteNoteSchema>;
//# sourceMappingURL=notes.d.ts.map