const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  deck_name: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Deck = mongoose.model('deck', DeckSchema);
