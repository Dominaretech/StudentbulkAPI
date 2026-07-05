const express = require("express");

const router = express.Router();

const {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  deleteAllStudents,
  getFilters,
} = require("../controllers/studentManagement.controller");

// Student List
router.get("/", getStudents);

// Dynamic Class Dropdown
// Dynamic filter values
router.get("/filters", getFilters);

// Student By ID
router.get("/:id", getStudentById);

// Update Student
router.put("/:id", updateStudent);

// Delete All Students
router.delete("/delete-all", deleteAllStudents);

// Delete Student
router.delete("/:id", deleteStudent);

module.exports = router;