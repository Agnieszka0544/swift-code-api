import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SwiftCode } from './models/SwiftCode.js';
import { SwiftCodeEntry } from './SwiftCodeEntry.js';

dotenv.config();

async function storeSwiftData(entries: SwiftCodeEntry[]) {
  try {
    // Clear existing data
    await SwiftCode.deleteMany({});

    // Insert parsed entries
    await SwiftCode.insertMany(entries);

    console.log(`Inserted ${entries.length} SWIFT code records using Mongoose.`);
  } catch (err) {
    console.error('Failed to store SWIFT data:', err);
  }
}

export default storeSwiftData;
