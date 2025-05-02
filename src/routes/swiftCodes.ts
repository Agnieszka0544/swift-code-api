import express from 'express';
import { SwiftCode } from '../models/SwiftCode.js';

const router = express.Router();

// POST /v1/swift-codes/
router.post('/', async (req, res) => {
  try {
    const swiftCodeEntry = new SwiftCode(req.body);
    await swiftCodeEntry.save();
    res.status(201).json({ message: "Successfully added" });
  } catch (err) {
    let errorMessage = "Failed to create SWIFT code";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});


// GET /v1/swift-codes/:swiftCode
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
      countryISO2: entry.countryISO2,
      countryName: entry.countryName,
      isHeadquarter: entry.isHeadquarter,
      swiftCode: entry.swiftCode
    };

    if (entry.isHeadquarter) {
      const branches = await SwiftCode.find({
        headquarterCode: entry.headquarterCode,
        swiftCode: { $ne: entry.swiftCode } // exclude the HQ itself
      });

      const branchesResponse = branches.map((branch) => {
        return {
          address: branch.address,
          bankName: branch.bankName,
          countryISO2: branch.countryISO2,
          isHeadquarter: branch.isHeadquarter,
          swiftCode: branch.swiftCode
        };
      });

      baseResponse.branches = branchesResponse;
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

router.get('/country/:countryISO2code', async (req, res) => {
  try {
    const countryISO2code = req.params.countryISO2code;
    const entry = await SwiftCode.findOne({ countryIso2Code: countryISO2code });

    if (!entry) {
      return res.status(404).json({ message: 'SWIFT code not found' });
    }

    const baseResponse: any = {
      countryISO2: entry.countryISO2,
      countryName: entry.countryName,
    };

    const branches = await SwiftCode.find({
      countryIso2Code: countryISO2code,
    });

    const branchesResponse = branches.map((branch) => {
      return {
        address: branch.address,
        bankName: branch.bankName,
        countryISO2: branch.countryISO2,
        isHeadquarter: branch.isHeadquarter,
        swiftCode: branch.swiftCode
      };
    });

    baseResponse.swiftCodes = branchesResponse;

    res.json(baseResponse);

  } catch (err) {
    let errorMessage = "Failed to find SWIFT code";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});


// DELETE /v1/swift-codes/
router.delete('/:swiftCode', async (req, res) => {
  try {
    await SwiftCode.deleteOne({ swiftCode: req.params.swiftCode });    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    let errorMessage = "Failed to delete SWIFT code";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});



export default router;
