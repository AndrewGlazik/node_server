const {Sequelize} = require("sequelize"),
    {DATABASE_URL} = require("./index");

(async () => {
    await new Sequelize(DATABASE_URL).sync({alter: true})
    // Code here
})()
