const XLSX = require("xlsx");
const path = require("path");

const generateErrorReport = (failedRows) => {

  const workbook =
    XLSX.utils.book_new();

  const reportData =
    failedRows.map((item) => ({

      Row:
        item.row,

      "Uniq-id":
        item.data?.["Uniq-id"] || "",

      "Student name":
        item.data?.["Student name"] || "",

      "Class":
        item.data?.["Class"] || "",

      "Section":
        item.data?.["Section"] || "",

      "Roll.no":
        item.data?.["Roll.no"] || "",

      "Admission ID":
        item.data?.["Admission ID"] || "",

      "Father name":
        item.data?.["Father name"] || "",

      "Father mobile number":
        item.data?.["Father mobile number"] || "",

      "Mother name":
        item.data?.["Mother name"] || "",

      "Mother mobile number":
        item.data?.["Mother mobile number"] || "",

      "Year of joining":
        item.data?.["Year of joining"] || "",

      "Adhar Number":
        item.data?.["Adhar Number"] || "",

      "Gender":
        item.data?.["Gender"] || "",

      "Date of Birth":
        item.data?.["Date of Birth"] || "",

      "Caste":
        item.data?.["Caste"] || "",

      "Communication Address":
        item.data?.["Communication Address"] || "",

      "Permanent Address":
        item.data?.["Permanent Address"] || "",

      "Errors":
        item.errors.join(", ")

    }));

  const worksheet =
    XLSX.utils.json_to_sheet(
      reportData
    );

  worksheet["!cols"] = [

    { wch: 8 },   // Row
    { wch: 12 },  // Uniq-id
    { wch: 25 },  // Student name
    { wch: 10 },  // Class
    { wch: 10 },  // Section
    { wch: 10 },  // Roll.no
    { wch: 18 },  // Admission ID
    { wch: 22 },  // Father name
    { wch: 20 },  // Father mobile
    { wch: 22 },  // Mother name
    { wch: 20 },  // Mother mobile
    { wch: 15 },  // Year
    { wch: 18 },  // Aadhaar
    { wch: 12 },  // Gender
    { wch: 15 },  // DOB
    { wch: 12 },  // Caste
    { wch: 35 },  // Communication
    { wch: 35 },  // Permanent
    { wch: 45 }   // Errors

  ];

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Error Report"
  );

  const fileName =
    `error_report_${Date.now()}.xlsx`;

  const filePath =
    path.join(
      "uploads",
      "error-reports",
      fileName
    );

  XLSX.writeFile(
    workbook,
    filePath
  );

  return fileName;

};

module.exports =
  generateErrorReport;