const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const fileName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {

  const allowedExtensions = [
    ".xlsx",
    ".xls"
  ];

  const extension =
    path.extname(
      file.originalname
    ).toLowerCase();

  if (
    allowedExtensions.includes(
      extension
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only Excel files are allowed"
      )
    );
  }
};

module.exports = multer({
  storage,
  fileFilter
});