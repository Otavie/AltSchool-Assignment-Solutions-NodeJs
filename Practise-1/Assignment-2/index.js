const http = require('http');
const fs = require('fs');
const PORT = 3030;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const file = fs.readFileSync('./index.html');
        res.setHeader('content-type', 'text\html');
        res.writeHead(200);
        res.write(file);
        res.end();
    }

    if (req.url.endsWith('.html') && req.method === 'GET') {
        const splitURL = req.url.split('/');
        console.log(splitURL);
    }
});



server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})