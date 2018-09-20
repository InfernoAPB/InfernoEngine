var mongoose = require('mongoose');
var database = require('../../utils/database');
var property = require('./misc');

var game_element_collection = {
    collection: 'game_elements'
}

var GameElementSchema = database.getSchemaObject({
    id:String,
    currency:[property.Currency]
    },
game_element_collection);

var GameElementModel = database.getModelByName('gameElement', GameElementSchema);


async function getAllGameElements()
{
    var allChests = await database.findResults({},GameElementModel);
    return allChests;
}

module.exports = {
    GameElementSchema,
    GameElementModel,
    getAllGameElements
};

