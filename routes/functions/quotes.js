const Quote = require("../../models/Quote");

const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const findQuoteById = async id => {
  const quote = await Quote.findOne({ quoteId: id }).exec();
  return quote;
};

const getQuoteIdRange = async () => {
  const olderDoc = Quote.findOne({})
    .sort({ quoteId: "asc" })
    .limit(1)
    .select("quoteId")
    .exec();

  const recentDoc = Quote.findOne({})
    .sort({ quoteId: "desc" })
    .limit(1)
    .select("quoteId")
    .exec();

  const [{ quoteId: minId }, { quoteId: maxId }] = await Promise.all([
    olderDoc,
    recentDoc
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
  getQuotesByCharacter
};
