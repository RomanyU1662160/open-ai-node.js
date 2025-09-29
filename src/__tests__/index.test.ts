import request from 'supertest';
import { createApp } from '../server';
import { Application } from 'express';

describe('Express Server with Router Approach', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /', () => {
    it('should return welcome message with endpoints info', async () => {
      const response = await request(app).get('/').expect(200);

      expect(response.body.message).toBe(
        'Welcome to Express TypeScript Server!'
      );
      expect(response.body.version).toBe('1.0.0');
      expect(response.body.endpoints).toBeDefined();
      expect(response.body.endpoints.health).toBe('/health');
      expect(response.body.endpoints.api).toBe('/api');
    });
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request(app).get('/health').expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('Server is running!');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(app).get('/api/users').expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id', 1);
      expect(response.body[0]).toHaveProperty('name', 'John Doe');
      expect(response.body[0]).toHaveProperty('email', 'john@example.com');
    });
  });

  describe('GET /api/status', () => {
    it('should return API status information', async () => {
      const response = await request(app).get('/api/status').expect(200);

      expect(response.body.api).toBe('v1');
      expect(response.body.status).toBe('active');
      expect(response.body.endpoints).toContain('/users');
      expect(response.body.endpoints).toContain('/status');
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/nonexistent').expect(404);

      expect(response.body.error).toBe('Route not found');
      expect(response.body.path).toBe('/nonexistent');
      expect(response.body.method).toBe('GET');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});
