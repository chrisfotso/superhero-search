const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quoteSchema = new Schema({
    quoteId: Number,
    character: String,
    quote: String
});

const Quote = model('quote', quoteSchema);

module.exports = Quote;