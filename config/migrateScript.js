const {sequelize} = require('../app/users/models');

(async () => {
    await sequelize.sync({force: process.env.NODE_ENV === 'test'})
})()
