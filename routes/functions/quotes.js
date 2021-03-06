const Quote = require("../../models/Quote");

const getAllQuotes = async (req, res) => {
  const quotes = await Quote.find({}).exec();
  return res.status(200).send(quotes);
};

const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const findQuoteById = async id => {
  const quote = await Quote.findOne({ quoteId: id }).exec();
  return quote;
};

const getQuoteIdRange = async () => {
  const oldestDoc = Quote.findOne({})
    .sort({ quoteId: "asc" })
    .limit(1)
    .select("quoteId")
    .exec();

  const newestDoc = Quote.findOne({})
    .sort({ quoteId: "desc" })
    .limit(1)
    .select("quoteId")
    .exec();

  const [{ quoteId: minId }, { quoteId: maxId }] = await Promise.all([
    oldestDoc,
    newestDoc
  ]);

  return [minId, maxId];
};

const getQuotesByCharacter = async characterName => {
  const quotesByCharacter = await Quote.find({
    character: new RegExp(characterName, "i")
  }).exec();

  return quotesByCharacter;
};

module.exports = {
  getRandomIndex,
  findQuoteById,
  getQuoteIdRange,
  getQuotesByCharacter,
  getAllQuotes
};
