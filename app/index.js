const express = require('express'),
    app = express(),
    handlebars = require('express-handlebars'),
    path = require('path'),
    bodyParser = require('body-parser'),
    users = require('./users'),
    session = require('express-session'),
    pgSession = require('connect-pg-simple')(session),
    flash = require('connect-flash')
const passport = require('passport');
const {DATABASE_URL} = require("../config");
const {User} = require("./users/models");

// const hour = 3600000
//
// const cookieConfig = {
//     expires: new Date(Date.now() + hour),
//     maxAge: hour,
//     sameSite: 'lax'
// }

app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'hbs')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(flash())


app.use(
    session({
        store: new pgSession({
            conString: DATABASE_URL
        }),
        secret: process.env.FOO_COOKIE_SECRET || 'oP85saf_DwdI8w9',
        resave: true,
        // cookie: cookieConfig,
        saveUninitialized: true
    })
)


app.use(passport.initialize())

app.use(passport.session())


app.get('/', (req, res) => {
    // console.log(req.user)
    res.render('startPage', {
        userName: req.user ? req.user.name : null
    })
})

app.use('/user', users)

app.route('/registration')
    .get((req, res) => {
        res.render('users/registrationForm')
    })
    .post((req, res) => {
        User.create(req.body)
        res.redirect('/')
    })

module.exports = {
    app: app
}
