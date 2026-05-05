/**
 * Zod schemas for Pipeline and Stage operations
 */
import { z } from "zod";
/**
 * List pipelines parameters (no params needed, returns all)
 */
export declare const ListPipelinesSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
/**
 * List stages parameters
 */
export declare const ListStagesSchema: z.ZodObject<{
    pipeline_id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pipeline_id?: number | undefined;
}, {
    pipeline_id?: number | undefined;
}>;
/**
 * Get stage parameters
 */
export declare const GetStageSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
/**
 * Type exports
 */
export type ListPipelinesParams = z.infer<typeof ListPipelinesSchema>;
export type ListStagesParams = z.infer<typeof ListStagesSchema>;
export type GetStageParams = z.infer<typeof GetStageSchema>;
//# sourceMappingURL=pipelines.d.ts.map