/**
 * Zod schemas for Activity-related operations
 */
import { z } from "zod";
/**
 * List activities parameters
 */
export declare const ListActivitiesSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
} & {
    filter_id: z.ZodOptional<z.ZodNumber>;
    ids: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    deal_id: z.ZodOptional<z.ZodNumber>;
    lead_id: z.ZodOptional<z.ZodString>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    project_id: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodString>;
    done: z.ZodOptional<z.ZodBoolean>;
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
    updated_since: z.ZodOptional<z.ZodString>;
    updated_until: z.ZodOptional<z.ZodString>;
    sort_by: z.ZodOptional<z.ZodEnum<["id", "update_time", "add_time", "due_date"]>>;
    sort_direction: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    include_fields: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sort_direction: "asc" | "desc";
    cursor?: string | undefined;
    type?: string | undefined;
    filter_id?: number | undefined;
    ids?: string | undefined;
    owner_id?: number | undefined;
    person_id?: number | undefined;
    org_id?: number | undefined;
    updated_since?: string | undefined;
    updated_until?: string | undefined;
    sort_by?: "id" | "update_time" | "add_time" | "due_date" | undefined;
    include_fields?: string | undefined;
    deal_id?: number | undefined;
    lead_id?: string | undefined;
    project_id?: number | undefined;
    done?: boolean | undefined;
    start_date?: string | undefined;
    end_date?: string | undefined;
}, {
    cursor?: string | undefined;
    limit?: number | undefined;
    type?: string | undefined;
    filter_id?: number | undefined;
    ids?: string | undefined;
    owner_id?: number | undefined;
    person_id?: number | undefined;
    org_id?: number | undefined;
    updated_since?: string | undefined;
    updated_until?: string | undefined;
    sort_by?: "id" | "update_time" | "add_time" | "due_date" | undefined;
    sort_direction?: "asc" | "desc" | undefined;
    include_fields?: string | undefined;
    deal_id?: number | undefined;
    lead_id?: string | undefined;
    project_id?: number | undefined;
    done?: boolean | undefined;
    start_date?: string | undefined;
    end_date?: string | undefined;
}>;
/**
 * Get activity parameters
 */
export declare const GetActivitySchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    include_fields: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    include_fields?: string | undefined;
}, {
    id: number;
    include_fields?: string | undefined;
}>;
/**
 * Create activity parameters
 */
export declare const CreateActivitySchema: z.ZodObject<{
    subject: z.ZodString;
    type: z.ZodString;
    due_date: z.ZodOptional<z.ZodString>;
    due_time: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    deal_id: z.ZodOptional<z.ZodNumber>;
    lead_id: z.ZodOptional<z.ZodString>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    project_id: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
    done: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    busy: z.ZodOptional<z.ZodBoolean>;
    priority: z.ZodOptional<z.ZodNumber>;
    participants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        person_id: z.ZodNumber;
        primary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        person_id: number;
        primary?: boolean | undefined;
    }, {
        person_id: number;
        primary?: boolean | undefined;
    }>, "many">>;
    attendees: z.ZodOptional<z.ZodArray<z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name?: string | undefined;
    }, {
        email: string;
        name?: string | undefined;
    }>, "many">>;
    location: z.ZodOptional<z.ZodString>;
    public_description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string;
    done: boolean;
    subject: string;
    owner_id?: number | undefined;
    person_id?: number | undefined;
    org_id?: number | undefined;
    deal_id?: number | undefined;
    lead_id?: string | undefined;
    project_id?: number | undefined;
    due_date?: string | undefined;
    due_time?: string | undefined;
    duration?: string | undefined;
    note?: string | undefined;
    busy?: boolean | undefined;
    priority?: number | undefined;
    participants?: {
        person_id: number;
        primary?: boolean | undefined;
    }[] | undefined;
    attendees?: {
        email: string;
        name?: string | undefined;
    }[] | undefined;
    location?: string | undefined;
    public_description?: string | undefined;
}, {
    type: string;
    subject: string;
    owner_id?: number | undefined;
    person_id?: number | undefined;
    org_id?: number | undefined;
    deal_id?: number | undefined;
    lead_id?: string | undefined;
    project_id?: number | undefined;
    done?: boolean | undefined;
    due_date?: string | undefined;
    due_time?: string | undefined;
    duration?: string | undefined;
    note?: string | undefined;
    busy?: boolean | undefined;
    priority?: number | undefined;
    participants?: {
        person_id: number;
        primary?: boolean | undefined;
    }[] | undefined;
    attendees?: {
        email: string;
        name?: string | undefined;
    }[] | undefined;
    location?: string | undefined;
    public_description?: string | undefined;
}>;
/**
 * Update activity parameters
 */
export declare const UpdateActivitySchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    subject: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    due_date: z.ZodOptional<z.ZodString>;
    due_time: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodNumber>;
    deal_id: z.ZodOptional<z.ZodNumber>;
    lead_id: z.ZodOptional<z.ZodString>;
    person_id: z.ZodOptional<z.ZodNumber>;
    org_id: z.ZodOptional<z.ZodNumber>;
    project_id: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
    done: z.ZodOptional<z.ZodBoolean>;
    busy: z.ZodOptional<z.ZodBoolean>;
    priority: z.ZodOptional<z.ZodNumber>;
    participants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        person_id: z.ZodNumber;
        primary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        person_id: number;
        primary?: boolean | undefined;
    }, {
        person_id: number;
        primary?: boolean | undefined;
    }>, "many">>;
    attendees: z.ZodOptional<z.ZodArray<z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name?: string | undefined;
    }, {
        email: string;
        name?: string | undefined;
    }>, "many">>;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    type?: string | undefined;
    owner_id?: number | undefined;
    person_id?: number | undefined;
    org_id?: number | undefined;
    deal_id?: number | undefined;
    lead_id?: string | undefined;
    project_id?: number | undefined;
    done?: boolean | undefined;
    due_date?: string | undefined;
    subject?: string | undefined;
    due_time?: string | undefined;
    duration?: string | undefined;
    note?: string | undefined;
    busy?: boolean | undefined;
    priority?: number | undefined;
    participants?: {
        person_id: number;
        primary?: boolean | undefined;
    }[] | undefined;
    attendees?: {
        email: string;
        name?: string | undefined;
    }[] | undefined;
    location?: string | undefined;
}, {
    id: number;
    type?: string | undefined;
    owner_id?: number | undefined;
    person_id?: number | undefined;
    org_id?: number | undefined;
    deal_id?: number | undefined;
    lead_id?: string | undefined;
    project_id?: number | undefined;
    done?: boolean | undefined;
    due_date?: string | undefined;
    subject?: string | undefined;
    due_time?: string | undefined;
    duration?: string | undefined;
    note?: string | undefined;
    busy?: boolean | undefined;
    priority?: number | undefined;
    participants?: {
        person_id: number;
        primary?: boolean | undefined;
    }[] | undefined;
    attendees?: {
        email: string;
        name?: string | undefined;
    }[] | undefined;
    location?: string | undefined;
}>;
/**
 * Delete activity parameters
 */
export declare const DeleteActivitySchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Type exports
 */
export type ListActivitiesParams = z.infer<typeof ListActivitiesSchema>;
export type GetActivityParams = z.infer<typeof GetActivitySchema>;
export type CreateActivityParams = z.infer<typeof CreateActivitySchema>;
export type UpdateActivityParams = z.infer<typeof UpdateActivitySchema>;
export type DeleteActivityParams = z.infer<typeof DeleteActivitySchema>;
//# sourceMappingURL=activities.d.ts.map