const generateAsciiSum = (studentName) => {
  return studentName
    .replace(/\s+/g, "")
    .toUpperCase()
    .split("")
    .reduce((sum, char) => {
      return sum + char.charCodeAt(0);
    }, 0);
};

const generateUniqId = (studentName, admissionId) => {
  const asciiSum = generateAsciiSum(studentName);

  const lastFourDigits = admissionId.slice(-4);

  const firstTwoLetters = studentName
    .replace(/\s+/g, "")
    .substring(0, 2)
    .toUpperCase();

  return `${lastFourDigits}${asciiSum}${firstTwoLetters}`;
};

module.exports = generateUniqId;