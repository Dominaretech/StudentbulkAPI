const Student = require("../models/student.model");

// Find student by Admission ID
const findByAdmissionId = async (admissionId) => {
  return Student.findOne({
    admissionId,
  });
};

// Find student by Unique ID
const findByUniqId = async (uniqId) => {
  return Student.findOne({
    uniqId,
  });
};

// Bulk insert students into MongoDB
const bulkInsertStudents = async (students) => {
  try {
    const result = await Student.insertMany(students, {
      ordered: false,
    });

    return result;
  } catch (error) {
    console.log("========== BULK INSERT ERROR ==========");
    console.dir(error, {
      depth: null,
    });
    console.log("=======================================");

    throw error;
  }
};

// Get students with search, filters and pagination
const getStudents = async (
  filter,
  skip,
  limit
) => {

  const students = await Student
    .find(filter)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(
    filter
  );

  return {
    students,
    total,
  };

};

// Get single student by ID
const getStudentById = async (id) => {

  return Student.findById(id);

};

// Update student details
const updateStudent = async (
  id,
  data
) => {

  return Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );

};

// Delete single student
const deleteStudent = async (id) => {

  return Student.findByIdAndDelete(id);

};

// Delete all students
const deleteAllStudents = async () => {

  return Student.deleteMany({});

};

// Get all filter values

const getFilters = async () => {

  const [
    classes,
    sections,
    genders,
    years
  ] = await Promise.all([

    Student.distinct("className"),

    Student.distinct("section"),

    Student.distinct("gender"),

    Student.distinct("yearOfJoining")

  ]);

  return {

    classes: classes.sort((a, b) =>
      a.localeCompare(
        b,
        undefined,
        {
          numeric: true
        }
      )
    ),

    sections: sections.sort(),

    genders: genders.sort(),

    years: years.sort((a, b) => b - a)

  };

};
module.exports = {
  findByAdmissionId,
  findByUniqId,
  bulkInsertStudents,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  deleteAllStudents,
  getFilters
};