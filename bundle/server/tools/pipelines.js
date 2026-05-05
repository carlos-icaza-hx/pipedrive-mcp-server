/**
 * Pipeline and Stage MCP tools for Pipedrive
 */
import { getClient } from "../client.js";
import { ListPipelinesSchema, ListStagesSchema, GetStageSchema, } from "../schemas/pipelines.js";
import { formatErrorForMcp } from "../utils/errors.js";
/**
 * List all pipelines
 */
export async function listPipelines(_params) {
    const client = getClient();
    // Uses v1 API for pipelines
    const response = await client.get("/pipelines", undefined, "v1");
    if (!response.success || !response.data) {
        return {
            content: [{
                    type: "text",
                    text: formatErrorForMcp(response.error || {
                        error: {
                            code: "API_ERROR",
                            message: "Unknown API error",
                            suggestion: "Check your API key and network connection"
                        }
                    }),
                }],
        };
    }
    const pipelines = response.data;
    return {
        content: [{
                type: "text",
                text: JSON.stringify({
                    summary: `Found ${pipelines.length} pipeline${pipelines.length !== 1 ? "s" : ""}.`,
                    data: pipelines,
                }, null, 2),
            }],
    };
}
/**
 * List stages, optionally filtered by pipeline
 */
export async function listStages(params) {
    const client = getClient();
    const queryParams = new URLSearchParams();
    if (params.pipeline_id) {
        queryParams.set("pipeline_id", String(params.pipeline_id));
    }
    // Uses v1 API for stages
    const response = await client.get("/stages", queryParams.toString() ? queryParams : undefined, "v1");
    if (!response.success || !response.data) {
        return {
            content: [{
                    type: "text",
                    text: formatErrorForMcp(response.error || {
                        error: {
                            code: "API_ERROR",
                            message: "Unknown API error",
                            suggestion: "Check your API key and network connection"
                        }
                    }),
                }],
        };
    }
    const stages = response.data;
    const summary = params.pipeline_id
        ? `Found ${stages.length} stage${stages.length !== 1 ? "s" : ""} in pipeline ${params.pipeline_id}.`
        : `Found ${stages.length} stage${stages.length !== 1 ? "s" : ""}.`;
    return {
        content: [{
                type: "text",
                text: JSON.stringify({
                    summary,
                    data: stages,
                }, null, 2),
            }],
    };
}
/**
 * Get a single stage by ID
 */
export async function getStage(params) {
    const client = getClient();
    const response = await client.get(`/stages/${params.id}`, undefined, "v1");
    if (!response.success || !response.data) {
        return {
            content: [{
                    type: "text",
                    text: formatErrorForMcp(response.error || {
                        error: {
                            code: "API_ERROR",
                            message: "Unknown API error",
                            suggestion: "Check your API key and network connection"
                        }
                    }),
                }],
        };
    }
    return {
        content: [{
                type: "text",
                text: JSON.stringify({
                    summary: `Stage ${params.id}`,
                    data: response.data,
                }, null, 2),
            }],
    };
}
/**
 * Tool definitions for MCP registration
 */
export const pipelineTools = [
    {
        name: "pipedrive_list_pipelines",
        description: "List all sales pipelines in Pipedrive. Pipelines contain stages that deals move through.",
        inputSchema: {
            type: "object",
            properties: {},
        },
        handler: listPipelines,
        schema: ListPipelinesSchema,
    },
    {
        name: "pipedrive_list_stages",
        description: "List all stages, optionally filtered by pipeline. Stages represent steps in the sales process.",
        inputSchema: {
            type: "object",
            properties: {
                pipeline_id: { type: "number", description: "Filter by pipeline ID (returns all stages if not specified)" },
            },
        },
        handler: listStages,
        schema: ListStagesSchema,
    },
    {
        name: "pipedrive_get_stage",
        description: "Get details of a specific stage by ID.",
        inputSchema: {
            type: "object",
            properties: {
                id: { type: "number", description: "Stage ID" },
            },
            required: ["id"],
        },
        handler: getStage,
        schema: GetStageSchema,
    },
];
//# sourceMappingURL=pipelines.js.map