const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {console.log(`listening on ${PORT}`)})

app.get('/', (req, res) => {
    res.send('Welcome to index');
})

app.post('/', (req, res) => {
    res.send('You posted!')
})