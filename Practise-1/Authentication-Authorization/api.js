const express = require('express');
const routes = require('./routes');
const PORT = 43134;

const app = express();

app.use(express.json());
app.use('', routes);

// app.get('/', )

app.get('*', (req, res) => {
    res.status(404).json({
        data: null,
        error: 'Route not found!'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
});