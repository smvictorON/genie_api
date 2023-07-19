const mongoose = require('mongoose')

const DialogSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  type: { type: Boolean, required: true },
  user: { type: mongoose.Types.ObjectId, required: true },
  answer_delay: { type: String, required: true },
  timestamps: true
})

// DialogSchema.pre('save', function (next) {
//   this._updated_at = new Date();
//   next();
// });

const Dialog = mongoose.model('Dialog', DialogSchema)

module.exports = Dialog