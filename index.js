const express = require('express');
const app = express();

const quoteRouter = require('./routes/quotesAPI');

const port = process.env.port || 5000;

app.use(express.json());

//Redirecting all API calls to use the API router
app.use('/api/quotes', quoteRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});