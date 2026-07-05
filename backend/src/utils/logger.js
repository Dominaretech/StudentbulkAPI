// Log Information
const info = (message) => {

  console.log(
    `[INFO] ${new Date().toISOString()} - ${message}`
  );

};

// Log Warning
const warn = (message) => {

  console.warn(
    `[WARN] ${new Date().toISOString()} - ${message}`
  );

};

// Log Error
const error = (message) => {

  console.error(
    `[ERROR] ${new Date().toISOString()} - ${message}`
  );

};

module.exports = {
  info,
  warn,
  error,
};