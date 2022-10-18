const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = async (req, res) => {
    const user = await User.findOne({
                  attributes: [
                    'id', 'userName', 'email', 'password', 'createdAt'
                  ],
                  where: {
                    id: req.userId
                  }
                });
    res.status(200).send(user);
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };