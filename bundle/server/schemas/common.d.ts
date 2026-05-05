/**
 * Common Zod schemas shared across tools
 */
import { z } from "zod";
/**
 * Pagination parameters schema (v2 cursor-based)
 */
export declare const PaginationParamsSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    cursor?: string | undefined;
}, {
    cursor?: string | undefined;
    limit?: number | undefined;
}>;
/**
 * V1 pagination parameters schema (offset-based)
 */
export declare const PaginationParamsV1Schema: z.ZodObject<{
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
 * Common ID parameter
 */
export declare const IdParamSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Date string format (YYYY-MM-DD)
 */
export declare const DateStringSchema: z.ZodString;
/**
 * Optional date string
 */
export declare const OptionalDateSchema: z.ZodOptional<z.ZodString>;
/**
 * Email object schema (Pipedrive stores emails as arrays of objects)
 */
export declare const EmailSchema: z.ZodObject<{
    value: z.ZodString;
    primary: z.ZodOptional<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: string;
    primary?: boolean | undefined;
    label?: string | undefined;
}, {
    value: string;
    primary?: boolean | undefined;
    label?: string | undefined;
}>;
/**
 * Phone object schema
 */
export declare const PhoneSchema: z.ZodObject<{
    value: z.ZodString;
    primary: z.ZodOptional<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: string;
    primary?: boolean | undefined;
    label?: string | undefined;
}, {
    value: string;
    primary?: boolean | undefined;
    label?: string | undefined;
}>;
/**
 * Sort direction
 */
export declare const SortDirectionSchema: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
/**
 * Deal status
 */
export declare const DealStatusSchema: z.ZodEnum<["open", "won", "lost", "deleted", "all_not_deleted"]>;
/**
 * Activity type (Pipedrive built-in types)
 */
export declare const ActivityTypeSchema: z.ZodString;
/**
 * Visibility settings (integer values)
 */
export declare const VisibilitySchema: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
/**
 * Currency code (3-letter ISO)
 */
export declare const CurrencyCodeSchema: z.ZodOptional<z.ZodString>;
/**
 * Search term validation
 */
export declare const SearchTermSchema: z.ZodString;
/**
 * Custom field value (can be various types)
 */
export declare const CustomFieldValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodArray<z.ZodString, "many">, z.ZodArray<z.ZodNumber, "many">]>;
//# sourceMappingURL=common.d.ts.map