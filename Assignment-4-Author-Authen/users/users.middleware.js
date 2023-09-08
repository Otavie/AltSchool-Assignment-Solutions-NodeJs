const validateUserCreation = (req, res, next) => {
    if (!req.body.username || !req.body.username.trim()) {
        return res.status(400).json({
            error: 'Username is Required!'
        });
    }

    if (!req.body.email || !req.body.email.trim()) {
        return res.status(400).json({
            error: 'Email is Required!'
        });
    }

    if (!req.body.password || !req.body.password) {
        return res.status(400).json({
            error: 'Password is Required!'
        })
    }

    next();
}

module.exports = {
    validateUserCreation
}