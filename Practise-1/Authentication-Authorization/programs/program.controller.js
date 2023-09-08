const programs = [];

const createProgram = (req, res) => {
    res.status(200).json({ data: programs });
}

const updateProgram = (req, res) => {
    res.status(200).json({ data: programs });
}

const getPrograms = (req, res) => {
    res.status(200).json({ data: programs });
}

module.exports = {
    createProgram,
    updateProgram,
    getPrograms
}