const XLSX = require("xlsx");

const parseExcel = (filePath) => {

  const workbook = XLSX.readFile(filePath);

  const sheetName = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json(
    worksheet,
    {
      defval: ""
    }
  );

  return rows.map((row) => {

    const cleanedRow = {};

    Object.keys(row).forEach((key) => {

      const cleanKey = key
        .replace(/\s+/g, " ")
        .trim();

      // Ignore Error column while re-uploading
      if (
        cleanKey.toLowerCase() === "errors" ||
        cleanKey.toLowerCase() === "error" ||
        cleanKey.toLowerCase() === "status"
      ) {
        return;
      }

      cleanedRow[cleanKey] = row[key];

    });

    return cleanedRow;

  });

};

module.exports = parseExcel;