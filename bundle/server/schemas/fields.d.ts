/**
 * Zod schemas for Field metadata operations (v1 API)
 */
import { z } from "zod";
/**
 * Field entity types
 */
export declare const FieldEntityTypeSchema: z.ZodEnum<["organization", "deal", "person", "product", "activity", "project"]>;
/**
 * List organization fields parameters
 */
export declare const ListOrganizationFieldsSchema: z.ZodObject<{
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    start?: number | undefined;
}, {
    limit?: number | undefined;
    start?: number | undefined;
}>;
/**
 * List deal fields parameters
 */
export declare const ListDealFieldsSchema: z.ZodObject<{
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    start?: number | undefined;
}, {
    limit?: number | undefined;
    start?: number | undefined;
}>;
/**
 * List person fields parameters
 */
export declare const ListPersonFieldsSchema: z.ZodObject<{
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    start?: number | undefined;
}, {
    limit?: number | undefined;
    start?: number | undefined;
}>;
/**
 * Get field by key parameters
 */
export declare const GetFieldSchema: z.ZodObject<{
    entity_type: z.ZodEnum<["organization", "deal", "person", "product", "activity", "project"]>;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
    key: string;
}, {
    entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
    key: string;
}>;
/**
 * Type exports
 */
export type ListOrganizationFieldsParams = z.infer<typeof ListOrganizationFieldsSchema>;
export type ListDealFieldsParams = z.infer<typeof ListDealFieldsSchema>;
export type ListPersonFieldsParams = z.infer<typeof ListPersonFieldsSchema>;
export type GetFieldParams = z.infer<typeof GetFieldSchema>;
//# sourceMappingURL=fields.d.ts.map