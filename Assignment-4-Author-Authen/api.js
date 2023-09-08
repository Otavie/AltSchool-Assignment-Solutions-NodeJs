const express = require('express');
const routes = require('./routes');
const PORT = 54321;

const app = express();

app.use(express.json());
app.use('/', routes)

app.get('*', (req, res) =>{
    res.status(404).send({
        data: null,
        error: 'Route Not Found!'
    });
})

app.listen(PORT, () =>{
    console.log(`Server is running on PORT http://localhost:${PORT}`)
});