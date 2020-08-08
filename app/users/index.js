const express = require('express'),
    router = express.Router(),
    LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const {Session, User} = require("./models");
const {Op} = require('sequelize')

passport.serializeUser(function (user, done) {
    return done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then(res => {
            done(null, res ? res : false)
        })
        .catch(err => {
            done(err)
        })
});

passport.use('local', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    (login, password, done) => {
        User.findOne({where: {login: login, password: password}})
            .then(res => {
                done(null, res ? res : false)
            })
            .catch(err => {
                done(err)
            })
    })
)

router.route('/')
    .get((req, res) => {
        res.render('users/userData', {...req['user'].get()})
    })
    .post((request, response) => {
            User.update({...request.body}, {where: {id: request['user'].id}})
                .then(res => {
                    if (res[0] === 0) {
                        console.log('no user in base')
                    }
                    Session.destroy({
                        attributes: ['sid', 'sess', 'expire'],
                        where: {
                            sess: {
                                '"passport"': {
                                    '"user"': request['user'].id
                                }
                            },
                            sid: {
                                [Op.not]: request['sessionID']
                            }
                        }
                    }).then(res => {
                        console.log(res)
                    })
                    response.redirect('/user')
                })
        }
    )

router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

router.route('/login')
    .get((req, res) => {
        res.render('users/login')
    })
    .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/login',
            // failureFlash: true
        })
    )

module.exports = router

