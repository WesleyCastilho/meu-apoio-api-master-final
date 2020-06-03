module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'telephone', {
            type: Sequelize.STRING(500),
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('users', 'telephone');
    },
};
