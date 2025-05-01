import mongoose from 'mongoose';

const SwiftCodeSchema = new mongoose.Schema({
  countryIso2Code: { type: String, required: true },
  swiftCode: { type: String, required: true, unique: true },
  codeType: {type: String, required: true},
  bankName: { type: String, required: true },
  address: { type: String, required: true },
  town: { type: String, required : true },
  country: { type: String, required: true },
  timezone: { type: String, required: true },
  isHeadquarter: { type: Boolean, required: true },
  headquarterCode: { type: String, required: true },
}, { timestamps: true });

export const SwiftCode = mongoose.model('SwiftCode', SwiftCodeSchema, 'swift-codes');
