const express =
require("express");

const router =
express.Router();

const {
  downloadErrorReport
} =
require("../controllers/error.controller");

router.get(
  "/download/:fileName",
  downloadErrorReport
);

module.exports =
router;