const request = require('supertest');
const app = require('../server'); // Export your express app from server.js
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'test-db' });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('POST /api/vehicles', () => {
  it('should create a new vehicle', async () => {
    const res = await request(app).post('/api/vehicles').send({
      name: 'Tata Ace',
      capacityKg: 800,
      tyres: 4,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Tata Ace');
  });

  it('should reject if fields are missing', async () => {
    const res = await request(app).post('/api/vehicles').send({
      name: 'Test',
    });

    expect(res.statusCode).toBe(400);
  });
});
