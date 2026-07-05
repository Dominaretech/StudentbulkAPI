const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload.middleware");

const {
  previewUpload,
  confirmUpload,
  exportStudents,
} = require("../controllers/student.controller");

router.post(
  "/preview-upload",
  upload.single("file"),
  previewUpload
);

router.post(
  "/confirm-upload",
  confirmUpload
);

router.get(
  "/export",
  exportStudents
);

module.exports = router;