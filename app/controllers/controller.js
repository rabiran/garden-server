
const { dbGetAllowed, dbGetAllowedById, dbAddAllowed, dbUpdateAllowed, dbDeleteAllowed } = require('../repository');

const getAllAllowed = async (req, res) => {
    const response = await dbGetAllowed();
    res.json(response);
}

const getAllowed = async (req, res) => {
    const { id } = req.params;
    const response = await dbGetAllowedById(id);
    res.json(response);
}

const addAllowed = async (req, res) => {
    const data = req.body;
    const response = await dbAddAllowed(data);
    res.json(response);
}

const updateAllowed = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const response = await dbUpdateAllowed(id, data);
    res.json(response);
}

const deleteAllowed = async (req, res) => {
    const { id } = req.params;
    const response = await dbDeleteAllowed(id);
    res.send('ok');
}

module.exports = { getAllAllowed, getAllowed, addAllowed, updateAllowed, deleteAllowed }