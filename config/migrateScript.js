const {sequelize} = require('../app/users/models');

(async () => {
    await sequelize.sync()
    // Code here
})()
