const http = require('http');
const PORT = 3131;

const server = http.createServer((req, res) => {

})


server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})