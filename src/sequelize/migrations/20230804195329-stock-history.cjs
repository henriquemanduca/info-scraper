'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stock_history', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            stock_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'stocks',
                    },
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            value: {
                type: Sequelize.DECIMAL(13, 4)
            },
            variation: {
                type: Sequelize.DECIMAL(13, 4)
            },
            type_ref: {
                allowNull: true,
                type: Sequelize.STRING(15)
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('stock_history');
    }
};
