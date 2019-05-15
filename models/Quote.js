const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { DB_URL } = require('../config')

const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(DB_URL, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
autoIncrement.initialize(connection);

const quoteSchema = new Schema({
    quoteId: Number,
    character: String,
    quote: String
});

quoteSchema.plugin(autoIncrement.plugin, {model: 'Quote', field: 'quoteId'});
const Quote = model('quote', quoteSchema);

module.exports = Quote;