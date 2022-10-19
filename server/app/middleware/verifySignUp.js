const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Username
        let user = await User.findOne({
            where: {
                userName: req.body.userName
            }
        });

        if (user) {
            return res.status(400).send({
                message: "帳號已被使用"
            });
        }

        // Email
        user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(400).send({
                message: "信箱已被使用"
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username!"
        })
    }
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };
  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };
  
  module.exports = verifySignUp;