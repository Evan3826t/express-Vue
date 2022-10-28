const db = require("../models");
const User = db.user;
const File = db.file;
const path = require("path");
const crypto = require('crypto');

exports.hadleFile = async (req, res) => {
  try {
    const files = req.files
    const pathSplit = __dirname.split('app/controllers')

    const fileName = crypto.randomBytes(20).toString('hex') + '.' + files.file.name.split('.').pop()
    const filepath = path.join( pathSplit[0], 'files', fileName)
    files.file.mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err})
    })

    const file = await File.create({
      type: req.body.type,
      name: fileName,
      path: filepath,
      userId: req.userId,
    });

    // const data = await User.findByPk(req.userId, {
    //   attributes: [
    //     'id', 'userName', 'email', 'password', 'createdAt'
    //   ],
    //   include: File,  
    // })
    // console.log(data.toJSON())
    res.status(200).send("upload success");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};