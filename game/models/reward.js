var mongoose = require('mongoose');
var database = require('../../utils/database');
var property = require('./misc');

var rewards_collection = {
    collection: 'rewards'
}
var RewardSchema = database.getSchemaObject({
    id:String,
    rewardId:String,
    type:String,
    count:Number
},
rewards_collection);

var RewardModel = database.getModelByName('reward', RewardSchema);


async function getAllRewards()
{
    var allRewards = await database.findResults({},RewardModel);
    return allRewards;
}

module.exports = {
    RewardSchema,
    RewardModel,
    getAllRewards
};

