const {Sequelize, DataTypes} = require('sequelize');
const {DATABASE_URL} = require('../../config');

const sequelize = new Sequelize(DATABASE_URL, {sync: {alter: true}})

const Session = sequelize.define('Session', {
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
    tableName: 'session',
    timestamps: false
})

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    sequelize: sequelize,
    Session: Session,
    User: User
}
