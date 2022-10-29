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

  if (!user) {
    throw new Error('找不到此帳號')
  }
  return user;
};

exports.getUserByName = async (query, limit = null) => {
  const user = await User.findOne({
                attributes: [
                  'id', 'userName', 'email', 'password', 'createdAt'
                ],
                where: {
                  userName: query
                }
              });

  if (!user) {
    throw new Error('無此帳號')
  }
  return user;
};

exports.passwordCompare = async (password, userPassword) => {
  const passwordIsValid = bcrypt.compareSync(
    password,
    userPassword
  );

  if (!passwordIsValid) {
    throw new Error('密碼錯誤')
  }

  return true;
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