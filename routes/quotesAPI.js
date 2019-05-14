const express = require('express');
const router = express.Router();

const dummyQuotes = require('../dummyQuotes');
const Quote = require('../models/Quote');

const {
  getRandomIndex
} = require('./functions/quotes')

router.post('/', async (req, res) => {
  const { quoteId, character, quote } = req.body;

  if (!quoteId || !character || !quote) {
    res.status(400).send({
      err: 'Please enter a quote ID, character name, and quote'
    })
  }

  try {
    const newQuote = {quoteId, character, quote}
    const savedQuote = await Quote.create(newQuote);
    
    return res.status(201).send(savedQuote);

  } catch (error) {
    res.status(500).send({msg: 'Unknown error occured', error})
  }
})

router.get('/', (req, res) => {
  res.status(200).send(dummyQuotes);
})

router.get('/id/:id', (req, res) => {
  const resultArr = dummyQuotes.filter(quote => quote.id === Number(req.params.id));

  if (!resultArr.length) {
    return res.status(404).send({
      err: `Quote with id of ${req.params.id} was not found.`
    });
  }

  return res.status(200).send(resultArr[0]);
})

router.get('/random/qty/:num?', (req, res) => {
  const [smallestId, largestId] = [0, dummyQuotes.length - 1];
  let desiredQuoteCount = req.params.num ? Number(req.params.num) : 1;

  if (isNaN(desiredQuoteCount)) {
    return res.status(400).send({
      err: 'The quantity must not have any non-number characters'
    })
  }

  if (desiredQuoteCount === 1) {
    const id = getRandomIndex(smallestId, largestId);

    return res.status(200).send(dummyQuotes[id]);

  } else {
    const result = []

    while (desiredQuoteCount > 0) {
      const id = getRandomIndex(smallestId, largestId);
      result.push(dummyQuotes[id]);
      desiredQuoteCount--;
    }

    return res.status(200).send(result);
  }
})

router.get('/random/character', (req, res) => {
  const { name } = req.query
  
  const filteredQuotes = dummyQuotes.filter(({ character} ) => name.toLowerCase() === character.toLowerCase());
  
  const [smallestIndex, largestIndex] = [0, filteredQuotes.length - 1];
  const randomQuoteIndex = getRandomIndex(smallestIndex, largestIndex);

  return res.status(200).send(filteredQuotes[randomQuoteIndex]);
})

router.get('/character', (req, res) => {
  const { name } = req.query
  const filteredQuotes = dummyQuotes.filter(({ character} ) => name.toLowerCase() === character.toLowerCase());

  res.send(filteredQuotes);
})

module.exports = router;