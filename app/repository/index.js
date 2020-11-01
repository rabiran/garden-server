const schema = require('./schema');

const dbGetAllowed = async () => {
    const people = await schema.find({});
    return people;
}

const dbGetAllowedById = async (id) => {
    const human = await schema.findById(id);
    return human;
}

const dbAddAllowed = async (data) => {
    const obj = new schema(data);
    const human = await obj.save();
    return human;
}

const dbUpdateAllowed = async (_id, data) => {
    const human = await schema.findByIdAndUpdate(_id, data, {new: true});
    return human;
}

const dbDeleteAllowed = async (_id) => {
    const human = await schema.findByIdAndRemove(_id);
    return human;
}

module.exports = { dbGetAllowed, dbGetAllowedById, dbAddAllowed, dbUpdateAllowed, dbDeleteAllowed}