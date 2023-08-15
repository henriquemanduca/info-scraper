'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stocks', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            ticker: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            title: {
                type: Sequelize.STRING
            },
            value: {
                type: Sequelize.DECIMAL(13, 4)
            },
            variation: {
                type: Sequelize.DECIMAL(13, 4)
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('stocks');
    }
};
