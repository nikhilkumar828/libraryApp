const config = require('../../dbconfig.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Catalog = db.Catalog;

module.exports = {
    addItem,
    searchItems,
    rentItem,
    releaseItem,
    getAll,
    getById,
    updateCatalog,
    delete: _delete
};

async function getAll() {
    return await Catalog.find().select();
}

async function getById(id) {
    return await Catalog.findById(id).select();
}

async function addItem(catalogParam) {
    // validate

    const cat = await Catalog.findOne({ title: catalogParam.title });

    if (cat) { //already in db, increment by 1
        cat.quantity += 1;

        const r = await Catalog.update(
            { title: cat.title},
            { $inc: { quantity: 1}}
        );
        if (r.ok ) return ('Quantity for ' + catalogParam.title + ' updated by 1');
        else {
            throw 'Error updating Catalog item "' + catalogParam.title;
        }
    }
    else { //add new book
        const catalog = new Catalog(catalogParam);

        // save catalog
        await catalog.save();

        return ('Catatlog item ' + catalogParam.title + ' successfully added!');
    }
}

async function updateCatalog(id, catalogParam) {
    const catalog = await Catalog.findById(id);

    // validate
    if (!catalog) throw 'Catalog not found';
    if (catalog.title !== catalogParam.title && await Catalog.findOne({ title: catalogParam.title })) {
        throw 'Catalog item "' + catalogParam.title + '" is already taken';
    }

    // copy catalogParam properties to catalog
    Object.assign(catalog, catalogParam);

    await catalog.save();
}

async function _delete(id) {
    await Catalog.findByIdAndRemove(id);
}

async function searchItems(search) {
    let q = {};

    q[search.key] = {'$regex': search.value, '$options': 'i'};
    // validate

    const cat = await Catalog.find( q );

    return cat;
}

async function rentItem(rent) {
    const catalog = await Catalog.findById(rent.bookID);
    
    if (!catalog) throw `Book with id: ${rent.bookID} not found`;

    if(catalog.quantity === catalog.rentedCount)
    throw `All books with id: ${rent.bookID} have been rented`;

    const update = await Catalog.update (
        {_id: rent.bookID},
        { $push: { 
            rentedBy: {
            'ownerID': rent.ownerID,
            'startDate': rent.startDate,
            'daysToRent': rent.daysToRent
        }}}
    );

    if(update.ok === 1) {
        catalog.rentedCount = catalog.rentedBy.length + 1;
        await catalog.save();
        return 'Rented book successfully';
    }

    throw 'Error renting book';
}

async function releaseItem(rent) {
    const catalog = await Catalog.findById(rent.bookID);
    
    if (!catalog) throw `Book with id: ${rent.bookID} not found`;

    if(catalog.rentedCount === 0)
    throw `No book with id: ${rent.bookID} has been rented`;

    const update = await Catalog.update (
        {_id: rent.bookID},
        { $pull: { 
            rentedBy: {
            'ownerID': rent.ownerID
        }}}
    );

    if(update.ok === 1) {
        const updatedCatalog = await Catalog.findById(rent.bookID);
        updatedCatalog.rentedCount = updatedCatalog.rentedBy.length;
        await updatedCatalog.save();
        return 'Released book successfully';
    }

    throw 'Error renting book';
}