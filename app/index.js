const express = require('express'),
    app = express(),
    handlebars = require('express-handlebars'),
    path = require('path'),
    bodyParser = require('body-parser'),
    users = require('./users'),
    session = require('express-session'),
    pgSession = require('connect-pg-simple')(session),
    logger = require('morgan')
const passport = require('passport');
const {DATABASE_URL} = require("../config");
const {User} = require("./users/models");

const hour = 3600000

const cookieConfig = {
    expires: new Date(Date.now() + hour),
    maxAge: hour,
    sameSite: 'lax'
}

app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('connect-flash')())
app.use(logger('dev'))

app.use(
    session({
        store: new pgSession({
            conString: DATABASE_URL
        }),
        secret: process.env.FOO_COOKIE_SECRET || 'oP85saf_DwdI8w9',
        resave: false,
        cookie: cookieConfig,
        saveUninitialized: true
    })
)

app.use(passport.initialize({}))
app.use(passport.session({}))

app.get('/', (req, res) => {
    res.render('startPage', {
        userName: req.user ? req.user.name : null,
        notification: req['flash']('success_create_user')
    })
})

app.use('/user', users)

app.route('/registration')
    .get((req, res) => {
        res.render('users/registrationForm', {
            notification: req['flash']('error_during_create_user')
        })
    })
    .post((request, response) => {
        User.create(request.body)
            .then(res => {
                request['flash']('success_create_user', `success create new user: ${res.name}`)
                response.redirect('/')
            })
            .catch(err => {
                request['flash']('error_during_create_user', err.parent ? err.parent.detail : err.errors[0].message)
                response.redirect('/registration')
            })
    })

module.exports = {
    app: app
}
