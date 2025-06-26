const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

let vehicleId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'test-db' });
  await Vehicle.deleteMany();
  await Booking.deleteMany();

  const vehicle = await Vehicle.create({ name: 'Mahindra', capacityKg: 1000, tyres: 6 });
  vehicleId = vehicle._id;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('POST /api/bookings', () => {
  it('should create a booking if no conflict', async () => {
    const res = await request(app).post('/api/bookings').send({
      vehicleId,
      fromPincode: '123456',
      toPincode: '123460',
      startTime: '2025-06-25T10:00:00Z',
      customerId: 'cust1',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.vehicleId).toBe(vehicleId.toString());
  });

  it('should reject overlapping booking', async () => {
    const res = await request(app).post('/api/bookings').send({
      vehicleId,
      fromPincode: '123456',
      toPincode: '123460',
      startTime: '2025-06-25T10:30:00Z', // overlaps
      customerId: 'cust2',
    });

    expect(res.statusCode).toBe(409);
  });
});
