const Student =
require("../models/student.model");

const findByAdmissionId =
async (admissionId) => {
  return Student.findOne({
    admissionId
  });
};

const findByUniqId =
async (uniqId) => {
  return Student.findOne({
    uniqId
  });
};

const bulkInsertStudents =
async (students) => {

  try {

    const result =
      await Student.insertMany(
        students,
        {
          ordered: false
        }
      );

    return result;

  } catch (error) {

    console.log("========== BULK INSERT ERROR ==========");
    console.dir(error, {
      depth: null
    });
    console.log("=======================================");

    throw error;

  }
};
const getStudents =
async (
  filter,
  skip,
  limit
) => {

  const students =
    await Student
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1
      });

  const total =
    await Student
      .countDocuments(
        filter
      );

  return {
    students,
    total
  };

};

const getStudentById =
async (id) => {

  return Student.findById(
    id
  );

};

const updateStudent =
async (
  id,
  data
) => {

  return Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true
    }
  );

};

const deleteStudent =
async (id) => {

  return Student.findByIdAndDelete(
    id
  );
};
const deleteAllStudents =
async () => {

  return Student.deleteMany(
    {}
  );

};

module.exports = {
  findByAdmissionId,
  findByUniqId,
  bulkInsertStudents,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  deleteAllStudents
};