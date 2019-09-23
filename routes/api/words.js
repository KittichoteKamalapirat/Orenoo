const express = require('express');
const Word = require('../../models/Word');
const router = express.Router();
const axios = require('axios');
const auth = require('../../middleware/auth');
var ObjectId = require('mongodb').ObjectID;

// For Scraping
const request = require('request');
const cheerio = require('cheerio');

// @ route    POST api/words
// @desc      Add a new word
// @access    Private
router.post('/:deck_id', auth, async (req, res) => {
  try {
    let newWord = new Word({
      user: req.user.id,
      deck: ObjectId.isValid(req.params.deck_id) ? req.params.deck_id : null,
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
      synonym: [],
      inSentence: [],
      youdao: [],
      hippo: []
    });

    // Scrape for dictionary information

    // Google Dictionary
    try {
      const response = await axios.get(
        `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${req.body.word}&lang=en`
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
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }

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
      // res.status(500).send('Server Error');
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
      // res.status(500).send('Server Error');
    }

    // Sentence Example
    try {
      const response = await axios.get(
        `https://sentence.yourdictionary.com/${req.body.word}`
      );
      const $ = cheerio.load(response.data);

      $('.voting_li').each((index, value) => {
        if (index < 8) {
          const content = $(value)
            .find('.li_content')
            .text()
            .replace(/\s\s+/g, '');

          newWord.example.push(content);
        }
      });
      $('.sentence.component').each((index, value) => {
        if (index < 8) {
          const content = $(value)
            .text()
            .replace(/\s\s+/g, '');
          newWord.example.push(content);
        }
      });
    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server Error');
    }

    // Thai
    try {
      const response = await axios.get(
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
      // res.status(500).send('Server Error');
    }

    // word in sentence
    try {
      const response = await axios.get(
        `https://wordsinasentence.com/${req.body.word}-in-a-sentence/`
      );
      const $ = cheerio.load(response.data);
      $('p').each((index, value) => {
        if (index > 2) {
          let sentence = $(value).text();
          if (sentence.trim() !== '') {
            newWord.inSentence.push(sentence);
          }
        }
      });
    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server Error');
    }

    //youdao chinese Dictionary

    try {
      const response = await axios.get(
        `http://dict.youdao.com/w/${req.body.word}`
      );
      const $ = cheerio.load(response.data);

      $('.trans-container')
        .first()
        .find('ul li')
        .each((index, value) => {
          const list = $(value).text();
          newWord.youdao.push(list);
          // console.log(newWord.youdao);
        });
    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server Error');
    }
    try {
      const response = await axios.get(
        `https://www.wordhippo.com/what-is/sentences-with-the-word/${req.body.word}.html`
      );

      const $ = cheerio.load(response.data);
      $('.exv2row1').each((index, value) => {
        const sen = $(value).text();
        newWord.hippo.push(sen);
      });

      $('.exv2row2').each((index, value) => {
        const sen = $(value).text();
        newWord.hippo.push(sen);
      });
    } catch (err) {
      console.error(err.message);
    }
    // ____________________________________BEFORE SAVE____________________________________
    console.log(newWord);

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
      newWord.mnemonic.length !== 0 ||
      newWord.inSentence.length !== 0
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
// @desc      Get all the words in a deck
// @access    private
router.get('/:deck_id', auth, async (req, res) => {
  try {
    const words = await Word.find({
      user: req.user.id,
      deck: req.params.deck_id
    });
    words.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/words
// @desc      Get all the words in a deck
// @access    private
router.get('/default-deck/:deck_id', auth, async (req, res) => {
  try {
    const words = await Word.find({
      deck: req.params.deck_id
    });
    words.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/words
// @desc      Get all the words for a user
// @access    private

router.get('/', auth, async (req, res) => {
  try {
    console.log('hi');
    const words = await Word.find({
      user: req.user.id
    });
    console.log('length');
    console.log(words.length);
    words.sort((a, b) => new Date(b.date) - new Date(a.date));
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

// @ route    PUT api/words/toggleflag/:id
// @desc      Flag and Unflag a word (toggle)
// @access    Private
router.put('/toggleflag/:id', auth, async (req, res) => {
  try {
    let word = await Word.findById(req.params.id);
    word.flagged = !word.flagged;
    await word.save();
    return res.json(word.flagged);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// trying to update all the words
// router.put('/', auth, async (req, res) => {
//   try {
//     console.log('make sure it is called');
//     let words = await Word.find({ user: req.user.id });

//     // kittichoteshane@gmail.com = 5d3438a8bde148428871ee02
//     //manhattan text completion 5d58d1a37486f821acdef5f2
//     //Magoosh = 5d5cc58d2a3d435b61bc9224
//     //52 common 5d5cc98dc7cebc5c5375e6d8
//     words.forEach(async word => {
//       try {
//         word.deck = ObjectId('5d5cc98dc7cebc5c5375e6d8');
//         word.user = ObjectId('5d3438a8bde148428871ee02');
//         console.log(word);
//         await word.save();
//       } catch (err) {
//         console.error(err.message);
//       }
//     });
//     console.log('Update Done');
//     return res.json(words);
//   } catch (err) {
//     res.status(500).send('Server Error');
//     console.log(err.message);
//   }
// });

// router.delete('/haha/delete-no-deck', auth, async (req, res) => {
//   try {
//     console.log('hi0');
//     if (req.user.id == '5d3438a8bde148428871ee02') {
//       console.log('hi');
//       const words = await Word.find({ user: req.user.id });
//       console.log('h2');
//       words.map(async (word, index) => {
//         if (!word.deck) {
//           await word.remove();
//           console.log(index);
//         }
//       });
//       res.json({ a: 'b' });
//     } else {
//       console.log('not shane');
//     }
//     //delete if Kittishane and have no decks
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
module.exports = router;
