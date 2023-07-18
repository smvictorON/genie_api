const db = require('../db/connection')

module.exports = {
  askIA: async(req, res) => {
    const { question, answer } = req.body

    db.getDB().db().collection('dialogs').insertOne({
      question: question,
      answer: answer
    })
  },

  getAll: async(req, res) => {
    const { user } = req.params
    try {
      const dialogs = await db.getDB().db().collection('dialogs').find({user: user}).toArray()

      return res.json({ error: null, dialogs: dialogs })
    } catch (err) {
      return res.status(400).json({ err })
    }
  },

  getOne: async(req, res) => {
    const { id } = req.params
    try {
      const dialogs = await db.getDB().db().collection('dialogs').find({id: id})

      return res.json({ error: null, dialogs: dialogs })
    } catch (err) {
      return res.status(400).json({ err })
    }
  }
}