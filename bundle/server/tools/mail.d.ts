/**
 * Mail/Email-related MCP tools for Pipedrive (v1 API)
 * These tools provide access to email communication for analyzing customer engagement.
 */
import { type GetPersonEmailsParams, type GetDealEmailsParams, type ListMailThreadsParams, type GetMailThreadParams, type GetMailMessageParams } from "../schemas/mail.js";
/**
 * Get mail messages for a person
 */
export declare function getPersonEmails(params: GetPersonEmailsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get mail messages for a deal
 */
export declare function getDealEmails(params: GetDealEmailsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * List mail threads by folder
 */
export declare function listMailThreads(params: ListMailThreadsParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a mail thread with its messages
 */
export declare function getMailThread(params: GetMailThreadParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single mail message with full body
 */
export declare function getMailMessage(params: GetMailMessageParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const mailTools: ({
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
    handler: typeof getPersonEmails;
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
    handler: typeof listMailThreads;
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
            start?: undefined;
            limit?: undefined;
            folder?: undefined;
            include_body?: undefined;
        };
        required: string[];
    };
    handler: typeof getMailThread;
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
    handler: typeof getMailMessage;
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
})[];
//# sourceMappingURL=mail.d.ts.map