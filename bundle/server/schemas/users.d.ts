/**
 * Zod schemas for User operations
 */
import { z } from "zod";
/**
 * List users parameters
 */
export declare const ListUsersSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
/**
 * Get user parameters
 */
export declare const GetUserSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Get current user (me) parameters
 */
export declare const GetCurrentUserSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
/**
 * Type exports
 */
export type ListUsersParams = z.infer<typeof ListUsersSchema>;
export type GetUserParams = z.infer<typeof GetUserSchema>;
export type GetCurrentUserParams = z.infer<typeof GetCurrentUserSchema>;
//# sourceMappingURL=users.d.ts.map