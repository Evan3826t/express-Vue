module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
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
    return File;
};
