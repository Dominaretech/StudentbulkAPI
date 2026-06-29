const parseExcel =
require("../utils/excelParser");

const validateStudentRow =
require("../validators/student.validator");

const generateUniqId =
require("../utils/uniqIdGenerator");

const generateErrorReport =
require("../utils/errorReportGenerator");

const {
  createUploadSession,
  getUploadSession,
  deleteUploadSession
} =
require("../utils/uploadStore");

const studentRepository =
require("../repositories/student.repository");

const studentService =
require("../services/student.service");

const previewUpload =
async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Excel file required"
      });
    }

    const rows =
      parseExcel(
        req.file.path
      );

    const validRows = [];

    const failedRows = [];

    const admissionSet =
      new Set();

    const aadhaarSet =
      new Set();

    for (
      let index = 0;
      index < rows.length;
      index++
    ) {

      const row =
        rows[index];

      const validation =
        validateStudentRow(
          row
        );

      const rowErrors =
        [];

      if (
        !validation.isValid
      ) {
        rowErrors.push(
          ...validation.errors
        );
      }

      const admissionId =
        row[
          "Admission ID"
        ];

      if (
        admissionSet.has(
          admissionId
        )
      ) {

        rowErrors.push(
          "Duplicate Admission ID in Excel"
        );

      } else {

        admissionSet.add(
          admissionId
        );

      }

      const aadhaar =
        row[
          "Adhar Number"
        ];

      if (
        aadhaarSet.has(
          aadhaar
        )
      ) {

        rowErrors.push(
          "Duplicate Aadhaar in Excel"
        );

      } else {

        aadhaarSet.add(
          aadhaar
        );

      }

      const uniqId =
        generateUniqId(
          row[
            "Student name"
          ],
          admissionId
        );

      const dbErrors =
        await studentService
          .validateDuplicates(
            row,
            uniqId
          );

      rowErrors.push(
        ...dbErrors
      );

      if (
        rowErrors.length > 0
      ) {

        failedRows.push({
  row: index + 4,
  errors: rowErrors,
  data: row
});

        continue;
      }

      validRows.push({

        ...row,

        uniqId

      });

    }

    let errorReport =
      null;

    if (
      failedRows.length > 0
    ) {

      errorReport =
        generateErrorReport(
          failedRows
        );

    }
console.log("================================");
console.log("Valid Rows:", validRows.length);
console.log("Failed Rows:", failedRows.length);
console.log("================================");
    const uploadId =
      createUploadSession(
        validRows
      );
console.log("========================");
console.log(failedRows);
console.log("========================");
    return res.status(200).json({

      success: true,

      uploadId,

      totalRows:
        rows.length,

      successCount:
        validRows.length,

      failedCount:
        failedRows.length,

      failedRows,

      errorReport

    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};

const confirmUpload =
async (req, res) => {

  try {

    const {
      uploadId
    } = req.body;

    if (
      !uploadId
    ) {

      return res.status(400).json({
        success: false,
        message:
          "uploadId required"
      });

    }

    const students =
      getUploadSession(
        uploadId
      );

    if (
      !students
    ) {

      return res.status(404).json({
        success: false,
        message:
          "Upload session expired"
      });

    }
console.log("================================");
console.log("Students In Session:", students.length);
console.log("================================");
    const mappedStudents =
      students.map(
        student => ({

          uniqId:
            student.uniqId,

          studentName:
            student[
              "Student name"
            ],

          className:
            student[
              "Class"
            ],

          section:
            student[
              "Section"
            ],

          rollNo:
            student[
              "Roll.no"
            ],

          admissionId:
            student[
              "Admission ID"
            ],

          fatherName:
            student[
              "Father name"
            ],

          fatherMobileNumber:
            student[
              "Father mobile number"
            ],

          motherName:
            student[
              "Mother name"
            ],

          motherMobileNumber:
            student[
              "Mother mobile number"
            ],

          yearOfJoining:
            student[
              "Year of joining"
            ],

          aadhaarNumber:
            student[
              "Adhar Number"
            ],

          gender:
            student[
              "Gender"
            ],

          dateOfBirth:
            student[
              "Date of Birth"
            ],

          caste:
            student[
              "Caste"
            ],

          communicationAddress:
            student[
              "Communication Address"
            ],

          permanentAddress:
            student[
              "Permanent Address"
            ]

        })
      );

    const insertedStudents =
      await studentRepository
        .bulkInsertStudents(
          mappedStudents
        );

console.log("Mapped Students:");
console.dir(mappedStudents, { depth: null });

console.log("Inserted Students:");
console.dir(insertedStudents, { depth: null });
    deleteUploadSession(
      uploadId
    );

    return res.status(201).json({

      success: true,

      insertedCount:
        insertedStudents.length,

      message:
        "Students uploaded successfully"

    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message:
        error.message
    });

  }

};

module.exports = {
  previewUpload,
  confirmUpload
};