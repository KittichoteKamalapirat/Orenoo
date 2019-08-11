const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  word: {
    type: String,
    required: true,
    unique: true
  },
  flagged: {
    type: Boolean,
    default: false
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
  google: {
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
    }
  },
  thai: Array,
  mnemonic: Array,
  synonym: Array,
  example: Array,
  inSentence: Array,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Word = mongoose.model('word', WordSchema);
