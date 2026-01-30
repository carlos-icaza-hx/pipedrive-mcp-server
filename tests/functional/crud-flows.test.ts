/**
 * Functional tests for CRUD operation flows
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setupValidEnv } from '../helpers/mockEnv.js';
import {
  mockFetch,
  mockApiSuccess,
  fixtures,
  paginationFixtures,
  createMockFetch,
  createMockResponse,
} from '../helpers/mockFetch.js';

describe('CRUD Flows', () => {
  beforeEach(() => {
    setupValidEnv();
    vi.unstubAllGlobals();
  });

  describe('Deal CRUD Cycle', () => {
    it('should complete full deal CRUD cycle', async () => {
      // Import tools
      const { listDeals, createDeal, getDeal, updateDeal, deleteDeal } =
        await import('../../src/tools/deals.js');

      // Step 1: Create deal
      let mockFn = mockApiSuccess({ ...fixtures.deal, id: 100, title: 'New Enterprise Deal' });
      const createResult = await createDeal({
        title: 'New Enterprise Deal',
        value: 50000,
        currency: 'USD',
      });
      let parsed = JSON.parse(createResult.content[0].text);
      expect(parsed.summary).toBe('Deal created');
      expect(parsed.data.title).toBe('New Enterprise Deal');
      const dealId = parsed.data.id;

      // Step 2: Get created deal
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.deal, id: dealId, title: 'New Enterprise Deal' });
      const getResult = await getDeal({ id: dealId });
      parsed = JSON.parse(getResult.content[0].text);
      expect(parsed.data.id).toBe(dealId);

      // Step 3: Update deal
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.deal, id: dealId, title: 'Updated Deal', value: 75000 });
      const updateResult = await updateDeal({ id: dealId, title: 'Updated Deal', value: 75000 });
      parsed = JSON.parse(updateResult.content[0].text);
      expect(parsed.summary).toContain('updated');

      // Step 4: List deals to verify
      vi.unstubAllGlobals();
      mockFetch({
        data: [{ ...fixtures.deal, id: dealId, title: 'Updated Deal' }],
        additional_data: paginationFixtures.v2NoMore,
      });
      const listResult = await listDeals({});
      parsed = JSON.parse(listResult.content[0].text);
      expect(parsed.data.some((d: any) => d.id === dealId)).toBe(true);

      // Step 5: Delete deal
      vi.unstubAllGlobals();
      mockApiSuccess({ id: dealId });
      const deleteResult = await deleteDeal({ id: dealId });
      parsed = JSON.parse(deleteResult.content[0].text);
      expect(parsed.summary).toContain('deleted');
    });
  });

  describe('Person CRUD Cycle', () => {
    it('should complete full person CRUD cycle', async () => {
      const { listPersons, createPerson, getPerson, updatePerson, deletePerson } =
        await import('../../src/tools/persons.js');

      // Create
      mockApiSuccess({ ...fixtures.person, id: 200, name: 'John Smith' });
      let result = await createPerson({
        name: 'John Smith',
        email: [{ value: 'john.smith@example.com', primary: true }],
      });
      let parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toBe('Person created');
      const personId = parsed.data.id;

      // Get
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.person, id: personId, name: 'John Smith' });
      result = await getPerson({ id: personId });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.data.id).toBe(personId);

      // Update
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.person, id: personId, name: 'John M. Smith' });
      result = await updatePerson({ id: personId, name: 'John M. Smith' });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toContain('updated');

      // Delete
      vi.unstubAllGlobals();
      mockApiSuccess({ id: personId });
      result = await deletePerson({ id: personId });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toContain('deleted');
    });
  });

  describe('Activity CRUD Cycle', () => {
    it('should complete full activity CRUD cycle', async () => {
      const { listActivities, createActivity, getActivity, updateActivity, deleteActivity } =
        await import('../../src/tools/activities.js');

      // Create
      mockApiSuccess({ ...fixtures.activity, id: 300, subject: 'Client Call' });
      let result = await createActivity({
        subject: 'Client Call',
        type: 'call',
        due_date: '2024-06-15',
        due_time: '10:00',
      });
      let parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toBe('Activity created');
      const activityId = parsed.data.id;

      // Get
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.activity, id: activityId, subject: 'Client Call' });
      result = await getActivity({ id: activityId });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.data.id).toBe(activityId);

      // Update - mark as done
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.activity, id: activityId, done: true });
      result = await updateActivity({ id: activityId, done: true });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toContain('updated');

      // Delete
      vi.unstubAllGlobals();
      mockApiSuccess({ id: activityId });
      result = await deleteActivity({ id: activityId });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toContain('deleted');
    });
  });

  describe('Organization CRUD Cycle', () => {
    it('should complete full organization CRUD cycle', async () => {
      const { listOrganizations, createOrganization, getOrganization, updateOrganization, deleteOrganization } =
        await import('../../src/tools/organizations.js');

      // Create
      mockApiSuccess({ ...fixtures.organization, id: 400, name: 'TechCorp Inc' });
      let result = await createOrganization({
        name: 'TechCorp Inc',
        address: '100 Tech Way',
      });
      let parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toBe('Organization created');
      const orgId = parsed.data.id;

      // Get
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.organization, id: orgId, name: 'TechCorp Inc' });
      result = await getOrganization({ id: orgId });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.data.id).toBe(orgId);

      // Update
      vi.unstubAllGlobals();
      mockApiSuccess({ ...fixtures.organization, id: orgId, name: 'TechCorp International' });
      result = await updateOrganization({ id: orgId, name: 'TechCorp International' });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toContain('updated');

      // Delete
      vi.unstubAllGlobals();
      mockApiSuccess({ id: orgId });
      result = await deleteOrganization({ id: orgId });
      parsed = JSON.parse(result.content[0].text);
      expect(parsed.summary).toContain('deleted');
    });
  });

  describe('Related Entity Linking', () => {
    it('should create deal linked to person and organization', async () => {
      const { createDeal } = await import('../../src/tools/deals.js');
      const mockFn = mockApiSuccess({
        ...fixtures.deal,
        id: 500,
        person_id: 10,
        org_id: 20,
        person_name: 'John Doe',
        org_name: 'Acme Corp',
      });

      const result = await createDeal({
        title: 'Linked Deal',
        value: 25000,
        person_id: 10,
        org_id: 20,
      });

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.data.person_id).toBe(10);
      expect(parsed.data.org_id).toBe(20);

      // Verify body contains linked IDs
      const [, options] = mockFn.mock.calls[0];
      const body = JSON.parse(options.body);
      expect(body.person_id).toBe(10);
      expect(body.org_id).toBe(20);
    });

    it('should create activity linked to deal and person', async () => {
      const { createActivity } = await import('../../src/tools/activities.js');
      const mockFn = mockApiSuccess({
        ...fixtures.activity,
        id: 600,
        deal_id: 100,
        person_id: 50,
      });

      const result = await createActivity({
        subject: 'Follow up',
        type: 'task',
        deal_id: 100,
        person_id: 50,
      });

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.data.deal_id).toBe(100);
      expect(parsed.data.person_id).toBe(50);
    });
  });
});
