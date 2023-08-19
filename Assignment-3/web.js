const express = require('express')
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const PORT = 4321;
const app = express();

const indexPage = path.join(__dirname, 'public', 'index.html');
const aboutPage = path.join(__dirname, 'public', 'about.html');
const notFoundPage = path.join(__dirname, 'public', '404.html');

app.use(express.static('public'));

app.get('/index.html', async (req, res) =>{
    const file = await fsPromise.readFile(indexPage);
    res.status(200).send(file);
})

app.get('/about.html', async (req, res) =>{
    const file = await fsPromise.readFile(aboutPage);
    res.status(200).send(file);
})

app.get('*', (req, res) => {
    res.status(404).sendFile(notFoundPage)
})




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
