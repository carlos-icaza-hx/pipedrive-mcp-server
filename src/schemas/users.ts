/**
 * Zod schemas for User operations
 */

import { z } from "zod";
import { IdParamSchema } from "./common.js";

/**
 * List users parameters
 */
export const ListUsersSchema = z.object({});

/**
 * Get user parameters
 */
export const GetUserSchema = IdParamSchema;

/**
 * Get current user (me) parameters
 */
export const GetCurrentUserSchema = z.object({});

/**
 * Type exports
 */
export type ListUsersParams = z.infer<typeof ListUsersSchema>;
export type GetUserParams = z.infer<typeof GetUserSchema>;
export type GetCurrentUserParams = z.infer<typeof GetCurrentUserSchema>;
