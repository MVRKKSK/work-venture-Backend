const express = require("express");
const { uploadImages } = require("../controllers/upload");
// const { authUser } = require("../middlwares/auth");
const imageUpload = require("../middlewares/imageUpload");

const router = express.Router();

router.post("/uploadImages", imageUpload, uploadImages);

module.exports = router;