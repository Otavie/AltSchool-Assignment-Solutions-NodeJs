const fsPromise = require('fs').promises;
const path = require('path');
const USER_FILE = path.join(__dirname, '.', 'users.database.json');

// Register a User
const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Automatically Set Role to admin Based on the Email
        const role = (email === 'otavie@gmail.com' || email === 'life@gmail.com') ? 'admin' : 'employee';

        // Automatically Generate API Key
        const api_key = `${username}_${password}`;

        const newUser = {
            username, password, email, role, api_key,
            id: Math.floor(Math.random() * 1000).toString()
        };

        // Read Existing Users from the Database
        const existingUser = await fsPromise.readFile(USER_FILE, 'utf-8');
        const users = JSON.parse(existingUser);

        // Check for Duplicate Using Email and Username
        const duplicateUser = users.find((user) => user.username === newUser.username);
        const duplicateEmail = users.find((user) => user.email === newUser.email);

        if (duplicateUser || duplicateEmail) {
            return res.status(400).json({
                data: null,
                error: 'Username or email already exist!'
            });
        }

        users.push(newUser);

        await fsPromise.writeFile(USER_FILE, JSON.stringify(users, null, 4), 'utf-8');
        
        res.status(201).json({
            data: newUser,
            error: null
        });

    } catch (error) {
        console.log('Error registering a user: ', error);
        res.status(500).json({
            data: null,
            error: 'User Registration Failed!'
        });
    }
}

module.exports = {
    registerUser
}