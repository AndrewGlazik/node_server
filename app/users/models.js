const {DataTypes} = require('sequelize');
const {Database} = require('../../config');

const User = Database.define('User', {
    name: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 10
        }
    }
}, {
    tableName: 'users'
    // Other model options go here
});

// (async () => {
//     await Database.sync({ force: true });
//     // Code here
// })()

module.exports = {
    User: User
}
