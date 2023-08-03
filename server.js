require('dotenv').config();
const express = require("express");
const cors = require("cors");

//routes
const chatRouter = require("./src/routes/chatRouter");

//config
const port = process.env.API_PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRouter);

app.listen(port, () => {
  console.log(`API running on ${port}!`);
});
