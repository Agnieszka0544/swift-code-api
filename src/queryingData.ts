import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;
const DATABASE_NAME = 'swift-codes';
const COLLECTION_NAME = 'swift-codes';


async function findByCode(swiftCode: string) {
    await mongoose.connect(process.env.MONGO_URI!);
    
    // const client = new MongoClient(MONGO_URI);
    // await client.connect();
    // const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);

    const SwiftCode = mongoose.model('SwiftCode');
    const result = await SwiftCode.findOne({ swiftCode: swiftCode.toUpperCase() });
    console.log(result);
    
    // await client.close();
  
  
    // const result = await collection.findOne({ code: swiftCode.toUpperCase() });
    // console.log(result);
  
    // await client.close();
  }
  
  async function findByCountry(iso2: string) {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
  
    const results = await collection.find({ countryCode: iso2.toUpperCase() }).toArray();
    console.log(results);
  
    await client.close();
  }
  