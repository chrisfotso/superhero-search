const Quote = require("../../models/Quote");

const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const findQuoteById = async id => {
  const quote = await Quote.findOne({ quoteId: id }).exec();
  return quote;
};

module.exports = { getRandomIndex, findQuoteById };
