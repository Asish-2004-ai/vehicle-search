const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'vehicleBooking' });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('POST /api/vehicles', () => {
  it('create a new vehicle', async () => {
    const res = await request(app).post('/api/vehicles').send({
      name: 'Tata Ace',
      capacityKg: 800,
      tyres: 4,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Tata Ace');
  });

  it('reject', async () => {
    const res = await request(app).post('/api/vehicles').send({
      name: 'Test',
    });

    expect(res.statusCode).toBe(400);
  });
});
