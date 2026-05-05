/**
 * Tool registration for Pipedrive MCP Server
 * Exports all tools for MCP server registration
 */
/**
 * All available tools
 */
export declare const allTools: ({
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
    handler: typeof import("./deals.js").listDeals;
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
    handler: typeof import("./deals.js").getDeal;
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
    handler: typeof import("./deals.js").createDeal;
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
    handler: typeof import("./deals.js").updateDeal;
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
    handler: typeof import("./deals.js").searchDeals;
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
    handler: typeof import("./persons.js").listPersons;
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
    handler: typeof import("./persons.js").getPerson;
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
    handler: typeof import("./persons.js").createPerson;
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
    handler: typeof import("./persons.js").updatePerson;
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
    handler: typeof import("./persons.js").searchPersons;
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
    handler: typeof import("./activities.js").listActivities;
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
    handler: typeof import("./activities.js").getActivity;
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
    handler: typeof import("./activities.js").createActivity;
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
    handler: typeof import("./activities.js").updateActivity;
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
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required?: undefined;
    };
    handler: typeof import("./organizations.js").listOrganizations;
    schema: import("zod").ZodObject<{
        cursor: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        filter_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        ids: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
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
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            name?: undefined;
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./organizations.js").getOrganization;
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
            owner_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            address: {
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
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./organizations.js").createOrganization;
    schema: import("zod").ZodObject<{
        name: import("zod").ZodString;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        visible_to: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodNumber, number, number>>;
        address: import("zod").ZodOptional<import("zod").ZodString>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        add_time: import("zod").ZodOptional<import("zod").ZodString>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
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
            owner_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            address: {
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
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./organizations.js").updateOrganization;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        name: import("zod").ZodOptional<import("zod").ZodString>;
        owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        visible_to: import("zod").ZodOptional<import("zod").ZodEnum<["1", "3", "5", "7"]>>;
        address: import("zod").ZodOptional<import("zod").ZodString>;
        label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    }, "strip", import("zod").ZodTypeAny, {
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
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./organizations.js").searchOrganizations;
    schema: import("zod").ZodObject<{
        term: import("zod").ZodString;
        exact_match: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        term: string;
        exact_match: boolean;
    }, {
        term: string;
        limit?: number | undefined;
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
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            folder?: undefined;
            include_body?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./mail.js").getPersonEmails;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        start: import("zod").ZodOptional<import("zod").ZodNumber>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        id: number;
        start?: number | undefined;
    }, {
        id: number;
        limit?: number | undefined;
        start?: number | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            folder: {
                type: string;
                enum: string[];
                description: string;
            };
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            id?: undefined;
            include_body?: undefined;
        };
        required?: undefined;
    };
    handler: typeof import("./mail.js").listMailThreads;
    schema: import("zod").ZodObject<{
        start: import("zod").ZodOptional<import("zod").ZodNumber>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        folder: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["inbox", "drafts", "sent", "archive"]>>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        folder: "inbox" | "drafts" | "sent" | "archive";
        start?: number | undefined;
    }, {
        limit?: number | undefined;
        start?: number | undefined;
        folder?: "inbox" | "drafts" | "sent" | "archive" | undefined;
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
            include_body: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            folder?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./mail.js").getMailMessage;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        include_body: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        include_body: boolean;
    }, {
        id: number;
        include_body?: boolean | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            entity_type?: undefined;
            key?: undefined;
        };
        required?: undefined;
    };
    handler: typeof import("./fields.js").listOrganizationFields;
    schema: import("zod").ZodObject<{
        start: import("zod").ZodOptional<import("zod").ZodNumber>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        start?: number | undefined;
    }, {
        limit?: number | undefined;
        start?: number | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            entity_type: {
                type: string;
                enum: string[];
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./fields.js").getField;
    schema: import("zod").ZodObject<{
        entity_type: import("zod").ZodEnum<["organization", "deal", "person", "product", "activity", "project"]>;
        key: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
        key: string;
    }, {
        entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
        key: string;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pipeline_id: {
                type: string;
                description: string;
            };
            id?: undefined;
        };
        required?: undefined;
    };
    handler: typeof import("./pipelines.js").listStages;
    schema: import("zod").ZodObject<{
        pipeline_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
        pipeline_id?: number | undefined;
    }, {
        pipeline_id?: number | undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id?: undefined;
        };
        required?: undefined;
    };
    handler: typeof import("./users.js").listUsers;
    schema: import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>;
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
        };
        required: string[];
    };
    handler: typeof import("./users.js").getUser;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            deal_id: {
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
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            sort: {
                type: string;
                enum: string[];
                description: string;
            };
            sort_direction: {
                type: string;
                enum: string[];
                description: string;
            };
            id?: undefined;
            content?: undefined;
        };
        required?: undefined;
    };
    handler: typeof import("./notes.js").listNotes;
    schema: import("zod").ZodObject<{
        start: import("zod").ZodOptional<import("zod").ZodNumber>;
        limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    } & {
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        sort: import("zod").ZodOptional<import("zod").ZodEnum<["id", "add_time", "update_time"]>>;
        sort_direction: import("zod").ZodOptional<import("zod").ZodEnum<["asc", "desc"]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            content: {
                type: string;
                description: string;
            };
            deal_id: {
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
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            sort?: undefined;
            sort_direction?: undefined;
            id?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./notes.js").createNote;
    schema: import("zod").ZodObject<{
        content: import("zod").ZodString;
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
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
            content: {
                type: string;
                description: string;
            };
            deal_id: {
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
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            sort?: undefined;
            sort_direction?: undefined;
        };
        required: string[];
    };
    handler: typeof import("./notes.js").updateNote;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    } & {
        content: import("zod").ZodOptional<import("zod").ZodString>;
        deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
        lead_id: import("zod").ZodOptional<import("zod").ZodString>;
        pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
        pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
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
})[];
/**
 * Tool definitions for MCP listTools
 */
