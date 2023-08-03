const { Configuration, OpenAIApi } = require('openai');
const Dialog = require('../models/dialog')
const db = require('../db/connection') // do not remove this line

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}))

module.exports = {
  askText: async (req, res) => {
    try {
      const { question } = req.body
      const start = new Date().getTime();
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
      const end = new Date().getTime();
      const duration = end - start;
      const answer = response.data.choices[0].message.content

      await createDialog(question, answer, "Text", duration);

      return res.json({ answer: answer, error: null })
    } catch (err) {
      return res.status(400).json({ err })
    }
  },

  askImage: async (req, res) => {
    try {
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

      await createDialog(question, answer, "Image", duration);

      return res.json({ answer: answer, error: null })
    } catch (err) {
      return res.status(400).json({ err })
    }
  },

  getAllDialogs: async (req, res) => {
    try {
      const dialogs = await Dialog.find({}).sort({ createdAt: -1 }).exec();
      return res.json({ total: dialogs.length, dialogs: dialogs, error: null })
    } catch (err) {
      return res.status(400).json({ err })
    }
  }
}

const createDialog = async (question, answer, type, duration) => {
  try {
    await Dialog.create({
      question: question,
      answer: answer,
      type: type,
      answer_delay: `${duration / 1000}s`,
    });
  } catch (err) {
    console.error('Error creating dialog:', err);
    throw err
  }
}
