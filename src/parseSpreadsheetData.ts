import xlsx from 'xlsx'; // ESModule-style


type SwiftCodeEntry = {
    countryIso2Code: string,
    swiftCode: string
    codeType: string,
    bankName: string,
    address: string,
    town: string,
    country: string,
    timezone: string,
    isHeadquarter: boolean;
    headquarterCode: string;
};

function parseSwiftData(filePath: string): SwiftCodeEntry[] {
  const file = xlsx.readFile(filePath);
  const sheetName = file.SheetNames[0];
  // console.log(file.SheetNames[0]);
  const sheet = file.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json<{ [key: string]: string }>(sheet);
  // console.log(data);

  const results: SwiftCodeEntry[] = data.map((row) => {
    const countryIso2Code: string = row['COUNTRY ISO2 CODE'];
    const swiftCode: string = row['SWIFT CODE'];
    const codeType: string = row['CODE TYPE'];
    const bankName: string = row['NAME'];
    const address: string = row['ADDRESS'];
    const town: string = row['TOWN NAME'];
    const country: string = row['COUNTRY NAME'];
    const timezone: string = row['TIME ZONE'];
    const isHeadquarter = swiftCode.endsWith('XXX');
    const headquarterCode = swiftCode.substring(0, 8);


    return {
      countryIso2Code,
      swiftCode,
      codeType,
      bankName,
      address,
      town,
      country,
      timezone,
      isHeadquarter,
      headquarterCode
    };
  });

  return results;
}

export default parseSwiftData;