const express = require('express');
const PORT = 5412;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello Boss')
})

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})