export declare const toolDefinitions: {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
    } | {
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
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required?: undefined;
    } | {
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
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            name?: undefined;
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            owner_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            address: {
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
            exact_match?: undefined;
        };
        required: string[];
    } | {
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
            owner_id: {
                type: string;
                description: string;
            };
            visible_to: {
                type: string;
                enum: number[];
                description: string;
            };
            address: {
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
            first_char?: undefined;
            updated_since?: undefined;
            updated_until?: undefined;
            sort_by?: undefined;
            sort_direction?: undefined;
            include_fields?: undefined;
            add_time?: undefined;
            term?: undefined;
            exact_match?: undefined;
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            term: {
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
            visible_to?: undefined;
            address?: undefined;
            label_ids?: undefined;
            add_time?: undefined;
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            folder?: undefined;
            include_body?: undefined;
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            folder: {
                type: string;
                enum: string[];
                description: string;
            };
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            id?: undefined;
            include_body?: undefined;
        };
        required?: undefined;
    } | {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
            include_body: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            folder?: undefined;
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            entity_type?: undefined;
            key?: undefined;
        };
        required?: undefined;
    } | {
        type: "object";
        properties: {
            entity_type: {
                type: string;
                enum: string[];
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            pipeline_id: {
                type: string;
                description: string;
            };
            id?: undefined;
        };
        required?: undefined;
    } | {
        type: "object";
        properties: {
            id?: undefined;
        };
        required?: undefined;
    } | {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            start: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            deal_id: {
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
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            sort: {
                type: string;
                enum: string[];
                description: string;
            };
            sort_direction: {
                type: string;
                enum: string[];
                description: string;
            };
            id?: undefined;
            content?: undefined;
        };
        required?: undefined;
    } | {
        type: "object";
        properties: {
            content: {
                type: string;
                description: string;
            };
            deal_id: {
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
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            sort?: undefined;
            sort_direction?: undefined;
            id?: undefined;
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            deal_id: {
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
            lead_id: {
                type: string;
                description: string;
            };
            pinned_to_deal_flag: {
                type: string;
                description: string;
            };
            pinned_to_person_flag: {
                type: string;
                description: string;
            };
            pinned_to_organization_flag: {
                type: string;
                description: string;
            };
            start?: undefined;
            limit?: undefined;
            sort?: undefined;
            sort_direction?: undefined;
        };
        required: string[];
    };
}[];
/**
 * Get a tool handler by name
 */
export declare function getToolHandler(name: string): typeof import("./deals.js").listDeals | typeof import("./deals.js").getDeal | typeof import("./deals.js").createDeal | typeof import("./deals.js").updateDeal | typeof import("./deals.js").searchDeals | typeof import("./persons.js").listPersons | typeof import("./persons.js").getPerson | typeof import("./persons.js").createPerson | typeof import("./persons.js").updatePerson | typeof import("./persons.js").searchPersons | typeof import("./activities.js").listActivities | typeof import("./activities.js").getActivity | typeof import("./activities.js").createActivity | typeof import("./activities.js").updateActivity | typeof import("./organizations.js").listOrganizations | typeof import("./organizations.js").getOrganization | typeof import("./organizations.js").createOrganization | typeof import("./organizations.js").updateOrganization | typeof import("./organizations.js").searchOrganizations | typeof import("./mail.js").getPersonEmails | typeof import("./mail.js").listMailThreads | typeof import("./mail.js").getMailMessage | typeof import("./fields.js").listOrganizationFields | typeof import("./fields.js").getField | typeof import("./pipelines.js").listStages | typeof import("./users.js").listUsers | typeof import("./users.js").getUser | typeof import("./notes.js").listNotes | typeof import("./notes.js").createNote | typeof import("./notes.js").updateNote | undefined;
/**
 * Get a tool schema by name
 */
export declare function getToolSchema(name: string): import("zod").ZodObject<{
    start: import("zod").ZodOptional<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    start?: number | undefined;
}, {
    limit?: number | undefined;
    start?: number | undefined;
}> | import("zod").ZodObject<{
    id: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
}, {
    id: number;
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
    id: import("zod").ZodNumber;
} & {
    include_fields: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    include_fields?: string | undefined;
}, {
    id: number;
    include_fields?: string | undefined;
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
    cursor: import("zod").ZodOptional<import("zod").ZodString>;
    limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
} & {
    filter_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    ids: import("zod").ZodOptional<import("zod").ZodString>;
    owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
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
}> | import("zod").ZodObject<{
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
}> | import("zod").ZodObject<{
    name: import("zod").ZodString;
    owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    visible_to: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodNumber, number, number>>;
    address: import("zod").ZodOptional<import("zod").ZodString>;
    label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
    add_time: import("zod").ZodOptional<import("zod").ZodString>;
    custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    id: import("zod").ZodNumber;
} & {
    name: import("zod").ZodOptional<import("zod").ZodString>;
    owner_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    visible_to: import("zod").ZodOptional<import("zod").ZodEnum<["1", "3", "5", "7"]>>;
    address: import("zod").ZodOptional<import("zod").ZodString>;
    label_ids: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
    custom_fields: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    term: import("zod").ZodString;
    exact_match: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
    limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    term: string;
    exact_match: boolean;
}, {
    term: string;
    limit?: number | undefined;
    exact_match?: boolean | undefined;
}> | import("zod").ZodObject<{
    id: import("zod").ZodNumber;
} & {
    start: import("zod").ZodOptional<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    id: number;
    start?: number | undefined;
}, {
    id: number;
    limit?: number | undefined;
    start?: number | undefined;
}> | import("zod").ZodObject<{
    start: import("zod").ZodOptional<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
} & {
    folder: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["inbox", "drafts", "sent", "archive"]>>>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    folder: "inbox" | "drafts" | "sent" | "archive";
    start?: number | undefined;
}, {
    limit?: number | undefined;
    start?: number | undefined;
    folder?: "inbox" | "drafts" | "sent" | "archive" | undefined;
}> | import("zod").ZodObject<{
    id: import("zod").ZodNumber;
} & {
    include_body: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    include_body: boolean;
}, {
    id: number;
    include_body?: boolean | undefined;
}> | import("zod").ZodObject<{
    entity_type: import("zod").ZodEnum<["organization", "deal", "person", "product", "activity", "project"]>;
    key: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
    key: string;
}, {
    entity_type: "deal" | "person" | "activity" | "organization" | "product" | "project";
    key: string;
}> | import("zod").ZodObject<{
    pipeline_id: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    pipeline_id?: number | undefined;
}, {
    pipeline_id?: number | undefined;
}> | import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}> | import("zod").ZodObject<{
    start: import("zod").ZodOptional<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
} & {
    deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    lead_id: import("zod").ZodOptional<import("zod").ZodString>;
    pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    sort: import("zod").ZodOptional<import("zod").ZodEnum<["id", "add_time", "update_time"]>>;
    sort_direction: import("zod").ZodOptional<import("zod").ZodEnum<["asc", "desc"]>>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    content: import("zod").ZodString;
    deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    lead_id: import("zod").ZodOptional<import("zod").ZodString>;
    pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | import("zod").ZodObject<{
    id: import("zod").ZodNumber;
} & {
    content: import("zod").ZodOptional<import("zod").ZodString>;
    deal_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    person_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    org_id: import("zod").ZodOptional<import("zod").ZodNumber>;
    lead_id: import("zod").ZodOptional<import("zod").ZodString>;
    pinned_to_deal_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    pinned_to_person_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
    pinned_to_organization_flag: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
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
}> | undefined;
export { dealTools } from "./deals.js";
export { personTools } from "./persons.js";
export { activityTools } from "./activities.js";
export { organizationTools } from "./organizations.js";
export { mailTools } from "./mail.js";
export { fieldTools } from "./fields.js";
export { pipelineTools } from "./pipelines.js";
export { userTools } from "./users.js";
export { noteTools } from "./notes.js";
//# sourceMappingURL=index.d.ts.map