//modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const db = require('./db/connection')

//routes
const chatRouter = require("./routes/chatRouter")

//config
const port = 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/chat', chatRouter)

db.initDB((err, db) => {
  if(err){
    console.log(err)
  }else{
    console.log(`Banco conectou!`)
    app.listen(port, () => {
      console.log(`Aplicação rodando na porta ${port}!`)
    })
  }
})