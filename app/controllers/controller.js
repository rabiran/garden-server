
const { ServerError } = require('../helpers/errorHandler');
const { dbGetAllowed, dbGetAllowedById, dbAddAllowed, dbUpdateAllowed, dbDeleteAllowed } = require('../repository');
const {getPersonById} = require('../helpers/apiUtils/index')

const getAllAllowed = async (req, res) => {

    let response = await dbGetAllowed().catch(err =>{
        throw new ServerError(500, 'failed contacting garden db');
    });
    
    let persons =[];
    let userDetails;
    for (user of response){
        user = user.toObject();
        userDetails = await getPersonById(user.id).catch(err => {
            throw new ServerError(500, 'failed contacting kartoffel db');
        });
        userDetails.isAdmin = user.isAdmin;
        persons.push(userDetails);
    }
    res.json(persons);
}

const getAllowed = async (req, res) => {
    const { id } = req.params;
    const response = await dbGetAllowedById(id).catch(error =>{
        throw new ServerError(500, 'failed contacting garden db');
    });
    res.json(response);
}

const addAllowed = async (req, res) => {
    const data = req.body;   
    const foundDuplicate = await dbGetAllowedById(data.id);
    if(foundDuplicate !== null){
        throw new ServerError(400,'found duplicate in db!')
    }
    const response = await dbAddAllowed(data).catch(error => {
        throw new ServerError(500, 'failed contacting garden db');
    });
    res.json(response);
}

const updateAllowed = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const response = await dbUpdateAllowed(id, data).catch(error=>{
        throw new ServerError(500, 'failed contacting garden db');
    });
    res.json(response);
}

const deleteAllowed = async (req, res) => {
    const { id } = req.params;
    const response = await dbDeleteAllowed(id).catch(error=>{
        throw new ServerError(500, 'failed contacting garden db');
    });
    res.status(200);
    res.send('deleted successfully');
}

module.exports = { getAllAllowed, getAllowed, addAllowed, updateAllowed, deleteAllowed }