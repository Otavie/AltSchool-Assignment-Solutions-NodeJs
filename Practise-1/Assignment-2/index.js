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
        try {
            const splitURL = req.url.split('/');
            const fileLocation = `./${splitURL[1]}`;
            const file = fs.readFileSync(fileLocation);
            res.setHeader('content-type', 'text\html').writeHead(200).write(file)
            res.end();
        } catch (error) {
            const file = fs.readFileSync('./404.html');
            res.setHeader('content-type', 'text/html').writeHead(404).write(file);
            res.end()
        }
    }
});



server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})