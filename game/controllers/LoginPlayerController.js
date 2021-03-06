// var playerModule = require('../models/player');
// var startUpProto = require('../proto_source/StartUp_pb');
// var requestProto = require('../proto_source/Request_pb');
// var SharedEnums = require('../proto_source/SharedEnums_pb');
// var apiSettings = require('../misc/APISettings');
// var protoUtil = require('../misc/ProtoUtil');

// async function processRequest(request,responses)
// {
//     var startUpRequest = startUpProto.StartUp.deserializeBinary(request.getPayload());
//     var requestId = request.getId();
 
//     var response = new requestProto.Response();
//     response.setType(SharedEnums.ResponseType.STARTUP_RESPONSE);
//     response.setStatus(SharedEnums.ResponseStatus.FAIL);
//     var startUpResponse = new startUpProto.StartUpResponse();
//     response.setId(requestId);

//     let apiVersion  = await apiSettings.getAPIVersion();
//     let versionArray = apiVersion.split('.');
//     let api_major = parseInt(versionArray[0]);
//     let api_minor = parseInt(versionArray[1]);
//     let api_patch = parseInt(versionArray[2]);

//     console.log("Current Api Version %s.%s.%s",api_major,api_minor,api_patch);
    
//     let fb_id = startUpRequest.getFbid();
//     let udid = startUpRequest.getUdid();
//     let platform = startUpRequest.getPlatform();
//     let version = startUpRequest.getVersion();
//     let staticDataHash = startUpRequest.getStaticdatahash();

//     let client_major = version.getMajornumber();
//     let client_minor = version.getMinornumber();
//     let client_patch = version.getPatchnumber();
 
//     let isMajor = false;
//     let isMinor = false;
//     let isPatch = false;

//     if(api_major > client_major)
//     {
//         console.log("[MAJOR UPDATE] api version %s", apiVersion,version);
//         startUpResponse.setStartupstatus(startUpProto.StartUpResponse.StartupResponseStatus.MAJOR_UPDATE);
//         startUpResponse.setPlayerstatus(startUpProto.StartUpResponse.PlayerStatus.PLAYER_STATUS_NONE);
//         startUpResponse.setMessage("We have lots of new updates. Head over to app store to download the update");
//         response.setStatus(SharedEnums.ResponseStatus.SUCCESS);
//         response.setPayload(startUpResponse.serializeBinary());
//         responses.addGameResponse(response.serializeBinary());
//         isMajor = true;
//         return responses;
//     }
//     else if(api_minor > client_minor)
//     {
//         startUpResponse.setStartupstatus(startUpProto.StartUpResponse.StartupResponseStatus.MINOR_UPDATE);
//         startUpResponse.setMessage("We have few awesome new updates for you. Head over to app store to download the update");
//         isMinor = true;
//     }
//     else {
//         isPatch = true;
//         startUpResponse.setStartupstatus(startUpProto.StartUpResponse.StartupResponseStatus.NO_UPDATE);
//         startUpResponse.setMessage("NO UPDATE");
//     }

//     let players = null;
    
//     if(fb_id !== "")
//         players = await playerModule.findPlayer({ $or: [{ fb_id: fb_id }, { udid: udid }] });
//     else
//         players = await playerModule.findPlayer({ $or: [{ udid: udid }] });

//     if(players != undefined && players.length > 0)
//     {
//         let player = players[0];
//         let playerProto =  protoUtil.getUserProfileFromPlayerObject(player)
//         startUpResponse.setPlayerstatus(startUpProto.StartUpResponse.PlayerStatus.PLAYER_FOUND);
//         startUpResponse.setPlayerprofile(playerProto);
//         response.setStatus(SharedEnums.ResponseStatus.SUCCESS);
//         response.setPayload(startUpResponse.serializeBinary());
//         responses.addGameResponse(response.serializeBinary());
//     }
//     else
//     {
//         startUpResponse.setPlayerstatus(startUpProto.StartUpResponse.PlayerStatus.PLAYER_NOT_FOUND);
//         response.setStatus(SharedEnums.ResponseStatus.SUCCESS);
//         response.setPayload(startUpResponse.serializeBinary());
//         responses.addGameResponse(response.serializeBinary());
//     }
//     return responses;
// }


