/**
 * Field metadata MCP tools for Pipedrive (v1 API)
 * These tools help discover custom field definitions and map hash keys to human-readable names.
 */

import { getClient } from "../client.js";
import {
  ListOrganizationFieldsSchema,
  ListDealFieldsSchema,
  ListPersonFieldsSchema,
  GetFieldSchema,
  type ListOrganizationFieldsParams,
  type ListDealFieldsParams,
  type ListPersonFieldsParams,
  type GetFieldParams,
} from "../schemas/fields.js";
import { buildPaginationParamsV1, extractPaginationV1 } from "../utils/pagination.js";
import { formatErrorForMcp } from "../utils/errors.js";
import { createListSummary } from "../utils/formatting.js";

/**
 * List organization fields
 */
export async function listOrganizationFields(params: ListOrganizationFieldsParams) {
  const client = getClient();

  const queryParams = buildPaginationParamsV1(params.start, params.limit);

  const response = await client.get<unknown[]>(
    "/organizationFields",
    queryParams,
    "v1"
  );

  if (!response.success || !response.data) {
    return {
      content: [{
        type: "text" as const,
        text: formatErrorForMcp(response.error!),
      }],
    };
  }

  const fields = response.data;
  const pagination = extractPaginationV1(response);

  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        summary: createListSummary("organization field", fields.length, pagination.has_more),
        data: fields,
        pagination: {
          next_start: pagination.next_cursor ? parseInt(pagination.next_cursor) : undefined,
          has_more: pagination.has_more,
        },
      }, null, 2),
    }],
  };
}

/**
 * List deal fields
 */
export async function listDealFields(params: ListDealFieldsParams) {
  const client = getClient();

  const queryParams = buildPaginationParamsV1(params.start, params.limit);

  const response = await client.get<unknown[]>(
    "/dealFields",
    queryParams,
    "v1"
  );

  if (!response.success || !response.data) {
    return {
      content: [{
        type: "text" as const,
        text: formatErrorForMcp(response.error!),
      }],
    };
  }

  const fields = response.data;
  const pagination = extractPaginationV1(response);

  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        summary: createListSummary("deal field", fields.length, pagination.has_more),
        data: fields,
        pagination: {
          next_start: pagination.next_cursor ? parseInt(pagination.next_cursor) : undefined,
          has_more: pagination.has_more,
        },
      }, null, 2),
    }],
  };
}

/**
 * List person fields
 */
export async function listPersonFields(params: ListPersonFieldsParams) {
  const client = getClient();

  const queryParams = buildPaginationParamsV1(params.start, params.limit);

  const response = await client.get<unknown[]>(
    "/personFields",
    queryParams,
    "v1"
  );

  if (!response.success || !response.data) {
    return {
      content: [{
        type: "text" as const,
        text: formatErrorForMcp(response.error!),
      }],
    };
  }

  const fields = response.data;
  const pagination = extractPaginationV1(response);

  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        summary: createListSummary("person field", fields.length, pagination.has_more),
        data: fields,
        pagination: {
          next_start: pagination.next_cursor ? parseInt(pagination.next_cursor) : undefined,
          has_more: pagination.has_more,
        },
      }, null, 2),
    }],
  };
}

/**
 * Get a single field by key
 */
export async function getField(params: GetFieldParams) {
  const client = getClient();

  // Map entity type to endpoint
  const endpointMap: Record<string, string> = {
    organization: "/organizationFields",
    deal: "/dealFields",
    person: "/personFields",
    product: "/productFields",
    activity: "/activityFields",
    project: "/projectFields",
  };

  const endpoint = endpointMap[params.entity_type];
  if (!endpoint) {
    return {
      content: [{
        type: "text" as const,
        text: `Error: Unknown entity type "${params.entity_type}". Valid types: organization, deal, person, product, activity, project`,
      }],
    };
  }

  // Get all fields and find by key
  const response = await client.get<Array<{ key: string; [k: string]: unknown }>>(
    endpoint,
    undefined,
    "v1"
  );

  if (!response.success || !response.data) {
    return {
      content: [{
        type: "text" as const,
        text: formatErrorForMcp(response.error!),
      }],
    };
  }

  const field = response.data.find(f => f.key === params.key);

  if (!field) {
    return {
      content: [{
        type: "text" as const,
        text: `Field not found: ${params.key} in ${params.entity_type} fields`,
      }],
    };
  }

  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        summary: `Field: ${params.key}`,
        data: field,
      }, null, 2),
    }],
  };
}

/**
 * Tool definitions for MCP registration
 */
export const fieldTools = [
  {
    name: "pipedrive_list_organization_fields",
    description: "List all organization field definitions, including custom fields. Use this to map 40-character field keys to human-readable names.",
    inputSchema: {
      type: "object" as const,
      properties: {
        start: { type: "number", description: "Pagination offset" },
        limit: { type: "number", description: "Number of items" },
      },
    },
    handler: listOrganizationFields,
    schema: ListOrganizationFieldsSchema,
  },
  {
    name: "pipedrive_list_deal_fields",
    description: "List all deal field definitions, including custom fields. Essential for understanding deal data structure.",
    inputSchema: {
      type: "object" as const,
      properties: {
        start: { type: "number", description: "Pagination offset" },
        limit: { type: "number", description: "Number of items" },
      },
    },
    handler: listDealFields,
    schema: ListDealFieldsSchema,
  },
  {
    name: "pipedrive_list_person_fields",
    description: "List all person field definitions, including custom fields. Use to understand contact data structure.",
    inputSchema: {
      type: "object" as const,
      properties: {
        start: { type: "number", description: "Pagination offset" },
        limit: { type: "number", description: "Number of items" },
      },
    },
    handler: listPersonFields,
    schema: ListPersonFieldsSchema,
  },
  {
    name: "pipedrive_get_field",
    description: "Get details of a specific field by its key. Useful for looking up what a 40-character hash field key means.",
    inputSchema: {
      type: "object" as const,
      properties: {
        entity_type: {
          type: "string",
          enum: ["organization", "deal", "person", "product", "activity", "project"],
          description: "Entity type the field belongs to",
        },
        key: { type: "string", description: "Field key (40-char hash for custom fields)" },
      },
      required: ["entity_type", "key"],
    },
    handler: getField,
    schema: GetFieldSchema,
  },
];
