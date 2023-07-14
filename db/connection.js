const {MongoClient} = require('mongodb')
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const name = process.env.DB_PASS
const url = `mongodb+srv://${user}:${pass}@${name}.jm4t4vx.mongodb.net/?retryWrites=true&w=majority`

let _db

const initDB = cb => {
  MongoClient.connect(url, {useUnifiedTopology: true}).then(client => {
    _db = client
    cb(null, _db)
  }).catch(err => {
    cb(err);
  })
}

const getDB = () => {
  return _db
}

module.exports = {
  initDB, getDB
}