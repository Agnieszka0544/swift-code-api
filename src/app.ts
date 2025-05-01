import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/swiftCodes.js';
import parseSwiftData from './parseSpreadsheetData.js';
import storeSwiftData from './dataInserting.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

dotenv.config();
const app = express();
// const bodyParser = require("body-parser")


app.use(express.json());
app.use('/v1/swift-codes', router);
// app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB, MongoUri:', process.env.MONGO_URI)
    const data = parseSwiftData(filePath);
    storeSwiftData(data);
  })
  .catch(err => console.error('MongoDB connection error:', err));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../Interns_2025_SWIFT_CODES.xlsx');


export default app;
