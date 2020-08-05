const {app} = require('./app')
const host = '127.0.0.1'
const port = 7000

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})
