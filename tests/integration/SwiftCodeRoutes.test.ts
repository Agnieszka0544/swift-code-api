import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bodyParser from 'body-parser';
import swiftCodeRoutes from '../../src/routes/swiftCodes';
import { SwiftCode } from '../../src/models/SwiftCode';

let mongod;
let app: ReturnType<typeof express>;

const sampleData = {
  countryISO2: "PL",
  swiftCode: "BAPCGB22999",
  codeType: "BIC11",
  bankName: "Bank",
  address: " ",
  town: "Kraków",
  countryName: "Poland",
  timezone: "Europe/Warsaw",
  isHeadquarter: false,
  headquarterCode: "BARCGB22"
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect('mongodb://mongo:27017/swift-codes');

  app = express();
  app.use(bodyParser.json());
  app.use('/v1/swift-codes', swiftCodeRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  await SwiftCode.deleteMany();
});

describe('SWIFT Code Integration Tests', () => {
  it('POST / should add a swift code entry', async () => {
    const res = await request(app)
      .post('/v1/swift-codes')
      .send(sampleData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Successfully added');
  });

  it('GET /:swiftCode should retrieve data', async () => {
    await new SwiftCode(sampleData).save();

    const res = await request(app).get(`/v1/swift-codes/${sampleData.swiftCode}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.bankName).toBe(sampleData.bankName);
  });

  it('GET /country/:code should return all from country', async () => {
    await new SwiftCode(sampleData).save();

    const res = await request(app).get(`/v1/swift-codes/country/${sampleData.countryISO2}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.swiftCodes.length).toBe(1);
  });

  it('DELETE /:swiftCode should delete the entry', async () => {
    await new SwiftCode(sampleData).save();

    const res = await request(app).delete(`/v1/swift-codes/${sampleData.swiftCode}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Successfully deleted');
  });
});
