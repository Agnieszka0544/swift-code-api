import express from 'express';
import { SwiftCode } from '../models/SwiftCode.js';

const router = express.Router();

// // POST /v1/swift-codes/
// router.post('/', async (req, res) => {
//   try {
//     const swiftCodeEntry = new SwiftCode(req.body);
//     await swiftCodeEntry.save();
//     res.status(201).json(swiftCodeEntry);
//   } catch (err) {
//     let errorMessage = "Failed to create SWIFT code";
//     if (err instanceof Error) {
//       errorMessage = err.message;
//     }
//     res.status(400).json({ error: errorMessage });
//   }
// });


// GET /v1/swift-codes/:swiftCode

type BankEntry = {
  address: string,
  bankName: string,
  countryISO2: string,
  countryName: string,
  isHeadquarter: boolean,
  swiftCode: string,
}


router.get('/:swiftCode', async (req, res) => {
  try {
    const swiftCode = req.params.swiftCode;
    const entry = await SwiftCode.findOne({ swiftCode });

    if (!entry) {
      return res.status(404).json({ message: 'SWIFT code not found' });
    }

    const baseResponse: any = {
      address: entry.address,
      bankName: entry.bankName,
      countryISO2: entry.countryIso2Code,
      countryName: entry.country,
      isHeadquarter: entry.isHeadquarter,
      swiftCode: entry.swiftCode
    };

    if (entry.isHeadquarter) {
      const branches = await SwiftCode.find({
        headquarterCode: entry.swiftCode,
        swiftCode: { $ne: entry.swiftCode } // exclude the HQ itself
      });
      // console.log("branches:");
      // console.log(branches);

      baseResponse.branches = branches.map((branch) => ({
        address: branch.address,
        bankName: branch.bankName,
        countryISO2: branch.countryIso2Code,
        isHeadquarter: branch.isHeadquarter,
        swiftCode: branch.swiftCode
      }));
    } 

    res.json(baseResponse);

  } catch (err) {
    let errorMessage = "Failed to find SWIFT code";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
