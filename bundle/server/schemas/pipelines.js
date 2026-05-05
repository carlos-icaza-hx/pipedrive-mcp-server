/**
 * Zod schemas for Pipeline and Stage operations
 */
import { z } from "zod";
import { IdParamSchema } from "./common.js";
/**
 * List pipelines parameters (no params needed, returns all)
 */
export const ListPipelinesSchema = z.object({});
/**
 * List stages parameters
 */
export const ListStagesSchema = z.object({
    pipeline_id: z.number().int().positive().optional()
        .describe("Filter by pipeline ID (if not provided, returns all stages)"),
});
/**
 * Get stage parameters
 */
export const GetStageSchema = IdParamSchema;
//# sourceMappingURL=pipelines.js.map