// Login Controller Singleton which 
var LoginController = {
    playerModule : null,
    startUpProto : null,
    requestProto : null,
    SharedEnums  : null,
    apiSettings  : null,
    protoUtil    : null,
    init:function()
    {
        LoginController.playerModule = require('../models/player');
        LoginController.startUpProto = require('../proto_source/StartUp_pb');
        LoginController.requestProto = require('../proto_source/Request_pb');
        LoginController.SharedEnums = require('../proto_source/SharedEnums_pb');
        LoginController.apiSettings = require('../misc/APISettings');
        LoginController.protoUtil = require('../misc/ProtoUtil');
    },
    processRequest:async function (request,responses){
        var startUpRequest = LoginController.startUpProto.StartUp.deserializeBinary(request.getPayload());
        var requestId = request.getId();
     
        var response = new LoginController.requestProto.Response();
        response.setType(LoginController.SharedEnums.ResponseType.STARTUP_RESPONSE);
        response.setStatus(LoginController.SharedEnums.ResponseStatus.FAIL);
        var startUpResponse = new LoginController.startUpProto.StartUpResponse();
        response.setId(requestId);
    
        let apiVersion  = await LoginController.apiSettings.getAPIVersion();
        let versionArray = apiVersion.split('.');
        let api_major = parseInt(versionArray[0]);
        let api_minor = parseInt(versionArray[1]);
        let api_patch = parseInt(versionArray[2]);
    
        console.log("Current Api Version %s.%s.%s",api_major,api_minor,api_patch);
        
        let fb_id = startUpRequest.getFbid();
        let udid = startUpRequest.getUdid();
        let platform = startUpRequest.getPlatform();
        let version = startUpRequest.getVersion();
        let staticDataHash = startUpRequest.getStaticdatahash();
    
        let client_major = version.getMajornumber();
        let client_minor = version.getMinornumber();
        let client_patch = version.getPatchnumber();
     
        let isMajor = false;
        let isMinor = false;
        let isPatch = false;
    
        if(api_major > client_major)
        {
            console.log("[MAJOR UPDATE] api version %s", apiVersion,version);
            startUpResponse.setStartupstatus(LoginController.startUpProto.StartUpResponse.StartupResponseStatus.MAJOR_UPDATE);
            startUpResponse.setPlayerstatus(LoginController.startUpProto.StartUpResponse.PlayerStatus.PLAYER_STATUS_NONE);
            startUpResponse.setMessage("We have lots of new updates. Head over to app store to download the update");
            response.setStatus(LoginController.SharedEnums.ResponseStatus.SUCCESS);
            response.setPayload(startUpResponse.serializeBinary());
            responses.addGameResponse(response.serializeBinary());
            isMajor = true;
            return responses;
        }
        else if(api_minor > client_minor)
        {
            startUpResponse.setStartupstatus(LoginController.startUpProto.StartUpResponse.StartupResponseStatus.MINOR_UPDATE);
            startUpResponse.setMessage("We have few awesome new updates for you. Head over to app store to download the update");
            isMinor = true;
        }
        else {
            isPatch = true;
            startUpResponse.setStartupstatus(LoginController.startUpProto.StartUpResponse.StartupResponseStatus.NO_UPDATE);
            startUpResponse.setMessage("NO UPDATE");
        }
    
        let players = null;
        
        if(fb_id !== "")
            players = await LoginController.playerModule.findPlayer({ $or: [{ fb_id: fb_id }, { udid: udid }] });
        else
            players = await LoginController.playerModule.findPlayer({ $or: [{ udid: udid }] });
    
        if(players != undefined && players.length > 0)
        {
            let player = players[0];
            let playerProto =  LoginController.protoUtil.getUserProfileFromPlayerObject(player)
            startUpResponse.setPlayerstatus(LoginController.startUpProto.StartUpResponse.PlayerStatus.PLAYER_FOUND);
            startUpResponse.setPlayerprofile(playerProto);
            response.setStatus(LoginController.SharedEnums.ResponseStatus.SUCCESS);
            response.setPayload(startUpResponse.serializeBinary());
            responses.addGameResponse(response.serializeBinary());
        }
        else
        {
            startUpResponse.setPlayerstatus(LoginController.startUpProto.StartUpResponse.PlayerStatus.PLAYER_NOT_FOUND);
            response.setStatus(LoginController.SharedEnums.ResponseStatus.SUCCESS);
            response.setPayload(startUpResponse.serializeBinary());
            responses.addGameResponse(response.serializeBinary());
        }
        return responses;
    }
}

LoginController.init();

module.exports = LoginController;