const fsPromise = require('fs').promises;
const path = require('path')
const ITEM_FILE = path.join(__dirname, '.', 'items.database.json')

// Get all Items (Admin and Other Users)
const retrieveAll = (req, res) => {
    res.status(200).json({
        data: req.items,
        error: null
    })
}

// Get One Items (Admin and Other Users)
const retrieveOne = (req, res) => {
    const urlID = req.params.id;
    const foundItem = req.items.find((item) => item.id === urlID);

    if (foundItem) {
        res.status(200).json({
            data: foundItem,
            error: null
        });
    } else {
        res.status(404).json({
            data: null,
            error: 'Item Not Found!'
        });
    }
}

// Update an Item Using PUT (Admin Privilege Only)
const updateItemPut = async (req, res) => {
    const urlID = req.params.id;
    const itemIndex = req.items.findIndex((item) => item.id === urlID);

    if (itemIndex !== -1) {
        req.items[itemIndex] = { ...req.body, id: urlID };
        await fsPromise.writeFile(ITEM_FILE, JSON.stringify(req.items, null, 4), 'utf-8');
        res.status(200).json({
            data: req.items,
            error: null
        });
    } else {
        res.status(404).json({
            data: null,
            error: 'Item Not Found!'
        });
    }
}

// Update an Item Using PATCH (Admin Privilege Only)
const updateItemPatch = async(req, res) => {
    const urlID = req.params.id;
    const itemIndex = req.items.findIndex((item) => item.id === urlID);

    if (itemIndex !== -1) {
        req.items[itemIndex] = { ...req.items[itemIndex], ...req.body };
        await fsPromise.writeFile(ITEM_FILE, JSON.stringify(req.items, null, 4), 'utf-8');
        res.status(200).json({
            data: req.items,
            error: null
        });
    } else {
        res.status(404).json({
            data: null,
            error: 'Item Not Found!'
        })
    }
}

// Post Items to the Database (Admin Privilege Only)
const createItem = async (req, res) => {
    try {
        const newItem = {
            ...req.body,
            id: Math.floor(Math.random() * 1000).toString()
        };
        req.items.push(newItem);

        await fsPromise.writeFile(ITEM_FILE, JSON.stringify(req.items, null, 4), 'utf-8');

        res.status(201).json({
            data: req.items,
            error: null
        });

    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({
            data: null,
            error: 'Item Cannot be Added!'
        });
    }
}

const deleteItem = async (req, res) => {
    try {
        const urlID = req.params.id;
        const remainingItems = req.items.filter((item) => item.id !== urlID);

        req.items = remainingItems;
        await fsPromise.writeFile(ITEM_FILE, JSON.stringify(remainingItems, null, 4), 'utf-8');
        res.status(204).end();
    } catch (error) {
        res.status(404).json({
            data: null,
            error: 'Item Cannot Be Found!'
        });
    }
}

module.exports = {
    retrieveAll,
    retrieveOne,
    updateItemPut,
    updateItemPatch,
    createItem,
    deleteItem
}