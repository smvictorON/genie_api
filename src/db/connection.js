const mongoose = require('mongoose');
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const name = process.env.DB_NAME
const url = `mongodb+srv://${user}:${pass}@${name}.jm4t4vx.mongodb.net/${name}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected!');
});

module.exports = mongoose;
