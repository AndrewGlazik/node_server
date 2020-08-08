const {Sequelize, DataTypes} = require('sequelize');
const {DATABASE_URL} = require('../../config');

const Session = new Sequelize(DATABASE_URL).define('Session', {
    sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    sess: {
        type: DataTypes.JSON,
        allowNull: false
    },
    expire: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'session'
})

const User = new Sequelize(DATABASE_URL).define('User', {
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

module.exports = {
    Session: Session,
    User: User
}
