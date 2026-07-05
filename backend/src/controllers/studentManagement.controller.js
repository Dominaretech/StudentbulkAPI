const studentRepository = require("../repositories/student.repository");

const getStudents = async (req, res) => {
  try {
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

    const result = await studentRepository.getStudents(filter, skip, limit);

    return res.json({
      success: true,
      page,
      limit,
      total: result.total,
      data: result.students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentRepository.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await studentRepository.updateStudent(
      req.params.id,
      req.body,
    );

    return res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await studentRepository.deleteStudent(req.params.id);

    return res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAllStudents = async (req, res) => {
  try {
    const result = await studentRepository.deleteAllStudents();

    return res.json({
      success: true,
      deletedCount: result.deletedCount,
      message: "All students deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get all filter values
const getFilters = async (req, res) => {

  try {

    const filters =
      await studentRepository.getFilters();

    return res.json({
      success: true,
      data: filters
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
module.exports = {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  deleteAllStudents,
  getFilters
};
