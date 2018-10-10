var RewardUserController = {
    //gameEvents: require('../proto_source/GameEvents_pb'),
    // requestProto: require('../proto_source/Request_pb'),
    // SharedEnums: require('../proto_source/SharedEnums_pb'),
    cache: require('../controllers/CacheController'),
    protoUtil: require('../misc/ProtoUtil'),
    userModel: require('../models/player'),
    init: function () {
    },
    processRequest:async function(request,responses)
    {
        let response = new RewardUserController.protoUtil.requestProto.Response();
        response.setStatus(RewardUserController.protoUtil.sharedEnums.ResponseStatus.FAIL);
        response.setId(request.getId());
        response.setType(RewardUserController.protoUtil.sharedEnums.ResponseType.REWARD_USER_RESPONSE);
        let rewardEvent = RewardUserController.protoUtil.gameEvents.RewardEvent.deserializeBinary(request.getPayload());
        let eventType = rewardEvent.getEventtype();
        let userId = rewardEvent.getUserId();
        let users = await RewardUserController.userModel.findPlayer({uid:userId});

        let availableSlotIndex = undefined;
        var user = null;
        let slotsArray = null;

        if(users != null && users.length > 0)
        {
            user = users[0];
            slotsArray = user["slots"];
        }
        
        for(let index = 0;index < slotsArray.length;index++)
        {
            if(slotsArray[index] === "") {
                availableSlotIndex = index;
                break;
            }
        }

        if(eventType === RewardUserController.protoUtil.gameEvents.RewardEvent.RewardEventType.BATTLE_WIN)
        {
            if(availableSlotIndex != undefined)
            {
                let rewardChest = RewardUserController.getRandomChestForEvent();
                let rewardObject = RewardUserController.cache.getRewardByRewardId(rewardChest["id"]);
                rewardProto = RewardUserController.protoUtil.getRewardFromRewardRecord(rewardObject);
                rewardEvent.addRewards(rewardProto);
                rewardEvent.setSlot(availableSlotIndex);
                rewardEvent.setUserId(user.uid);
                response.setPayload(rewardEvent.serializeBinary());
                response.setStatus(RewardUserController.protoUtil.sharedEnums.ResponseStatus.SUCCESS);
                slotsArray[availableSlotIndex] = rewardObject.rwid;
                var updatedRecord = await RewardUserController.userModel.updatePlayer({uid:user.uid},{slots:slotsArray});

                // if(updatedRecord != null)
                // {
                //     let profileUpdateMainResponse = new RewardUserController.protoUtil.requestProto.Response();
                //     profileUpdateMainResponse.setStatus(RewardUserController.protoUtil.sharedEnums.ResponseStatus.SUCCESS);
                //     profileUpdateMainResponse.setId(request.getId());
                //     profileUpdateMainResponse.setType(RewardUserController.protoUtil.sharedEnums.ResponseType.USER_UPDATE_RESPONSE);
                //
                //     let updatedProfileResponse = new RewardUserController.protoUtil.user.UserProfileUpdateResponse();
                //     updatedProfileResponse.updatedprofile = RewardUserController.protoUtil.getUserProfileFromPlayerObject(updatedRecord);
                //     profileUpdateMainResponse.setPayload(updatedProfileResponse.serializeBinary());
                //     responses.addGameResponse(profileUpdateMainResponse.serializeBinary());
                //     console.log("User Profile Update Successful");
                // }
                //responses.addGameResponse(response.serializeBinary());
            }
        }
        responses.addGameResponse(response.serializeBinary());
        return responses;
    },

    getRandomRewardForEvent: function()
    {
        var rand = Math.floor(Math.random() *  RewardUserController.cache.rewards.length);
        return RewardUserController.cache.rewards[rand];
    },

    getRandomChestForEvent: function()
    {
        var rand = Math.floor(Math.random() *  RewardUserController.cache.chests.length);
        return RewardUserController.cache.chests[rand];
    }
}


//RewardUserController.init();
module.exports = RewardUserController;