const express = require("express");
const router = express.Router();

const dummyQuotes = require("../dummyQuotes");
const Quote = require("../models/Quote");

const {
  getRandomIndex,
  findQuoteById,
  getQuoteIdRange,
  getQuotesByCharacter
} = require("./functions/quotes");

//METHOD: POST
//DESCRIPTION: Adds quote to Mongo database
router.post("/", async (req, res) => {
  const { character, quote } = req.body;

  if (!character || !quote) {
    return res.status(400).send({
      err: "Please enter a character name and a quote"
    });
  }

  try {
    const savedQuote = await Quote.create({ character, quote });

    return res.status(201).send(savedQuote);
  } catch (error) {
    return res.status(500).send({
      msg: "Unknown error occured",
      error
    });
  }
});

//METHOD: GET
//DESCRIPTION: Returns all quotes
router.get("/", async (req, res) => {
  const quotes = await Quote.find({}).exec();
  return res.status(200).send(quotes);
});

//METHOD: GET
//DESCRIPTION: Returns one quote with the specified id number
//PARAMETER 'id': id of the quote you want to get
router.get("/id/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      err: `Parameter 'id' must have numerical characters only`
    });
  }

  const quote = await findQuoteById(req.params.id);

  if (quote === null) {
    return res.status(404).send({
      err: `Quote with id of ${req.params.id} was not found.`
    });
  }

  return res.status(200).send(quote);
});

//METHOD: GET
//DESCRIPTION: Returns a specified number of random quotes
//PARAMETER 'num': number of random quotes you want to get
//                 if parameter 'num' is left out, one random quote is returned
router.get("/random/qty/:num?", async (req, res) => {
  const [smallestId, largestId] = await getQuoteIdRange();
  const result = [];
  const desiredQuoteCount = req.params.num ? Number(req.params.num) : 1;
  let quoteCount = 0;

  if (isNaN(desiredQuoteCount)) {
    return res.status(400).send({
      err: "The quantity must not have any non-number characters"
    });
  }

  while (quoteCount < desiredQuoteCount) {
    const id = getRandomIndex(smallestId, largestId);
    const quote = await findQuoteById(id);
    result.push(quote);
    quoteCount++;
  }

  return desiredQuoteCount > 1
    ? res.status(200).send(result)
    : res.status(200).send(result[0]);
});

//METHOD: GET
//DESCRIPTION: Returns one random quote from a specified character
//QUERY PARAMETER 'name': name of whatever character you want a random quote from
router.get("/random/character", async (req, res) => {
  const { name } = req.query;
  const quotesByCharacter = await getQuotesByCharacter(name);

  if (!quotesByCharacter.length) {
    return res.status(404).send({
      err: `No quotes found by character named ${name}`
    });
  }

  const [smallestIndex, largestIndex] = [0, quotesByCharacter.length - 1];
  const randomQuoteIndex = getRandomIndex(smallestIndex, largestIndex);

  return res.status(200).send(quotesByCharacter[randomQuoteIndex]);
});

//METHOD: GET
//DESCRIPTION: Returns all quotes from specified character
//QUERY PARAMETER 'name': name of whatever character you want a random quote from
router.get("/character", async (req, res) => {
  const { name } = req.query;
  const quotesByCharacter = await getQuotesByCharacter(name);

  if (!quotesByCharacter.length) {
    return res.status(404).send({
      err: `No quotes found by character named ${name}`
    });
  }

  return res.send(quotesByCharacter);
});

module.exports = router;
