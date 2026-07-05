const studentRepository = require("../repositories/student.repository");
const asyncHandler = require("../middleware/asyncHandler");

const ApiError = require("../utils/ApiError");

const { successResponse } = require("../utils/response");

// Get students with search, filters and pagination
// Get students with search, filters and pagination
const getStudents = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const search = req.query.search || "";

  const className = req.query.class || "";

  const section = req.query.section || "";

  const gender = req.query.gender || "";

  const yearOfJoining = req.query.year || "";

  const skip = (page - 1) * limit;

  const filter = {};

  if (search) {

    filter.$or = [

      {
        studentName: {
          $regex: search,
          $options: "i",
        },
      },

      {
        admissionId: {
          $regex: search,
          $options: "i",
        },
      },

    ];

  }

  if (className) {
    filter.className = className;
  }

  if (section) {
    filter.section = section;
  }

  if (gender) {
    filter.gender = gender;
  }

  if (yearOfJoining) {
    filter.yearOfJoining = Number(yearOfJoining);
  }

  const result =
    await studentRepository.getStudents(
      filter,
      skip,
      limit
    );

  // Keep pagination response compatible with frontend
  return res.json({

    success: true,

    page,

    limit,

    total: result.total,

    data: result.students,

  });

});
// Get student by ID
const getStudentById = asyncHandler(async (req, res) => {
  const student = await studentRepository.getStudentById(req.params.id);

  if (!student) {
    throw new ApiError("Student not found", 404);
  }

  return successResponse(res, student, "Student fetched successfully");
});

// Update student details
const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentRepository.updateStudent(
    req.params.id,
    req.body,
  );

  if (!student) {
    throw new ApiError("Student not found", 404);
  }

  return successResponse(res, student, "Student updated successfully");
});

// Delete student
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await studentRepository.deleteStudent(req.params.id);

  if (!student) {
    throw new ApiError("Student not found", 404);
  }

  return successResponse(res, null, "Student deleted successfully");
});

// Delete all students
const deleteAllStudents = asyncHandler(async (req, res) => {
  const result = await studentRepository.deleteAllStudents();

  return successResponse(
    res,
    {
      deletedCount: result.deletedCount,
    },
    "All students deleted successfully",
  );
});

// Get all filter values
const getFilters = asyncHandler(async (req, res) => {
  const filters = await studentRepository.getFilters();

  return successResponse(res, filters, "Filters fetched successfully");
});

module.exports = {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  deleteAllStudents,
  getFilters,
};
