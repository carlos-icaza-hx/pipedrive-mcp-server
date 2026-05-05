/**
 * Pipeline and Stage MCP tools for Pipedrive
 */
import { type ListPipelinesParams, type ListStagesParams, type GetStageParams } from "../schemas/pipelines.js";
/**
 * List all pipelines
 */
export declare function listPipelines(_params: ListPipelinesParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * List stages, optionally filtered by pipeline
 */
export declare function listStages(params: ListStagesParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Get a single stage by ID
 */
export declare function getStage(params: GetStageParams): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
/**
 * Tool definitions for MCP registration
 */
export declare const pipelineTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pipeline_id?: undefined;
            id?: undefined;
        };
        required?: undefined;
    };
    handler: typeof listPipelines;
    schema: import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>;
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
    handler: typeof listStages;
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
            id: {
                type: string;
                description: string;
            };
            pipeline_id?: undefined;
        };
        required: string[];
    };
    handler: typeof getStage;
    schema: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
})[];
//# sourceMappingURL=pipelines.d.ts.map