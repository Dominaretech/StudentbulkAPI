const ExcelJS = require("exceljs");

// Export students to Excel
const exportStudentsToExcel = async (students) => {

  const workbook = new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet("Students");

  worksheet.columns = [

    {
      header: "Unique ID",
      key: "uniqId",
      width: 18,
    },

    {
      header: "Student Name",
      key: "studentName",
      width: 30,
    },

    {
      header: "Admission ID",
      key: "admissionId",
      width: 20,
    },

    {
      header: "Class",
      key: "className",
      width: 12,
    },

    {
      header: "Section",
      key: "section",
      width: 10,
    },

    {
      header: "Roll No",
      key: "rollNo",
      width: 12,
    },

    {
      header: "Gender",
      key: "gender",
      width: 12,
    },

    {
      header: "Father Name",
      key: "fatherName",
      width: 25,
    },

    {
      header: "Father Mobile",
      key: "fatherMobileNumber",
      width: 20,
    },

    {
      header: "Mother Name",
      key: "motherName",
      width: 25,
    },

    {
      header: "Mother Mobile",
      key: "motherMobileNumber",
      width: 20,
    },

    {
      header: "Year Of Joining",
      key: "yearOfJoining",
      width: 18,
    },

    {
      header: "Aadhaar Number",
      key: "aadhaarNumber",
      width: 22,
    },

    {
      header: "Date Of Birth",
      key: "dateOfBirth",
      width: 18,
    },

    {
      header: "Caste",
      key: "caste",
      width: 18,
    },

    {
      header: "Communication Address",
      key: "communicationAddress",
      width: 35,
    },

    {
      header: "Permanent Address",
      key: "permanentAddress",
      width: 35,
    }

  ];

  students.forEach((student) => {

    worksheet.addRow(student);

  });

  worksheet.getRow(1).font = {

    bold: true,

  };

  return workbook;

};

module.exports = {
  exportStudentsToExcel,
};