module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'about', {
            type: Sequelize.STRING(500),
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('users', 'about');
    },
};
