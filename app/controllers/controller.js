

const getAllAllowed = (req, res) => {
    res.json('ok');
}

const getAllowed = (req, res) => {
    throw new Error('TFU BAD');
    res.send(200);
}

const addAllowed = (req, res) => {
    res.send(200);
}

const updateAllowed = (req, res) => {
    res.send(200);
}

const deleteAllowed = (req, res) => {
    res.send(200);
}

module.exports = { getAllAllowed, getAllowed, addAllowed, updateAllowed, deleteAllowed }