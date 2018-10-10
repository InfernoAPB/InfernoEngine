// var playerModule = require('../models/player');
// var userProto = require('../proto_source/User_pb');
// var requestProto = require('../proto_source/Request_pb');
// var SharedEnums = require('../proto_source/SharedEnums_pb');
// var uuidGenerator = require('../../encryption/UuidGenerator');
// var protoUtil = require('../misc/ProtoUtil');


// async function processRequest(request, responses) {

//     var userCreateObject = userProto.UserCreate.deserializeBinary(request.getPayload());
//     var requestId = request.getId();
//     var response = new requestProto.Response();
//     var userCreateResponse = new userProto.CreateUserResponseProto();

//     var name = userCreateObject.getName();
//     var fb_id = userCreateObject.getFbId();
//     fb_id = fb_id === ""?null:fb_id;
//     var udid = userCreateObject.getUdid();
//     var platform = userCreateObject.getPlatform();

//     response.setId(requestId);
//     response.setType(SharedEnums.ResponseType.CREATE_NEW_USER_RESPONSE);
//     response.setStatus(SharedEnums.ResponseStatus.FAIL);

//     var players = null;
//     var found = false;

//     try {
//         players = await playerModule.findPlayer({ $or: [{ fb_id: fb_id }, { udid: udid }] });
//     }
//     catch (error) {
//         throw (error);
//     }

//     if (players != undefined && players.length > 0) {
//         player = players[0]
//         console.log("Player found : " + player);
//         found = true;
//         response.setStatus(SharedEnums.ResponseStatus.USER_EXIST);
//         userCreateResponse.setMessage(`Player with facebookid : ${fb_id} or ${udid} already exist`);
//         userCreateResponse.setStatus(SharedEnums.ResponseStatus.USER_EXIST);
//         userCreateObject.setPayload(null);
//         response.setPayload(userCreateResponse.serializeBinary())
//         responses.addGameResponse(response.serializeBinary())//callback(error, response.serializeBinary());
//     }
//     else {
//         console.log("Creating player : " + name);
//         var userId = uuidGenerator.getUuid();
//         var record = await playerModule.createPlayer({
//             uid: userId,
//             name: name,
//             fb_id: fb_id,
//             udid: udid,
//             xp: 50,
//             gold: 1000,
//             last_login: new Date(),
//             platform: platform,
//             gems: 30,
//             trophies:0,
//             clan_id:null,
//             items_unlocked:[],
//             items_in_progress:[],
//             slots:["","","",""]        
//         })
//         .catch(reason => console.log("Error occured while creating player : " + reason));

//         console.log("Creating player success with player: " + record);
//         var user = protoUtil.getUserProfileFromPlayerObject(record);
        
//         response.setStatus(SharedEnums.ResponseStatus.SUCCESS);
//         userCreateResponse.setMessage(`Player with facebookid : ${fb_id} or ${udid} successfully created`);
//         userCreateResponse.setStatus(SharedEnums.ResponseStatus.SUCCESS);
//         userCreateResponse.setPayload(user.serializeBinary());
//         response.setPayload(userCreateResponse.serializeBinary());
//         responses.addGameResponse(response.serializeBinary());
//         var player
//     }
//     console.log("Finished creating player");
//     return responses;
// }


var CreatePlayerController = {

playerModule  : null,
userProto     : null,
requestProto  : null,
SharedEnums   : null,
uuidGenerator : null,
protoUtil     : null,

    init:function()
    {
        CreatePlayerController.playerModule = require('../models/player');
        CreatePlayerController.userProto = require('../proto_source/User_pb');
        CreatePlayerController.requestProto = require('../proto_source/Request_pb');
        CreatePlayerController.SharedEnums = require('../proto_source/SharedEnums_pb');
        CreatePlayerController.uuidGenerator = require('../../encryption/UuidGenerator');
        CreatePlayerController.protoUtil = require('../misc/ProtoUtil');
    },
    processRequest : async function (request, responses) {
        var userCreateObject = CreatePlayerController.userProto.UserCreate.deserializeBinary(request.getPayload());
        var requestId = request.getId();
        var response = new CreatePlayerController.requestProto.Response();
        var userCreateResponse = new CreatePlayerController.userProto.CreateUserResponseProto();
    
        var name = userCreateObject.getName();
        var fb_id = userCreateObject.getFbId();
        fb_id = fb_id === ""?null:fb_id;
        var udid = userCreateObject.getUdid();
        var platform = userCreateObject.getPlatform();
    
        response.setId(requestId);
        response.setType(CreatePlayerController.SharedEnums.ResponseType.CREATE_NEW_USER_RESPONSE);
        response.setStatus(CreatePlayerController.SharedEnums.ResponseStatus.FAIL);
    
        var players = null;
        var found = false;
    
        try {
            players = await CreatePlayerController.playerModule.findPlayer({ $or: [{ fb_id: fb_id }, { udid: udid }] });
        }
        catch (error) {
            throw (error);
        }
    
        if (players != undefined && players.length > 0) {
            player = players[0]
            console.log("Player found : " + player);
            found = true;
            response.setStatus(CreatePlayerController.SharedEnums.ResponseStatus.USER_EXIST);
            userCreateResponse.setMessage(`Player with facebookid : ${fb_id} or ${udid} already exist`);
            userCreateResponse.setStatus(CreatePlayerController.SharedEnums.ResponseStatus.USER_EXIST);
            userCreateObject.setPayload(null);
            response.setPayload(userCreateResponse.serializeBinary())
            responses.addGameResponse(response.serializeBinary())//callback(error, response.serializeBinary());
        }
        else {
            console.log("Creating player : " + name);
            var userId = CreatePlayerController.uuidGenerator.getUuid();
            var record = await CreatePlayerController.playerModule.createPlayer({
                uid: userId,
                name: name,
                fb_id: fb_id,
                udid: udid,
                xp: 50,
                gold: 1000,
                last_login: new Date(),
                platform: platform,
                gems: 30,
                trophies:0,
                clan_id:null,
                items_unlocked:[],
                items_in_progress:[],
                slots:["","","",""]
            })
            .catch(reason => console.log("Error occured while creating player : " + reason));
    
            console.log("Creating player success with player: " + record);
            var user = CreatePlayerController.protoUtil.getUserProfileFromPlayerObject(record);
            
            response.setStatus(CreatePlayerController.SharedEnums.ResponseStatus.SUCCESS);
            userCreateResponse.setMessage(`Player with facebookid : ${fb_id} or ${udid} successfully created`);
            userCreateResponse.setStatus(CreatePlayerController.SharedEnums.ResponseStatus.SUCCESS);
            userCreateResponse.setPayload(user.serializeBinary());
            response.setPayload(userCreateResponse.serializeBinary());
            responses.addGameResponse(response.serializeBinary());
            var player
        }
        console.log("Finished creating player");
        return responses;
    }
}

CreatePlayerController.init();

module.exports = CreatePlayerController;