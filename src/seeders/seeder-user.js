'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'phamvanquynhk44@gmail.com',
      password: '1',
      firstname: 'pham van',
      lastName: 'quynh',
      address: 'HCM',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
