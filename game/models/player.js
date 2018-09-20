var mongoose = require('mongoose');
var database = require('../../utils/database');


var playersCollection = {
    collection: 'players'
};

var playersBannedCollection = {
    collection: 'players_banned'
};


// var PlayerSchema =   mongoose.Schema(
//     {
//         uid: String,
//         name: String,
//         fb_id: String,
//         udid: String,
//         xp: Number,
//         gold: Number,
//         last_login: Date,
//         platform: String
//     },
//     playersCollection
// );
var PlayerSchema =  database.getSchemaObject(
    {
        uid: String,
        name: String,
        fb_id: String,
        udid: String,
        xp: Number,
        gold: Number,
        last_login: Date,
        platform: String
    },
    playersCollection
);


var PlayerBannedSchema = database.getSchemaObject({
    uid : String,
    bane_type : String,
    reason : String
});

var PlayerModel = database.getModelByName('player', PlayerSchema);
var PlayerBannedModel = database.getModelByName('playerBanned', PlayerBannedSchema);

async function findPlayer(keys) {
    console.log("Player.FindPlayer");
    try {
        let players = await database.findResults(keys, PlayerModel)
            .catch(
                function (reason) {
                    console.log("Promise is rejected : findPlayer ::" + reason)
                });
        return players;
    }
    catch (error) {
        throw (error);
    }
}

async function createPlayer(values) {
    console.log("Player.CreatePlayer");
    try {
        let record = await database.insertRecord(values, PlayerModel)
            .catch(
                function (reason) {
                    console.log("Promise is rejected : createPlayer ::" + reason)
                });
        return record;
    }
    catch (error) {
        throw (error);
    }
}

async function findBannedPlayer(keys)
{
    try {
        let records = await database.findResults(keys,PlayerBannedModel).catch(reason=> console.log("[player:findBannedPlayers " + reason));
        
        return records;
    }
    catch(error)
    {
        throw(error);
    }
}




module.exports = {
    PlayerSchema,
    playersCollection,
    PlayerModel,
    findPlayer,
    createPlayer
};


