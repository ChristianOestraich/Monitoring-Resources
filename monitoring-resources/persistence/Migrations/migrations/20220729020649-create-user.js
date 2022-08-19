const User = require('../../Models/user');

module.exports = {
  async up (queryInterface, Sequelize) {

    queryInterface.describeTable("users").then(attributes => {
      return queryInterface.insert(User, "users", [
        {
          name: "admin",
          email: "admin@gmail.com",
          password: "admin"
        }
      ]);
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
