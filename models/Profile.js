const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  google: {
    type: Boolean,
    required: true,
    default: true
  },
  dict: {
    type: Boolean,
    required: true,
    default: true
  },
  mnemonic: {
    type: Boolean,
    required: true,
    default: true
  },
  synonym: {
    type: Boolean,
    required: true,
    default: true
  },
  example: {
    type: Boolean,
    required: true,
    default: true
  },
  inSentence: {
    type: Boolean,
    required: true,
    default: true
  },
  thai: {
    type: Boolean,
    required: true,
    default: false
  },
  youdao: {
    type: Boolean,
    required: true,
    default: false
  },
  hippo: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
