'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcryptjs = require("bcryptjs")
    const SALT_ROUND = 10; 
    
    await queryInterface.bulkInsert('Users', [{
      first_name: 'David',
      last_name: 'Leiva',
      email: 'davidleiva4999@gmail.com',
      password: await bcryptjs.hash('Admin!@#', SALT_ROUND),
      phone: '+12055885568',
      avatar: '/images/avatar.svg',
      role: 3, // SuperAdmin -> Admin -> Seller -> Buyer
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
