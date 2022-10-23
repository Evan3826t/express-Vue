const db = require("../models");
const User = db.user;
const path = require("path");

exports.hadleFile = (req, res) => {
 
    const files = req.files

    Object.keys(files).forEach(key => {
      const pathSplit = __dirname.split('app/controllers')
      const filepath = path.join( pathSplit[0], 'files', files[key].name)

      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err})
      })
    })
  
    res.status(200).send("upload success");
  };