var database = require('../../utils/database');
var property = require('./misc');


var gameElement_collection = {
    collection: 'gameelements'
}

var GameElementSchema =  database.getSchemaObject(
    {
        id:String,
        currency:[property.Currency]
    },
    gameElement_collection
);

var GameElementModel = database.getModelByName('gameElement', GameElementSchema);

async function getAllGameElements()
{
    var allCards = await database.findResults({},GameElementModel);
    return allCards;
}


module.exports = {
    GameElementSchema,
    GameElementModel,
    getAllGameElements
};

