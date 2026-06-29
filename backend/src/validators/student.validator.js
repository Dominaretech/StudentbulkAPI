const validateStudentRow = (row) => {

  const errors = [];

  if (!row["Student name"]) {
    errors.push("Student Name Missing");
  }

  if (!row["Class"]) {
    errors.push("Class Missing");
  }

  if (!row["Section"]) {
    errors.push("Section Missing");
  }

  if (!row["Roll.no"]) {
    errors.push("Roll Number Missing");
  }

  if (!row["Admission ID"]) {
    errors.push("Admission ID Missing");
  }

  if (!row["Father name"]) {
    errors.push("Father Name Missing");
  }

  const fatherMobile =
    String(
      row["Father mobile number"] || ""
    ).trim();

  if (!/^\d{10}$/.test(fatherMobile)) {
    errors.push("Invalid Father Mobile Number");
  }

  if (!row["Year of joining"]) {
    errors.push("Year Of Joining Missing");
  }

  const aadhaar =
    String(
      row["Adhar Number"] || ""
    ).trim();

  if (!/^\d{12}$/.test(aadhaar)) {
    errors.push("Invalid Aadhaar Number");
  }

  const gender = row["Gender"];

  if (!gender) {
    errors.push("Gender Missing");
  } else if (
    !["Male", "Female", "Other"].includes(gender)
  ) {
    errors.push("Invalid Gender");
  }

  if (!row["Date of Birth"]) {
    errors.push("Date Of Birth Missing");
  }

  if (!row["Communication Address"]) {
    errors.push("Communication Address Missing");
  }

  if (!row["Permanent Address"]) {
    errors.push("Permanent Address Missing");
  }

  return {
    isValid: errors.length === 0,
    errors
  };

};

module.exports = validateStudentRow;