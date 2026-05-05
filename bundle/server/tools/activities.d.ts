/**
 * Activity-related MCP tools for Pipedrive
 */
import { type ListActivitiesParams, type GetActivityParams, type CreateActivityParams, type UpdateActivityParams, type DeleteActivityParams } from "../schemas/activities.js";
/**
 * List activities with optional filtering
 */
export declare function listActivities(params: ListActivitiesParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single activity by ID
 */
export declare function getActivity(params: GetActivityParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Create a new activity
 */
export declare function createActivity(params: CreateActivityParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Update an existing activity
 */
export declare function updateActivity(params: UpdateActivityParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Delete an activity
 */
export declare function deleteActivity(params: DeleteActivityParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const activityTools: ({
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
            deal_id: {
                type: string;
                description: string;
            };
            lead_id: {
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
            project_id: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            done: {
                type: string;
                description: string;
            };
            start_date: {
                type: string;
                description: string;
            };
            end_date: {
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
            id?: undefined;
            subject?: undefined;
            due_date?: undefined;
            due_time?: undefined;
            duration?: undefined;
            note?: undefined;
            busy?: undefined;
            priority?: undefined;
            participants?: undefined;
            attendees?: undefined;
            location?: undefined;
            public_description?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listActivities;
    schema: import("zod").ZodObject<{
        cursor: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        filter_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        ids: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        project_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        type: import("zod").ZodOptional<import("zod").ZodString>;
        done: import("zod").ZodOptional<import("zod").ZodBoolean>;
        start_date: import("zod").ZodOptional<import("zod").ZodString>;
        end_date: import("zod").ZodOptional<import("zod").ZodString>;
        updated_since: import("zod").ZodOptional<import("zod").ZodString>;
        updated_until: import("zod").ZodOptional<import("zod").ZodString>;
        sort_by: import("zod").ZodOptional<import("zod").ZodEnum<["id", "update_time", "add_time", "due_date"]>>;
        sort_direction: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["asc", "desc"]>>>;
        include_fields: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
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
            cursor?: undefined;
            limit?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            owner_id?: undefined;
            deal_id?: undefined;
            lead_id?: undefined;
            person_id?: undefined;
            org_id?: undefined;
            project_id?: undefined;
            type?: undefined;
            done?: undefined;
            start_date?: undefined;
            end_date?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            subject?: undefined;
            due_date?: undefined;
            due_time?: undefined;
            duration?: undefined;
            note?: undefined;
            busy?: undefined;
            priority?: undefined;
            participants?: undefined;
            attendees?: undefined;
            location?: undefined;
            public_description?: undefined;
        };
        required: string[];
    };
    handler: typeof getActivity;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        include_fields: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        include_fields?: string | undefined;
    }, {
        id: number;
        include_fields?: string | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            subject: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            due_date: {
                type: string;
                description: string;
            };
            due_time: {
                type: string;
                description: string;
            };
            duration: {
                type: string;
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            deal_id: {
                type: string;
                description: string;
            };
            lead_id: {
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
            project_id: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                description: string;
            };
            done: {
                type: string;
                description: string;
            };
            busy: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            participants: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        person_id: {
                            type: string;
                            description: string;
                        };
                        primary: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            attendees: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        email: {
                            type: string;
                            description: string;
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            public_description: {
                type: string;
                description: string;
            };
            cursor?: undefined;
            limit?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            start_date?: undefined;
            end_date?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            id?: undefined;
        };
        required: string[];
    };
    handler: typeof createActivity;
    schema: import("zod").ZodObject<{
        subject: import("zod").ZodString;
        type: import("zod").ZodString;
        due_date: import("zod").ZodOptional<import("zod").ZodString>;
        due_time: import("zod").ZodOptional<import("zod").ZodString>;
        duration: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        project_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        note: import("zod").ZodOptional<import("zod").ZodString>;
        done: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
        busy: import("zod").ZodOptional<import("zod").ZodBoolean>;
        priority: import("zod").ZodOptional<import("zod").ZodNumber>;
        participants: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            person_id: import("zod").ZodNumber;
            primary: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            person_id: number;
            primary?: boolean | undefined;
        }, {
            person_id: number;
            primary?: boolean | undefined;
        }>, "many">>;
        attendees: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            email: import("zod").ZodString;
            name: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            email: string;
            name?: string | undefined;
        }, {
            email: string;
            name?: string | undefined;
        }>, "many">>;
        location: import("zod").ZodOptional<import("zod").ZodString>;
        public_description: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
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
            subject: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            due_date: {
                type: string;
                description: string;
            };
            due_time: {
                type: string;
                description: string;
            };
            duration: {
                type: string;
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            deal_id: {
                type: string;
                description: string;
            };
            lead_id: {
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
            project_id: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                description: string;
            };
            done: {
                type: string;
                description: string;
            };
            busy: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            participants: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        person_id: {
                            type: string;
                            description?: undefined;
                        };
                        primary: {
                            type: string;
                            description?: undefined;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            attendees: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        email: {
                            type: string;
                            description?: undefined;
                        };
                        name: {
                            type: string;
                            description?: undefined;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            cursor?: undefined;
            limit?: undefined;
            filter_id?: undefined;
            ids?: undefined;
            start_date?: undefined;
            end_date?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            public_description?: undefined;
        };
        required: string[];
    };
    handler: typeof updateActivity;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        subject: import("zod").ZodOptional<import("zod").ZodString>;
        type: import("zod").ZodOptional<import("zod").ZodString>;
        due_date: import("zod").ZodOptional<import("zod").ZodString>;
        due_time: import("zod").ZodOptional<import("zod").ZodString>;
        duration: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        project_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        note: import("zod").ZodOptional<import("zod").ZodString>;
        done: import("zod").ZodOptional<import("zod").ZodBoolean>;
        busy: import("zod").ZodOptional<import("zod").ZodBoolean>;
        priority: import("zod").ZodOptional<import("zod").ZodNumber>;
        participants: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            person_id: import("zod").ZodNumber;
            primary: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            person_id: number;
            primary?: boolean | undefined;
        }, {
            person_id: number;
            primary?: boolean | undefined;
        }>, "many">>;
        attendees: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            email: import("zod").ZodString;
            name: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            email: string;
            name?: string | undefined;
        }, {
            email: string;
            name?: string | undefined;
        }>, "many">>;
        location: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
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
            deal_id?: undefined;
            lead_id?: undefined;
            person_id?: undefined;
            org_id?: undefined;
            project_id?: undefined;
            type?: undefined;
            done?: undefined;
            start_date?: undefined;
            end_date?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            subject?: undefined;
            due_date?: undefined;
            due_time?: undefined;
            duration?: undefined;
            note?: undefined;
            busy?: undefined;
            priority?: undefined;
            participants?: undefined;
            attendees?: undefined;
            location?: undefined;
            public_description?: undefined;
        };
        required: string[];
    };
    handler: typeof deleteActivity;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
})[];
//# sourceMappingURL=activities.d.ts.map