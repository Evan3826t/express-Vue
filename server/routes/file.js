var express = require('express');
var fileUpload = require('express-fileupload');
const { authJwt } = require("../app/middleware");
const filesPayLoadExists = require('../app/middleware/filesPayloadExists');
const fileSizeLimiter = require('../app/middleware/fileSizeLimiter');
const fileExtLimiter = require('../app/middleware/fileExtLimiter');
const path = require("path");
var router = express.Router();

/* GET users listing. */
router.post('/upload', 
      [authJwt.verifyToken],
      fileUpload({ createParentPath: true}),
      filesPayLoadExists,
      fileSizeLimiter,
      fileExtLimiter(['.png', '.jpg']),
      function(req, res, next) {
        const files = req.files

        Object.keys(files).forEach(key => {
          const pathSplit = __dirname.split('routes')
          const filepath = path.join( pathSplit[0], 'files', files[key].name)

          files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err})
          })
        })
        return res.json({ status: 'success', message: Object.keys(files).toString()})
      }
);

module.exports = router;
