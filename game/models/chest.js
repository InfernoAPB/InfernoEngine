var mongoose = require('mongoose');
var database = require('../../utils/database');
var property = require('./misc');

var chests_collection = {
    collection: 'chests'
}

var ChestSchema = database.getSchemaObject({
    id:String,
    unlock_duration:Number,
    rewards:[],
    image:String,
    description:String
},
chests_collection);

var ChestModel = database.getModelByName('chest', ChestSchema);


async function getAllChests()
{
    var allChests = await database.findResults({},ChestModel);
    return allChests;
}


module.exports = {
    ChestSchema,
    ChestModel,
    getAllChests
};

