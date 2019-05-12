const express = require('express');
const app = express();

const port = process.env.port || 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})