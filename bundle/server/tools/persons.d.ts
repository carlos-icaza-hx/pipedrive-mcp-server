/**
 * Person-related MCP tools for Pipedrive
 */
import { type ListPersonsParams, type GetPersonParams, type CreatePersonParams, type UpdatePersonParams, type SearchPersonsParams, type DeletePersonParams } from "../schemas/persons.js";
/**
 * List persons with optional filtering
 */
export declare function listPersons(params: ListPersonsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single person by ID
 */
export declare function getPerson(params: GetPersonParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Create a new person
 */
export declare function createPerson(params: CreatePersonParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Update an existing person
 */
export declare function updatePerson(params: UpdatePersonParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Search persons by name/email/phone
 */
export declare function searchPersons(params: SearchPersonsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Delete a person
 */
export declare function deletePerson(params: DeletePersonParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const personTools: ({
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
            org_id: {
                type: string;
                description: string;
            };
            first_char: {
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
            custom_fields: {
                type: string;
                description: string;
            };
            id?: undefined;
            name?: undefined;
            email?: undefined;
            phone?: undefined;
            visible_to?: undefined;
            marketing_status?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            search_by_email?: undefined;
            search_by_phone?: undefined;
            exact_match?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listPersons;
    schema: import("zod").ZodObject<{
        cursor: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        filter_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        ids: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        first_char: import("zod").ZodOptional<import("zod").ZodString>;
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
            org_id?: undefined;
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            name?: undefined;
            email?: undefined;
            phone?: undefined;
            visible_to?: undefined;
            marketing_status?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            search_by_email?: undefined;
            search_by_phone?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof getPerson;
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
            name: {
                type: string;
                description: string;
            };
            email: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        value: {
                            type: string;
                            description: string;
                        };
                        primary: {
                            type: string;
                            description: string;
                        };
                        label: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            phone: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        value: {
                            type: string;
                            description: string;
                        };
                        primary: {
                            type: string;
                            description: string;
                        };
                        label: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            org_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            marketing_status: {
                type: string;
                enum: string[];
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
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            id?: undefined;
            term?: undefined;
            search_by_email?: undefined;
            search_by_phone?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof createPerson;
    schema: import("zod").ZodObject<{
        name: import("zod").ZodString;
        email: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            value: import("zod").ZodString;
            primary: import("zod").ZodOptional<import("zod").ZodBoolean>;
            label: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }>, "many">>;
        phone: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            value: import("zod").ZodString;
            primary: import("zod").ZodOptional<import("zod").ZodBoolean>;
            label: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }>, "many">>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        visible_to: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodNumber, number, number>>;
        marketing_status: import("zod").ZodOptional<import("zod").ZodEnum<["no_consent", "unsubscribed", "subscribed", "archived"]>>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        add_time: import("zod").ZodOptional<import("zod").ZodString>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
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
            name: {
                type: string;
                description: string;
            };
            email: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        value: {
                            type: string;
                            description?: undefined;
                        };
                        primary: {
                            type: string;
                            description?: undefined;
                        };
                        label: {
                            type: string;
                            description?: undefined;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            phone: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        value: {
                            type: string;
                            description?: undefined;
                        };
                        primary: {
                            type: string;
                            description?: undefined;
                        };
                        label: {
                            type: string;
                            description?: undefined;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            org_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            marketing_status: {
                type: string;
                enum: string[];
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
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            add_time?: undefined;
            term?: undefined;
            search_by_email?: undefined;
            search_by_phone?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof updatePerson;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        name: import("zod").ZodOptional<import("zod").ZodString>;
        email: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            value: import("zod").ZodString;
            primary: import("zod").ZodOptional<import("zod").ZodBoolean>;
            label: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }>, "many">>;
        phone: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            value: import("zod").ZodString;
            primary: import("zod").ZodOptional<import("zod").ZodBoolean>;
            label: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }, {
            value: string;
            primary?: boolean | undefined;
            label?: string | undefined;
        }>, "many">>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        visible_to: import("zod").ZodOptional<import("zod").ZodEnum<["1", "3", "5", "7"]>>;
        marketing_status: import("zod").ZodOptional<import("zod").ZodEnum<["no_consent", "unsubscribed", "subscribed", "archived"]>>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
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
            org_id: {
                type: string;
                description: string;
            };
            search_by_email: {
                type: string;
                description: string;
            };
            search_by_phone: {
                type: string;
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
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            custom_fields?: undefined;
            id?: undefined;
            name?: undefined;
            email?: undefined;
            phone?: undefined;
            visible_to?: undefined;
            marketing_status?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
        };
        required: string[];
    };
    handler: typeof searchPersons;
    schema: import("zod").ZodObject<{
        term: import("zod").ZodString;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        search_by_email: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
        search_by_phone: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
        exact_match: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
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
            org_id?: undefined;
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            custom_fields?: undefined;
            name?: undefined;
            email?: undefined;
            phone?: undefined;
            visible_to?: undefined;
            marketing_status?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            search_by_email?: undefined;
            search_by_phone?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof deletePerson;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
})[];
//# sourceMappingURL=persons.d.ts.map