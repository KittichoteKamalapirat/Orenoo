const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const Deck = require('../../models/Deck');

// @ route    GET api/decks
// @desc      Get all the decks
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const decks = await Deck.find({ user: req.user.id });
    //   words.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(decks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    POST api/decks
// @desc      Post a new deck
// @access    Private
router.post('/', auth, async (req, res) => {
  try {
    const newDeck = new Deck({
      deck_name: req.body.deck_name,
      user: req.user.id
    });

    const deck = await newDeck.save();
    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/decks/:id
// @desc      Get a single deck
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (deck.user) {
      if (deck.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized ' });
      }
    }
    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    DELETE api/decks/:id
// @desc      Delete a deck by id
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ msg: 'Deck not found' });
    }

    //Check whether it's the authenticated user
    if (deck.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized ' });
    }

    await deck.remove();
    res.json({ msg: 'Deck deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
