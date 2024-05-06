'use strict';
module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.bulkInsert("admins", [
{
name: `John Doe`,
email:'johdoe@example.com',password:'admin123',
createdAt: new Date(), updatedAt: new Date()
},
], {})
},
async down(queryInterface, Sequelize) {
await queryInterface.bulkDelete('members', null, {});
}
}