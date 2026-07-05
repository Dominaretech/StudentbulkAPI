const parseExcel = require("../utils/excelParser");

const validateStudentRow = require("../validators/student.validator");

const generateUniqId = require("../utils/uniqIdGenerator");

const generateErrorReport = require("../utils/errorReportGenerator");

const {
  createUploadSession,
  getUploadSession,
  deleteUploadSession,
} = require("../utils/uploadStore");

const studentRepository = require("../repositories/student.repository");

const studentService = require("../services/student.service");
// Middleware
const asyncHandler = require("../middleware/asyncHandler");

// Utils
const ApiError = require("../utils/ApiError");

const { successResponse } = require("../utils/response");

const { exportStudentsToExcel } = require("../utils/excelExport");

// Preview student bulk upload
const previewUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError("Excel file required", 400);
  }

  // Read Excel rows
  const rows = parseExcel(req.file.path);

  // Store valid and failed rows
  const validRows = [];

  const failedRows = [];

  // Track duplicate values in Excel
  const admissionSet = new Set();

  const aadhaarSet = new Set();

  // Validate each row
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    // Validate required fields
    const validation = validateStudentRow(row);

    const rowErrors = [];

    if (!validation.isValid) {
      rowErrors.push(...validation.errors);
    }

    // Check duplicate Admission ID in Excel
    const admissionId = row["Admission ID"];

    if (admissionSet.has(admissionId)) {
      rowErrors.push("Duplicate Admission ID in Excel");
    } else {
      admissionSet.add(admissionId);
    }

    // Check duplicate Aadhaar in Excel
    const aadhaar = row["Adhar Number"];

    if (aadhaarSet.has(aadhaar)) {
      rowErrors.push("Duplicate Aadhaar in Excel");
    } else {
      aadhaarSet.add(aadhaar);
    }

    // Generate Unique ID
    const uniqId = generateUniqId(row["Student name"], admissionId);

    // Check duplicates in Database
    const dbErrors = await studentService.validateDuplicates(row, uniqId);

    rowErrors.push(...dbErrors);

    // Failed Row
    if (rowErrors.length > 0) {
      failedRows.push({
        row: index + 4,

        errors: rowErrors,

        data: row,
      });

      continue;
    }

    // Valid Row
    validRows.push({
      ...row,

      uniqId,
    });
  }
  let errorReport = null;

  if (failedRows.length > 0) {
    errorReport = generateErrorReport(failedRows);
  }

  console.log("================================");
  console.log("Valid Rows:", validRows.length);
  console.log("Failed Rows:", failedRows.length);
  console.log("================================");

  const uploadId = createUploadSession(validRows);

  console.log("========================");
  console.dir(failedRows, { depth: null });
  console.log("========================");

  return successResponse(
    res,

    {
      uploadId,

      totalRows: rows.length,

      successCount: validRows.length,

      failedCount: failedRows.length,

      failedRows,

      errorReport,
    },

    "Preview generated successfully",
  );
});

// Confirm student bulk upload
const confirmUpload = asyncHandler(async (req, res) => {
  const { uploadId } = req.body;

  if (!uploadId) {
    throw new ApiError("uploadId required", 400);
  }

  const students = getUploadSession(uploadId);

  if (!students) {
    throw new ApiError("Upload session expired", 404);
  }

  console.log("================================");
  console.log("Students In Session:", students.length);
  console.log("================================");

  const mappedStudents = students.map((student) => ({
    uniqId: student.uniqId,

    studentName: student["Student name"],

    className: student["Class"],

    section: student["Section"],

    rollNo: student["Roll.no"],

    admissionId: student["Admission ID"],

    fatherName: student["Father name"],

    fatherMobileNumber: student["Father mobile number"],

    motherName: student["Mother name"],

    motherMobileNumber: student["Mother mobile number"],

    yearOfJoining: student["Year of joining"],

    aadhaarNumber: student["Adhar Number"],

    gender: student["Gender"],

    dateOfBirth: student["Date of Birth"],

    caste: student["Caste"],

    communicationAddress: student["Communication Address"],

    permanentAddress: student["Permanent Address"],
  }));

  const insertedStudents =
    await studentRepository.bulkInsertStudents(mappedStudents);

  console.log("Mapped Students:");
  console.dir(mappedStudents, { depth: null });

  console.log("Inserted Students:");
  console.dir(insertedStudents, { depth: null });

  deleteUploadSession(uploadId);

  return successResponse(
    res,

    {
      insertedCount: insertedStudents.length,
    },

    "Students uploaded successfully",

    201,
  );
});

const exportStudents = asyncHandler(async (req, res) => {

  // Get all students
  const students = await studentService.getAllStudents();

  // Generate workbook
  const workbook = await exportStudentsToExcel(students);

  // Response headers
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    'attachment; filename="students.xlsx"'
  );

  // Send Excel file
  await workbook.xlsx.write(res);

  res.end();

});

module.exports = {
  previewUpload,
  confirmUpload,
  exportStudents,
};
