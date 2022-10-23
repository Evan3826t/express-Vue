var express = require('express');
var fileUpload = require('express-fileupload');
const { authJwt } = require("../app/middleware");
const filesPayLoadExists = require('../app/middleware/filesPayloadExists');
const fileSizeLimiter = require('../app/middleware/fileSizeLimiter');
const fileExtLimiter = require('../app/middleware/fileExtLimiter');
const controller = require("../app/controllers/file.controller");
var router = express.Router();

/* GET users listing. */
router.post('/upload', 
      [authJwt.verifyToken],
      fileUpload({ createParentPath: true}),
      filesPayLoadExists,
      fileSizeLimiter,
      fileExtLimiter(['.png', '.jpg']),
     controller.hadleFile
);

module.exports = router;
