const studentRepository =
require("../repositories/student.repository");

const validateDuplicates =
async (
  row,
  uniqId
) => {

  const errors = [];

  const existingAdmission =
    await studentRepository
      .findByAdmissionId(
        row["Admission ID"]
      );

  if (
    existingAdmission
  ) {
    errors.push(
      "Admission ID already exists"
    );
  }

  const existingUniq =
    await studentRepository
      .findByUniqId(
        uniqId
      );

  if (
    existingUniq
  ) {
    errors.push(
      "UniqId already exists"
    );
  }

  return errors;

};

module.exports = {
  validateDuplicates
};