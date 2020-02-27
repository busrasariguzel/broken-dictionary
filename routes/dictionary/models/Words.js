const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: { type: String, lowercase: true, unique: true },
  definition: { type: String, lowercase: true, trim: true }
});

module.exports= mongoose.model('words', WordSchema)  