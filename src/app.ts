import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/swiftCodes';
import parseSwiftData from './parseSpreadsheetData';
import storeSwiftData from './dataInserting';
import path from 'path';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/v1/swift-codes', router);

const filePath = path.resolve(__dirname, '../Interns_2025_SWIFT_CODES.xlsx');

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB, MongoUri:', process.env.MONGO_URI)
    const data = parseSwiftData(filePath);
    storeSwiftData(data);
  })
  .catch(err => console.error('MongoDB connection error:', err));


export default app;
