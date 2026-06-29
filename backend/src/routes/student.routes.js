const express =
require("express");

const router =
express.Router();

const upload =
require("../middlewares/upload.middleware");

const {
  previewUpload
} =
require("../controllers/student.controller");

const {
  confirmUpload
} =
require("../controllers/student.controller");
router.post(
  "/preview-upload",
  upload.single("file"),
  previewUpload
);
router.post(
  "/confirm-upload",
  confirmUpload
);
module.exports =
router;