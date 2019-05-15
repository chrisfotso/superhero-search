const express = require('express');
const router = express.Router();

const dummyQuotes = require('../dummyQuotes');
const Quote = require('../models/Quote');

const {
  getRandomIndex
} = require('./functions/quotes')

//METHOD: POST
//DESCRIPTION: Adds quote to Mongo database
router.post('/', async (req, res) => {
  const {
    character,
    quote
  } = req.body;

  if (!character || !quote) {
    return res.status(400).send({
      err: 'Please enter a character name, and quote'
    })
  }

  try {
    const newQuote = {
      character,
      quote
    }
    
    const savedQuote = await Quote.create(newQuote);
    return res.status(201).send(savedQuote);
  } catch (error) {
    return res.status(500).send({
      msg: 'Unknown error occured',
      error
    })
  }
})

//METHOD: GET
//DESCRIPTION: Returns all quotes
router.get('/', (req, res) => {
  return res.status(200).send(dummyQuotes);
})

//METHOD: GET
//DESCRIPTION: Returns one quote with the specified id number
//PARAMETER 'id': id of the quote you want to get
router.get('/id/:id', (req, res) => {
  const resultArr = dummyQuotes.filter(quote => quote.id === Number(req.params.id));

  if (!resultArr.length) {
    return res.status(404).send({
      err: `Quote with id of ${req.params.id} was not found.`
    });
  }

  return res.status(200).send(resultArr[0]);
})

//METHOD: GET
//DESCRIPTION: Returns a specified number of random quotes
//PARAMETER 'num': number of random quotes you want to get
//                 if parameter 'num' is left out, one random quote is returned
router.get('/random/qty/:num?', (req, res) => {
  const [smallestId, largestId] = [0, dummyQuotes.length - 1];
  const result = [];
  const desiredQuoteCount = req.params.num ? Number(req.params.num) : 1
  let quoteCount = 0;

  if (isNaN(desiredQuoteCount)) {
    return res.status(400).send({
      err: 'The quantity must not have any non-number characters'
    })
  }

  while (quoteCount < desiredQuoteCount) {
    const id = getRandomIndex(smallestId, largestId);
    result.push(dummyQuotes[id]);
    quoteCount++;
  }

  return desiredQuoteCount > 1 
          ? res.status(200).send(result) 
          : res.status(200).send(result[0]);
})

//METHOD: GET
//DESCRIPTION: Returns one random quote from a specified character
//QUERY PARAMETER 'name': name of whatever character you want a random quote from
router.get('/random/character', (req, res) => {
  const {name} = req.query

  const filteredQuotes = dummyQuotes.filter(({character}) => name.toLowerCase() === character.toLowerCase());

  const [smallestIndex, largestIndex] = [0, filteredQuotes.length - 1];
  const randomQuoteIndex = getRandomIndex(smallestIndex, largestIndex);

  return res.status(200).send(filteredQuotes[randomQuoteIndex]);
})

//METHOD: GET
//DESCRIPTION: Returns all quotes from specified character
//QUERY PARAMETER 'name': name of whatever character you want a random quote from
router.get('/character', (req, res) => {
  const {name} = req.query
  
  const filteredQuotes = dummyQuotes.filter(({character}) => name.toLowerCase() === character.toLowerCase());

  return res.send(filteredQuotes);
})

module.exports = router;