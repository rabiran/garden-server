
const { dbGetAllowed, dbGetAllowedById, dbAddAllowed, dbUpdateAllowed, dbDeleteAllowed } = require('../repository');

const getAllAllowed = async (req, res) => {
    const res = await dbGetAllowed();
    res.json(res);
}

const getAllowed = async (req, res) => {
    const { id } = req.params;
    const res = await dbGetAllowedById(id);
    res.json(res);
}

const addAllowed = async (req, res) => {
    const data = req.body;
    const res = await dbAddAllowed(data);
    res.json(res);
}

const updateAllowed = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const res = await dbUpdateAllowed(id, data);
    res.json(res);
}

const deleteAllowed = async (req, res) => {
    const { id } = req.params;
    const res = await dbDeleteAllowed(id);
    res.send('ok');
}

module.exports = { getAllAllowed, getAllowed, addAllowed, updateAllowed, deleteAllowed }