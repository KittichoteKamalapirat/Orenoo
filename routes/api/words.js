const express = require('express');
const Word = require('../../models/Word');
const router = express.Router();
const axios = require('axios');
const auth = require('../../middleware/auth');
// For Scraping
const request = require('request');
const cheerio = require('cheerio');

// @ route    POST api/words
// @desc      Add a new word
// @access    Private
router.post('/', auth, async (req, res) => {
  let newWord = new Word({
    user: req.user.id,
    word: req.body.word,
    dict: {
      noun: [],
      verb: [],
      adjective: [],
      adverb: [],
      idioms: []
    },
    google: {
      noun: [],
      verb: [],
      adjective: [],
      adverb: []
    },
    thai: [],
    mnemonic: [],
    example: [],
    synonym: []
  });

  // Scrape for dictionary information

  // Google Dictionary
  try {
    const response = await axios.get(
      `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${
        req.body.word
      }&lang=en`
    );
    const meaning = response.data[0].meaning;

    if (meaning.noun) {
      newWord.google.noun = meaning.noun;
    }
    if (meaning.verb) {
      newWord.google.verb = meaning.verb;
    }

    if (meaning.adjective) {
      newWord.google.adjective = meaning.adjective;
    }

    if (meaning.adverb) {
      newWord.google.adverb = meaning.adverb;
    }
  } catch (err) {
    console.log(err.message);
  }

  // Dictionary.com;
  try {
    await request(
      `https://www.dictionary.com/browse/${req.body.word}`,
      async (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const dict = $('.css-pnw38j').each((index, value) => {
            let speech = $(value)
              .find('h3.css-sdwj8v')
              .text()
              .substring(0, 4);
            if (/\s/.test(speech)) {
              speech = speech.substring(0, 4);
            }
            // console.log(speech);
            switch (speech) {
              case 'noun':
                $(value)
                  .find('.e1q3nk1v3')
                  .each((index, value) => {
                    newWord.dict.noun.push($(value).text());
                  });
                break;
              case 'verb':
                $(value)
                  .find('.e1q3nk1v3')
                  .each((index, value) => {
                    newWord.dict.verb.push($(value).text());
                  });
                break;
              case 'adje':
                $(value)
                  .find('.e1q3nk1v3')
                  .each((index, value) => {
                    newWord.dict.adjective.push($(value).text());
                  });
                break;
              case 'adve':
                $(value)
                  .find('.e1q3nk1v3')
                  .each((index, value) => {
                    newWord.dict.adverb.push($(value).text());
                  });
                break;
              case 'Idio':
                $(value)
                  .find('.e1q3nk1v3')
                  .each((index, value) => {
                    newWord.dict.idioms.push($(value).text());
                  });
                break;
            }
          });
        }
      }
    );

    // Synonym
    try {
      const response = await axios.get(
        `https://www.thesaurus.com/browse/${req.body.word}`
      );
      const $ = cheerio.load(response.data);
      $('.css-gkae64').each((index, value) => {
        const synonym = $(value).text();
        newWord.synonym.push(synonym);
      });
      if ($('.css-gkae64').length === 0) {
        $('.css-q7ic04').each((index, value) => {
          const synonym = $(value).text();
          newWord.synonym.push(synonym);
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    //menmonic
    try {
      const response = await axios.get(
        `https://mnemonicdictionary.com/?word=${req.body.word}`
      );
      const $ = cheerio.load(response.data);
      $('.mnemonics-slides .mnemonic-card').each((index, value) => {
        const content = $(value)
          .find('p')
          .text()
          .replace(/\s\s+/g, '');

        const footerText = $(value)
          .find('.card-footer ')
          .text()
          .replace(/\s\s+/g, ' ');

        const footerArray = footerText.trim().split(' ');
        const like = footerArray[0];
        const dislike = footerArray[1];

        const mnemonic = {
          content: content,
          like: like,
          dislike: dislike
        };
        newWord.mnemonic.push(mnemonic);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    // Sentence Example
    try {
      const response = await axios.get(
        `https://sentence.yourdictionary.com/${req.body.word}`
      );
      const $ = cheerio.load(response.data);

      $('.voting_li').each((index, value) => {
        const content = $(value)
          .find('.li_content')
          .text()
          .replace(/\s\s+/g, '');

        newWord.example.push(content);
      });
      $('.sentence.component').each((index, value) => {
        const content = $(value)
          .text()
          .replace(/\s\s+/g, '');
        newWord.example.push(content);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    // Thai
    try {
      const response = await axios(
        `https://dict.longdo.com/search/${req.body.word}`
      );
      const $ = cheerio.load(response.data);
      const table = $("b:contains('NECTEC')")
        .parent()
        .parent()
        .next();

      table.find('.search-result-table tr').each((index, value) => {
        let word = $(value)
          .find('td:first-child')
          .text()
          .trim();

        let allMeaning = $(value)
          .find('td:last-child')
          .text();
        let meaning = allMeaning.replace(/, See .*$/g, '').trim();

        let toPush = {
          word: word,
          meaning: meaning
        };
        newWord.thai.push(toPush);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    // ____________________________________BEFORE SAVE____________________________________
    // console.log(newWord);

    if (
      newWord.dict.noun.length !== 0 ||
      newWord.dict.verb.length !== 0 ||
      newWord.dict.adjective.length !== 0 ||
      newWord.dict.adverb.length !== 0 ||
      newWord.dict.idioms.length !== 0 ||
      newWord.google.noun.length !== 0 ||
      newWord.google.verb.length !== 0 ||
      newWord.google.adjective.length !== 0 ||
      newWord.google.adverb.length !== 0 ||
      newWord.thai.length !== 0 ||
      newWord.example.length !== 0 ||
      newWord.synonym.length !== 0 ||
      newWord.mnemonic.length !== 0
    ) {
      const word = await newWord.save();
      res.json(word);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/words
// @desc      Get all the words
// @access    private
router.get('/', auth, async (req, res) => {
  try {
    const beforeShuffle = await Word.find({ user: req.user.id });

    // randomize the order Fisher-Yates Shuffle
    const shuffle = array => {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    const words = shuffle(beforeShuffle);

    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/words/:id
// @desc      Get a single word
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    let word = await Word.findById(req.params.id);

    if (word.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized ' });
    }

    res.json(word);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    DELETE api/words/:id
// @desc      Delete a word by id
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);

    if (!word) {
      return res.status(404).json({ msg: 'Word not found' });
    }

    //Check whether it's the authenticated user
    if (word.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized ' });
    }

    await word.remove();
    res.json({ msg: 'Word deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
