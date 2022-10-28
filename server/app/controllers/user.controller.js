const db = require("../models");
const User = db.user;
const userService = require("../service/user.service");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = async (req, res) => {
    try {
      const user = await userService.getUser(req.userId)
      res.status(200).send(user);
    } catch(err) {
      res.status(400).json({ status: "error", message: err.message});
    }
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };