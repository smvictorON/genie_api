const mongoose = require('mongoose')

const DialogSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  type: { type: String, required: true },
  answer_delay: { type: String, required: true }
}, {
  timestamps: true
})

DialogSchema.pre('save', function (next) {
  this._updated_at = new Date();
  return next();
});

const Dialog = mongoose.model('Dialog', DialogSchema)

module.exports = Dialog