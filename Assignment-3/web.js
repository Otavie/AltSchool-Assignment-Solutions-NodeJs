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

const handleIndex = async (req, res) => {
    const file = await fsPromise.readFile(indexPage);
    res.status(200).send(file);
}

const handleAbout = async (req, res) => {
    const file = await fsPromise.readFile(aboutPage);
    res.status(200).send(file);
}

const handle404 = async (req, res) => {
    res.status(400).sendFile(notFoundPage);
}




app.get('/index.html', handleIndex)
app.get('/about.html', handleAbout)
app.get('*', handle404)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
