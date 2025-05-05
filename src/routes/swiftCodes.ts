import express from 'express';
import { SwiftCode } from '../models/SwiftCode';
import { Request, Response } from 'express';

const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/',   
  [
    body('address').isString().withMessage('Address must be a string'),
    body('bankName').isString().withMessage('Bank name must be a string'),
    body('countryISO2').isString().isLength({ min: 2, max: 2 }).withMessage('Country ISO2 must be a 2-letter string'),
    body('countryName').isString().withMessage('Country name must be a string'),
    body('isHeadquarter').isBoolean().withMessage('isHeadquarter must be a boolean'),
    body('swiftCode').isString().withMessage('SWIFT code must be a string'),
  ], 
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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


router.get('/:swiftCode', async (req, res) => {
  try {
    const swiftCode = req.params.swiftCode;
    const entry = await SwiftCode.findOne({ swiftCode });

    if (!entry) {
      return res.status(404).json({ message: 'SWIFT code not found' });
    }

    const response: any = {
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
        swiftCode: { $ne: entry.swiftCode }
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

      response.branches = branchesResponse;
    } 

    res.json(response);

  } catch (err) {
    let errorMessage = "Failed to find SWIFT code";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/country/:countryISO2', async (req, res) => {
  try {
    const countryISO2 = req.params.countryISO2;
    const entry = await SwiftCode.findOne({ countryISO2 });

    if (!entry) {
      return res.status(404).json({ message: 'SWIFT code not found' });
    }

    const response: any = {
      countryISO2: entry.countryISO2,
      countryName: entry.countryName,
    };

    const branches = await SwiftCode.find({
      countryISO2,
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

    response.swiftCodes = branchesResponse;

    res.json(response);

  } catch (err) {
    let errorMessage = "Failed to find SWIFT code";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});


router.delete('/:swiftCode', async (req, res) => {
  try {
    await SwiftCode.deleteOne({ swiftCode: req.params.swiftCode });    
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    let errorMessage = "Failed to delete SWIFT code";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});


export default router;
