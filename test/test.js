const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    {app} = require('../app'),
    {QueryTypes} = require('sequelize')
const {sequelize} = require("../app/users/models");

chai.use(chaiHttp)

describe('Users API', function () {
    before(async () => {
        await sequelize.sync({force: true})
        await sequelize.query('INSERT INTO users (id, name, login, email, password) VALUES ($id, $name, $login, $email, $password)', {
            bind: {id: 1, name: 'name1', login: 'login1', email: 'email1', password: 'password1'},
            type: QueryTypes.INSERT
        })

    })

    it('should login user', function (done) {
        chai
            .request(app)
            .post('/user/login')
            .send({
                login: 'login1',
                password: 'password1'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.redirectTo(/^http:\/\/127.0.0.1:\d{3,6}\/$/)

                done()
            })
    })

    it('should create new user', function (done) {
        chai
            .request(app)
            .post('/registration')
            .send({
                id: 2,
                name: 'name2',
                login: 'login2',
                email: 'email2',
                password: 'password2222'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.redirectTo(/^http:\/\/127.0.0.1:\d{3,6}\/$/)

                done()
            })
    });

    it('should check the length of the password when creating a new user', function (done) {
        chai
            .request(app)
            .post('/registration')
            .send({
                id: 3,
                name: 'name3',
                login: 'login3',
                email: 'email3',
                password: 'password3'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.not.redirectTo(/^http:\/\/127.0.0.1:\d{3,6}\/$/)

                done()
            })
    });
});
