var mongoose = require('mongoose');
var database = require('../../utils/database');
var property = require('./misc');


var cards_collection = {
    collection: 'cards'
}

var CardSchema =  database.getSchemaObject(
    {
        id:String,
        properties:[property.PropertySchema],
        image:String,
        description:String
    },
    cards_collection
);

var CardModel = database.getModelByName('card', CardSchema);



async function getAllCards()
{
    var allCards = await database.findResults({},CardModel);
    return allCards;
}


module.exports = {
    CardSchema,
    CardModel,
    getAllCards
};

