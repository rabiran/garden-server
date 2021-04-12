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
    let mainData = Object.assign(data,{_id: data.id});
    const obj = new schema(mainData);
    const human = await obj.save();
    return human;
}

const dbUpdateAllowed = async (id, data) => {
    const human = await schema.findByIdAndUpdate(id, data, {new: true});
    return human;
}

const dbDeleteAllowed = async (id) => {
    const human = await schema.findByIdAndRemove(id);
    return human;
}

module.exports = { dbGetAllowed, dbGetAllowedById, dbAddAllowed, dbUpdateAllowed, dbDeleteAllowed}