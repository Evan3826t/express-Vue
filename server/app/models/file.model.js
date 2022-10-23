module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("files", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      }
    });

    return Role;
};
