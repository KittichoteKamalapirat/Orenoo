const express = require('express');
const Word = require('../../models/Word');
const router = express.Router();

// @ route    POST api/words
// @desc      Add a new word
// @access    Public
router.post('/', async (req, res) => {
  try {
    const newWord = new Word({
      word: req.body.word
    });
    const word = await newWord.save();
    res.json(word);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/words
// @desc      Get all the words
// @access    Public
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/words/:id
// @desc      Get a single word
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    res.json(word);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    DELETE api/words/:id
// @desc      Delete a word by id
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);

    if (!word) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    await word.remove();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
