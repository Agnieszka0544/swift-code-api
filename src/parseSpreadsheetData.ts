import xlsx from 'xlsx'; 
import { SwiftCodeEntry } from './types.js';

function parseSwiftData(filePath: string): SwiftCodeEntry[] {
  const file = xlsx.readFile(filePath);
  const sheetName = file.SheetNames[0];
  const sheet = file.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json<{ [key: string]: string }>(sheet);

  return data.map((row): SwiftCodeEntry => {
    const swiftCode = row['SWIFT CODE'];
    return {
      countryISO2: row['COUNTRY ISO2 CODE'],
      swiftCode,
      codeType: row['CODE TYPE'],
      bankName: row['NAME'],
      address: row['ADDRESS'],
      town: row['TOWN NAME'],
      countryName: row['COUNTRY NAME'],
      timezone: row['TIME ZONE'],
      isHeadquarter: swiftCode.endsWith('XXX'),
      headquarterCode: swiftCode.substring(0, 8),
    };
  });
};

export default parseSwiftData;
