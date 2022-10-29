const db = require("../models");
const User = db.user;
const File = db.file;
const crypto = require('crypto');
const path = require("path");

exports.getFilePath = async () => {

  const pathSplit = __dirname.split('app/controllers')

  return pathSplit[0];
};

exports.saveFile = async (file, type, folder, userId) => {

  const fileName = crypto.randomBytes(20).toString('hex') + '.' + file.name.split('.').pop()
  console.log(fileName);
  const filepath = path.join( folder, 'files', fileName)

  const saveFile = await File.create({
      type: type,
      name: fileName,
      path: filepath,
      userId: userId,
    });
  
  return true;
};

exports.getUserFile = async (userId) => {
    const data = await User.findByPk(userId, {
      attributes: [
        'id', 'userName', 'email', 'password', 'createdAt'
      ],
      include: File,  
    })

    return data.toJSON();
};

exports.getFileByName = async (fileName) => {
  const file = await File.findOne({
    where: {
      name: fileName
    }
  });
  
  return file.toJSON();
};
