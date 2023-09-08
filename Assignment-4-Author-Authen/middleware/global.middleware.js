const path = require('path');
const fsPromise = require('fs').promises;
const usersDBPath = path.join(__dirname, "..", "users", "users.database.json");

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers;

    if (!authHeader.api_key) {
        return res.status(401).json({
            message: 'You are not authenticated! Missing API Key!'
        });
    }

    try {
        // Read the Contents of the Users' Database JSON File
        const fileContent = await fsPromise.readFile(usersDBPath, 'utf-8');
        const usersDB = JSON.parse(fileContent);

        const existingUser = usersDB.find((user) => {
            return user.api_key === authHeader.api_key;
        });

        if (existingUser) {
            req.user = existingUser;
            next();
        } else {
            return res.status(401).json({
                message: 'You are not authenticated! Invalid API Key!'
            });
        }

    } catch (error) {
        console.log('Error reading user database: ', error);
        return res.status(500).json({
            message: 'Internal Server Error!'
        });
    }
}

const checkAdminRole = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            data: null,
            error: 'Forbidden: Admin access required!'
        });
    }
}

module.exports = {
    authenticateUser,
    checkAdminRole
}