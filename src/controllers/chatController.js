const db = require('../db/connection')
const { Configuration, OpenAIApi } = require('openai');
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}))

module.exports = {
  askText: async(req, res) => {
    const { question } = req.body

    const start = new Date().getTime();
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question}]
    })
    const end = new Date().getTime();
    const duration = end - start;

    const answer = response.data.choices[0].message.content

    await db.getDB().db().collection('dialogs').insertOne({
      question: question,
      answer: answer,
      type: "Text",
      answer_delay: `${duration/1000}s`,
      _created_at: new Date(),
      _updated_at: new Date()
    })

    return res.json({ error: null, answer: answer })
  },

  askImage: async(req, res) => {
    const { question } = req.body

    const start = new Date().getTime();
    const response = await openai.createImage({
      prompt: question,
      n: 1,
      size: "256x256"
    })
    const end = new Date().getTime();
    const duration = end - start;

    const answer = response.data.data[0].url

    db.getDB().db().collection('dialogs').insertOne({
      question: question,
      answer: answer,
      type: "Image",
      answer_delay: `${duration/1000}s`,
      _created_at: new Date(),
      _updated_at: new Date()
    })

    return res.json({ error: null, answer: answer })
  },

  getAllDialogsOfUser: async(req, res) => {
    // const { user } = req.params
    try {
      const dialogs = await db.getDB().db().collection('dialogs').find({}).toArray()

      return res.json({ error: null, dialogs: dialogs })
    } catch (err) {
      return res.status(400).json({ err })
    }
  }
}