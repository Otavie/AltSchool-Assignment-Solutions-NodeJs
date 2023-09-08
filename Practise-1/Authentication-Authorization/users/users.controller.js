const db = require('./users.database');

const createUser = (req, res) => {
    const user = req.body;
    user.api_key = `${user.username}_${user.password}`;

    // if (user.username === 'otavie') {
    //     user.user_type = 'admin'
    // } else {
    //     user.user_type = 'user';
    // }

    db.users.push(user);

    return res.status(201).json({
        message: 'User created successfully!',
        users: db.users
    })
}


module.exports = {
    createUser
}