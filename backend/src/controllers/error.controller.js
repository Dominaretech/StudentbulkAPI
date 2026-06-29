const path =
require("path");

const downloadErrorReport =
(
  req,
  res
) => {

  const fileName =
    req.params.fileName;

  const filePath =
    path.join(
      process.cwd(),
      "uploads",
      "error-reports",
      fileName
    );

  return res.download(
    filePath
  );

};

module.exports = {
  downloadErrorReport
};