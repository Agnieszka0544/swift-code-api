import mongoose from 'mongoose';

const SwiftCodeSchema = new mongoose.Schema({
  countryISO2: { type: String, required: true },
  swiftCode: { type: String, required: true, unique: true },
  codeType: {type: String },
  bankName: { type: String, required: true },
  address: { type: String, required: true },
  town: { type: String },
  countryName: { type: String, required: true },
  timezone: { type: String },
  isHeadquarter: { type: Boolean, required: true },
  headquarterCode: { type: String },
}, { timestamps: true });

export const SwiftCode = mongoose.model('SwiftCode', SwiftCodeSchema, 'swift-codes');
