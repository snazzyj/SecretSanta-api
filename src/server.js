const knex = require('knex');
const app = require('./app');
const {PORT} = require('./config');
const DATABASE_URL = 'postgresql://Alex:1@localhost/secret-santa-test'

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});