module.exports = (obj) => {
    const objCopy = { ...obj };
    const pickedArray = objCopy.shadowUsers.map(element => element.domainUser);
    objCopy.arrayToPick = pickedArray;
    return objCopy;
}