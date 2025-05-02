import { SwiftCode } from './models/SwiftCode.js';
import { SwiftCodeEntry } from './types.js';

async function storeSwiftData(entries: SwiftCodeEntry[]) {
  try {
    await SwiftCode.deleteMany({});
    await SwiftCode.insertMany(entries);
    console.log(`Inserted ${entries.length} SWIFT code records using Mongoose.`);
  } catch (err) {
    console.error('Failed to store SWIFT data:', err);
  }
}

export default storeSwiftData;
