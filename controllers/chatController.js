const db = require('./db/connection')
const base = db.getDB().db()

export const askIA = async(req, res) => {
  const { question, answer } = req.body

  base.collection('dialogs').insertOne({
    question: question,
    answer: answer
  })
}

export const getAll = async(req, res) => {
  const { user } = req.params
  try {
    const dialogs = await base.collection('dialogs').find({user: user}).toArray()

    return res.json({ error: null, dialogs: dialogs })
  } catch (err) {
    return res.status(400).json({ err })
  }
}

export const getOne = async(req, res) => {
  const { id } = req.params
  try {
    const dialogs = await base.collection('dialogs').find({id: id})

    return res.json({ error: null, dialogs: dialogs })
  } catch (err) {
    return res.status(400).json({ err })
  }
}