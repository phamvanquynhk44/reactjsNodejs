'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullname: 'Pham van quynh',
      username: 'quynhk44',
      password: '123456',
      img: '1.jpg',
      email: 'phamvanquynhk44@gmail.com',
      phone: '0379128012',
      address: 'HCM',
      roleId: 0,
      gender: 1,
      status: 1,
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
