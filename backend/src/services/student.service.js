const studentRepository = require("../repositories/student.repository");

// Validate duplicate Admission ID and Unique ID
const validateDuplicates = async (row, uniqId) => {
  const errors = [];

  const [existingAdmission, existingUniq] = await Promise.all([
    studentRepository.findByAdmissionId(row["Admission ID"]),

    studentRepository.findByUniqId(uniqId),
  ]);

  if (existingAdmission) {
    errors.push("Admission ID already exists");
  }

  if (existingUniq) {
    errors.push("UniqId already exists");
  }

  return errors;
};

module.exports = {
  validateDuplicates,
};
