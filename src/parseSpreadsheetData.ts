import xlsx from 'xlsx'; 
import { SwiftCodeEntry } from './types';

function parseSwiftData(filePath: string): SwiftCodeEntry[] {
  const file = xlsx.readFile(filePath);
  const sheetName = file.SheetNames[0];
  const sheet = file.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json<{ [key: string]: string }>(sheet);

  return data.map((row): SwiftCodeEntry => {
    const swiftCode = row['SWIFT CODE'].toUpperCase();
    return {
      countryISO2: row['COUNTRY ISO2 CODE'].toUpperCase(),
      swiftCode,
      codeType: row['CODE TYPE'].toUpperCase(),
      bankName: row['NAME'].toUpperCase(),
      address: row['ADDRESS'].toUpperCase(),
      town: row['TOWN NAME'].toUpperCase(),
      countryName: row['COUNTRY NAME'].toUpperCase(),
      timezone: row['TIME ZONE'].toUpperCase(),
      isHeadquarter: swiftCode.endsWith('XXX'),
      headquarterCode: swiftCode.substring(0, 8),
    };
  });
};

export default parseSwiftData;
