import mongoose from 'mongoose';
import { SwiftCode } from '../../src/models/SwiftCode';

describe('SwiftCode Model Unit Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://mongo:27017/swift-codes');
  }, 10000);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should validate a proper SwiftCode document', async () => {
    const doc = new SwiftCode({
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
    });

    await expect(doc.validate()).resolves.toBeUndefined();
  });

  it('should fail validation if required fields are missing', async () => {
    const doc = new SwiftCode({
      swiftCode: "MISSINGFIELDS"
    });

    await expect(doc.validate()).rejects.toThrow();
  });
});
