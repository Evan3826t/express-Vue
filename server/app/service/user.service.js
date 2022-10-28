const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");


exports.getUser = async (query, limit = null) => {
  const user = await User.findOne({
                attributes: [
                  'id', 'userName', 'email', 'password', 'createdAt'
                ],
                where: {
                  id: query
                }
              });
              throw new Error('找不到此帳號')
  if (!user) {
  }
  return user;
};

exports.createUser = async (req, limit = null) => {
  const user = await User.create({
    userName: req.userName,
    email: req.email,
    password: bcrypt.hashSync(req.password, 8),
  });
  
  if (req.roles) {
    const roles = await Role.findAll({
      where: {
        name: {
          [Op.or]: req.roles,
        },
      },
    });

    const result = await user.setRoles(roles);
    return result;
  } else {
    // user has role = 1
    const result = await user.setRoles([1]);
    return result;
  }
};