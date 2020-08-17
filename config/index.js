const DATABASE_URL = `postgres://postgres:Andrew100500@127.0.0.1:5432/${process.env.NODE_ENV === 'test' ? 'node_test_test' : 'node_test'}`
module.exports = {
    DATABASE_URL: DATABASE_URL,
}
