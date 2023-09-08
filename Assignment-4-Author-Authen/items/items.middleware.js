const fsPromise = require('fs').promises;
const path = require('path')
const ITEM_FILE = path.join(__dirname, '.', 'items.database.json')

// Middleware to Read Items from File
const readItemsFromFile = async(req, res, next) => {
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

module.exports = {
    readItemsFromFile
}