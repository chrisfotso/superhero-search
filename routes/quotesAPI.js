const express = require('express');
const router = express.Router();

const dummyQuotes = require('../dummyQuotes');
const {
  getRandomIndex
} = require('./functions/quotes')

router.get('/', (req, res) => {
  res.status(200).send(dummyQuotes);
})

router.get('/:id', (req, res) => {
  const resultArr = dummyQuotes.filter(quote => quote.id === Number(req.params.id));

  if (!resultArr.length) {
    return res.status(404).send({
      err: `Quote with id of ${req.params.id} was not found.`
    });
  }

  return res.status(200).send(resultArr[0]);
})

router.get('/random/:num', (req, res) => {
  const [smallestId, largestId] = [0, dummyQuotes.length - 1];

  const desiredQuoteCount = Number(req.params.num)
  let quoteCount = 0;

  if (desiredQuoteCount === 1) {
    const id = getRandomIndex(smallestId, largestId);

    return res.status(200).send(dummyQuotes[id])

  } else {
    const result = []

    while (quoteCount < desiredQuoteCount) {
      const id = getRandomIndex(smallestId, largestId);
      result.push(dummyQuotes[id]);
      quoteCount++;
    }

    return res.status(200).send(result);
  }

})

module.exports = router;