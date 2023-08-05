const http = require('http');
const PORT = 7000;

// Creation of http Server
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    // Returning Hello World on the Browser with the port number
    res.write('<h1>Hello World</h1>');
    res.end();
})

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})