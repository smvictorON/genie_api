const mongoose = require('mongoose')

const DialogSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true },
  _created_at: { type: Date, default: Date.now },
  _updated_at: { type: Date, default: Date.now },
})

DialogSchema.pre('save', function (next) {
  this._updated_at = new Date();
  next();
});

const Dialog = mongoose.model('Dialog', DialogSchema)

module.exports = Dialog