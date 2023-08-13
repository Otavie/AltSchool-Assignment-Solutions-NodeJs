const http = require('http');
const fs = require('fs');
const PORT = 4321;

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        const homePage = fs.readFileSync('./index.html');
        res.setHeader('content-type', 'text/html');
        res.writeHead(200);
        res.write(homePage);
        res.end();
    }

    if (req.url.endsWith('.html') && req.method === 'GET'){
        try{
            const newURL = req.url.split('/');
            const fileName = fs.readFileSync(`./${newURL[1]}`);
            res.setHeader('content-type', 'text/html');
            res.writeHead(200);
            res.write(fileName);
            res.end();

        } catch (err){
            const notFoundPage = fs.readFileSync('./404.html');
            res.setHeader('content-type', 'text/html');
            res.writeHead(500);
            res.write(notFoundPage);
            res.end();
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
