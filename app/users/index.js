const express = require('express'),
    router = express.Router(),
    LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const {User} = require("./models");

passport.serializeUser(function (user, done) {
    console.log('enter')
    return done(null, user.id);
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
        res.render('users/userData', {...req.user.get()})
    })

router.get('/logout', (req, res) => {
    req.logout()
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
        }
    ))

module.exports = router

