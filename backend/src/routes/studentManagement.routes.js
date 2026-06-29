const express = require("express");

const router = express.Router();

const {
  getStudents,

  getStudentById,

  updateStudent,

  deleteStudent,

  deleteAllStudents,
} = require("../controllers/studentManagement.controller");

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.put("/:id", updateStudent);
router.delete("/delete-all", deleteAllStudents);
router.delete("/:id", deleteStudent);

module.exports = router;
