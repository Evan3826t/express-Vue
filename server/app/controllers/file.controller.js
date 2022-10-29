const db = require("../models");
const User = db.user;
const File = db.file;
const fileService = require("../service/file.service");

exports.hadleFile = async (req, res) => {
  try {
    
    const files = req.files
    const path = await fileService.getFilePath();

    const file = await fileService.saveFile(files.file, req.body.type, path, req.userId);

    res.status(200).send("upload success");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};