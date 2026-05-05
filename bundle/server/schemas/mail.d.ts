/**
 * Zod schemas for Mail/Email-related operations (v1 API)
 */
import { z } from "zod";
/**
 * Mail folder types
 */
export declare const MailFolderSchema: z.ZodEnum<["inbox", "drafts", "sent", "archive"]>;
/**
 * Get person emails parameters
 */
export declare const GetPersonEmailsSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    id: number;
    start?: number | undefined;
}, {
    id: number;
    limit?: number | undefined;
    start?: number | undefined;
}>;
/**
 * Get deal emails parameters
 */
export declare const GetDealEmailsSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    id: number;
    start?: number | undefined;
}, {
    id: number;
    limit?: number | undefined;
    start?: number | undefined;
}>;
/**
 * List mail threads parameters
 */
export declare const ListMailThreadsSchema: z.ZodObject<{
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
} & {
    folder: z.ZodDefault<z.ZodOptional<z.ZodEnum<["inbox", "drafts", "sent", "archive"]>>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    folder: "inbox" | "drafts" | "sent" | "archive";
    start?: number | undefined;
}, {
    limit?: number | undefined;
    start?: number | undefined;
    folder?: "inbox" | "drafts" | "sent" | "archive" | undefined;
}>;
/**
 * Get mail thread parameters
 */
export declare const GetMailThreadSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Get mail message parameters
 */
export declare const GetMailMessageSchema: z.ZodObject<{
    id: z.ZodNumber;
} & {
    include_body: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    include_body: boolean;
}, {
    id: number;
    include_body?: boolean | undefined;
}>;
/**
 * Type exports
 */
export type GetPersonEmailsParams = z.infer<typeof GetPersonEmailsSchema>;
export type GetDealEmailsParams = z.infer<typeof GetDealEmailsSchema>;
export type ListMailThreadsParams = z.infer<typeof ListMailThreadsSchema>;
export type GetMailThreadParams = z.infer<typeof GetMailThreadSchema>;
export type GetMailMessageParams = z.infer<typeof GetMailMessageSchema>;
//# sourceMappingURL=mail.d.ts.map