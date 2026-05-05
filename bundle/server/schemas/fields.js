/**
 * Zod schemas for Field metadata operations (v1 API)
 */
import { z } from "zod";
import { PaginationParamsV1Schema } from "./common.js";
/**
 * Field entity types
 */
export const FieldEntityTypeSchema = z.enum(["organization", "deal", "person", "product", "activity", "project"])
    .describe("Entity type to get fields for");
/**
 * List organization fields parameters
 */
export const ListOrganizationFieldsSchema = PaginationParamsV1Schema;
/**
 * List deal fields parameters
 */
export const ListDealFieldsSchema = PaginationParamsV1Schema;
/**
 * List person fields parameters
 */
export const ListPersonFieldsSchema = PaginationParamsV1Schema;
/**
 * Get field by key parameters
 */
export const GetFieldSchema = z.object({
    entity_type: FieldEntityTypeSchema
        .describe("Entity type (organization, deal, person, etc.)"),
    key: z.string()
        .describe("Field key (40-character hash for custom fields, or standard field name)"),
});
//# sourceMappingURL=fields.js.map