const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = async (req, res) => {
    console.log(req.userId);
    const user = await User.findAll({
                  where: {
                    id: req.userId
                  }
                });
    console.log(user[0].userName);
    res.status(200).send(req.user);
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };