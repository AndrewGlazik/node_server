const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:Andrew100500@127.0.0.1:5432/node_test')

module.exports = {
    Database: sequelize
}
