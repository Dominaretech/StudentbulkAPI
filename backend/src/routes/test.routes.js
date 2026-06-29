const express = require("express");

const router = express.Router();

const generateUniqId = require("../utils/uniqIdGenerator");

router.get("/uniq-id", (req, res) => {
  const uniqId = generateUniqId(
    "Vishnu Vardhan",
    "ADM2025001234"
  );

  return res.status(200).json({
    success: true,
    uniqId
  });
});
// checking
const studentRepository =
require("../repositories/student.repository");

router.get(
  "/repo-test",
  async (req, res) => {

    return res.json({
      success: true,
      functions: Object.keys(
        studentRepository
      )
    });

  }
);

module.exports = router;