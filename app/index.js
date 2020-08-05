const express = require('express'),
    app = express(),
    handlebars = require('express-handlebars'),
    path = require('path'),
    bodyParser = require('body-parser'),
    users = require('./users'),
    redis = require('redis'),
    session = require('express-session'),
    redisStorage = require('connect-redis')(session),
    client = redis.createClient(),
    crypto = require('crypto')
const passport = require('passport');
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

const generateSessionId = () => (crypto.randomBytes(32).toString('base64'))

app.use(
    session({
        secret: generateSessionId(),
        store: new redisStorage({
            host: '127.0.0.1',
            port: 6379,
            client: client,
        }),
        resave: false,
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
