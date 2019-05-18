const express = require("express");
const mongoose = require("mongoose");

const { DB_URL } = require("./config");

const app = express();

const quoteRouter = require("./routes/quotesAPI");

const port = process.env.PORT || 5000;

app.use(express.json());

//Redirecting all API calls to use the API router
app.use("/api/quotes", quoteRouter);

const initServer = () => {
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

const initDB = () => {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  return mongoose
    .connect(DB_URL, options)
    .then(() => console.log("Connected to database"))
    .catch(e => console.error(e));
};

initServer();
initDB();
