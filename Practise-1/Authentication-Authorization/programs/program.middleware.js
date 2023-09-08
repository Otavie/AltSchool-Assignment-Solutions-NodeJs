const programMiddleware = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            data: null,
            error: 'Request must have a body'
        })
    }

    next();
}

module.exports = {
    checkBody: programMiddleware
    // programMiddleware
}