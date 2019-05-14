const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quoteSchema = new Schema({
    quoteId: String,
    character: String,
    quote: String
});

const Quote = model('quote', quoteSchema);