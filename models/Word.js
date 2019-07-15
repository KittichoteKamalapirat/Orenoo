const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WordSchema = new Schema({
  word: {
    type: String,
    required: true
  },
  dict: {
    noun: {
      type: Array
    },
    verb: {
      type: Array
    },
    adverb: {
      type: Array
    },
    adjective: {
      type: Array
    },
    idioms: {
      type: Array
    }
  },
  thai: Array,
  mnemonic: Array,
  synonym: Array,
  example: Array
});

module.exports = Word = mongoose.model('word', WordSchema);
