const express = require('express');
const path = require('path');
const fsPromise = require('fs').promises;
const PORT = 54321;
const ITEM_FILE = './apple-laptops.json';
// const itemsRouter = require('./routes/apiRouter');

const app = express();

// Body Parser Middleware
app.use(express.json());

const readItemsFromFile = async (req, res, next) =>{
    try {
        const fileContent = await fsPromise.readFile(ITEM_FILE, 'utf-8');
        req.items = JSON.parse(fileContent);
        next();
    } catch (error) {
        res.status(500).json({
            data: null,
            error: 'Internal Server Error!'
        });
    }
}

// Get All Items
app.get('/items', readItemsFromFile, (req, res) => {
    res.status(200).json({ data: req.items, error: null })
});

// Get One Item
app.get('/items/:id', readItemsFromFile, (req, res) => {
    const itemID = req.params.id;
    const item = req.items.find(item => item.id === itemID);

    if (item) {
        res.status(200).json({ data: item, error: null });
    } else {
        res.status(404).json({ data: null, error: 'Item Not Found!' });
    }
});

// Delete an Item
app.delete('/items/:id', readItemsFromFile, async (req, res) => {
    const itemID = req.params.id;
    const updatedItems = req.items.filter(item => item.id !== itemID);

    req.items = updatedItems;
    await fsPromise.writeFile(ITEM_FILE, JSON.stringify(updatedItems, null, 4), 'utf-8');

    res.status(200).json({ data: updatedItems, error: null });
})

// Create an Item
app.post('/items', readItemsFromFile, async (req, res) => {
    try {
        const newItem = { ...req.body, id: Math.floor(Math.random() * 1000).toString() };
        req.items.push(newItem);
    
        await fsPromise.writeFile(ITEM_FILE, JSON.stringify(req.items, null, 4), 'utf-8');
    
        res.status(201).json({ data: req.items, error: null })    
    } catch (error) {
        res.status(500).json({ data: null, error: 'Item Cannot Be Added!' })
    }
})

// Update Using PUT
app.put('/items/:id', readItemsFromFile, async (req, res) => {
    const itemID = req.params.id;
    const itemIndex = req.items.findIndex(item => item.id === itemID);

    if (itemIndex !== -1) {
        req.items[itemIndex] = { ...req.body, id: itemID };
        await fsPromise.writeFile(ITEM_FILE, JSON.stringify(req.items, null, 4), 'utf-8');
        res.status(200).json({ data: req.items, error: null });
    } else {
        res.status(404).json({ data: null, error: 'Item Not Found!' });
    }
});

// Update Using PATCH
app.patch('/items/:id', readItemsFromFile, async (req, res) => {
    const itemID = req.params.id;
    const itemIndex = req.items.findIndex(item => item.id === itemID);

    if (itemIndex !== -1){
        req.items[itemIndex] = { ...req.items[itemIndex], ...req.body };
        await fsPromise.writeFile(ITEM_FILE, JSON.stringify(req.items, null, 4), 'utf-8');
        res.status(200).json({ data: req.items, error: null });
    } else {
        res.status(404).json({ data: null, error: 'Item Not Found!' });
    }
});

app.get('*', (req, res) =>{
    res.status(404).send({ data: null, error: 'Route Not Found!' });
})

app.listen(PORT, () =>{ console.log(`Server is running on port ${PORT}`) });