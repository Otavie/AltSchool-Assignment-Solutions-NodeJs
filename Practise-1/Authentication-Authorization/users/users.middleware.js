const validateUserCreation = (req, res, next) => {
    if (!req.body.username || !req.body.username.trim()) {
        return res.status(400).json({
            error: 'Username is required!'
        })
    }

    if (!req.body.password || !req.body.password.trim()) {
        return res.status(400).json({
            error: 'Password is required!'
        })
    }

    next();
}

module.exports = {
    validateUserCreation
}