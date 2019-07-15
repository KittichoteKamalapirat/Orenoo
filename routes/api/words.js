const express = require('express');
const Word = require('../../models/Word');
const router = express.Router();
const axios = require('axios');
// For Scraping
const request = require('request');
const cheerio = require('cheerio');

// @ route    POST api/words
// @desc      Add a new word
// @access    Public
router.post('/', async (req, res) => {
  let newWord = new Word({
    word: req.body.word,
    dict: {
      noun: [],
      verb: [],
      adjective: [],
      adverb: [],
      idioms: [],
      example: []
    },
    thai: [],
    mnemonic: []
  });

  try {
    // Scrape for dictionary information

    // Dictionary.com;
    await request(
      `https://www.dictionary.com/browse/${req.body.word}`,
      async (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const dict = $('.css-996xur').each((index, value) => {
            let speech = $(value)
              .find('h3.css-sdwj8v')
              .text();
            if (/\s/.test(speech)) {
              speech = speech.split(' ')[0];
            }
            console.log(speech);
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
              case 'adjective':
                $(value)
                  .find('.e1q3nk1v3')
                  .each((index, value) => {
                    newWord.dict.adjective.push($(value).text());
                  });
                break;
              case 'adverb':
                $(value)
                  .find('.e1q3nk1v3')
                  .each((index, value) => {
                    newWord.dict.ådverb.push($(value).text());
                  });
                break;
              case 'Idioms':
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
      console.log('===================================');
      if ($('.css-gkae64').length === 0) {
        $('.css-q7ic04').each((index, value) => {
          const synonym = $(value).text();
          newWord.synonym.push(synonym);
        });
      }
    } catch (err) {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
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
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }

    // ____________________________________BEFORE SAVE____________________________________
    console.log(newWord);
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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  try {
    let word = await Word.findById(req.params.id);
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
