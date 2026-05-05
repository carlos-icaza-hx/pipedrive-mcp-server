/**
 * Zod schemas for Person-related operations
 */
import { z } from "zod";
/**
 * Email input schema for creating/updating persons
 */
export declare const EmailInputSchema: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
}>, "many">>;
/**
 * Phone input schema for creating/updating persons
 */
export declare const PhoneInputSchema: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
}>, "many">>;
/**
 * List persons parameters
 */
export declare const ListPersonsSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
} & {
    filter_id: z.ZodOptional<z.ZodNumber>;
    ids: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
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
    org_id?: number | undefined;
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
    org_id?: number | undefined;
    updated_since?: string | undefined;
    updated_until?: string | undefined;
    sort_by?: "id" | "update_time" | "add_time" | undefined;
    sort_direction?: "asc" | "desc" | undefined;
    include_fields?: string | undefined;
    custom_fields?: string | undefined;
    first_char?: string | undefined;
}>;
/**
 * Get person parameters
 */
export declare const GetPersonSchema: z.ZodObject<{
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
 * Create person parameters
 */
export declare const CreatePersonSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    phone: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    visible_to: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    marketing_status: z.ZodOptional<z.ZodEnum<["no_consent", "unsubscribed", "subscribed", "archived"]>>;
    label_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    add_time: z.ZodOptional<z.ZodString>;
    custom_fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    owner_id?: number | undefined;
    org_id?: number | undefined;
    add_time?: string | undefined;
    custom_fields?: Record<string, unknown> | undefined;
    visible_to?: number | undefined;
    label_ids?: number[] | undefined;
    email?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    phone?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    marketing_status?: "no_consent" | "unsubscribed" | "subscribed" | "archived" | undefined;
}, {
    name: string;
    owner_id?: number | undefined;
    org_id?: number | undefined;
    add_time?: string | undefined;
    custom_fields?: Record<string, unknown> | undefined;
    visible_to?: number | undefined;
    label_ids?: number[] | undefined;
    email?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    phone?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    marketing_status?: "no_consent" | "unsubscribed" | "subscribed" | "archived" | undefined;
}>;
/**
 * Update person parameters
 */
export declare const UpdatePersonSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    phone: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    visible_to: z.ZodOptional<z.ZodEnum<["1", "3", "5", "7"]>>;
    marketing_status: z.ZodOptional<z.ZodEnum<["no_consent", "unsubscribed", "subscribed", "archived"]>>;
    label_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    custom_fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    owner_id?: number | undefined;
    org_id?: number | undefined;
    custom_fields?: Record<string, unknown> | undefined;
    visible_to?: "1" | "3" | "5" | "7" | undefined;
    label_ids?: number[] | undefined;
    name?: string | undefined;
    email?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    phone?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    marketing_status?: "no_consent" | "unsubscribed" | "subscribed" | "archived" | undefined;
}, {
    id: number;
    owner_id?: number | undefined;
    org_id?: number | undefined;
    custom_fields?: Record<string, unknown> | undefined;
    visible_to?: "1" | "3" | "5" | "7" | undefined;
    label_ids?: number[] | undefined;
    name?: string | undefined;
    email?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    phone?: {
        value: string;
        primary?: boolean | undefined;
        label?: string | undefined;
    }[] | undefined;
    marketing_status?: "no_consent" | "unsubscribed" | "subscribed" | "archived" | undefined;
}>;
/**
 * Search persons parameters
 */
export declare const SearchPersonsSchema: z.ZodObject<{
    term: z.ZodString;
    org_id: z.ZodOptional<z.ZodNumber>;
    search_by_email: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    search_by_phone: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    exact_match: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    term: string;
    exact_match: boolean;
    search_by_email: boolean;
    search_by_phone: boolean;
    org_id?: number | undefined;
}, {
    term: string;
    limit?: number | undefined;
    org_id?: number | undefined;
    exact_match?: boolean | undefined;
    search_by_email?: boolean | undefined;
    search_by_phone?: boolean | undefined;
}>;
/**
 * Delete person parameters
 */
export declare const DeletePersonSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Type exports
 */
export type ListPersonsParams = z.infer<typeof ListPersonsSchema>;
export type GetPersonParams = z.infer<typeof GetPersonSchema>;
export type CreatePersonParams = z.infer<typeof CreatePersonSchema>;
export type UpdatePersonParams = z.infer<typeof UpdatePersonSchema>;
export type SearchPersonsParams = z.infer<typeof SearchPersonsSchema>;
export type DeletePersonParams = z.infer<typeof DeletePersonSchema>;
//# sourceMappingURL=persons.d.ts.map