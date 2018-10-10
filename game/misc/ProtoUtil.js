
var Util = {
    user : require('../proto_source/User_pb'),
    gameEvents:require('../proto_source/GameEvents_pb'),
    data:require('../proto_source/Data_pb'),
    requestProto:require('../proto_source/Request_pb'),
    sharedEnums:require('../proto_source/SharedEnums_pb'),

    getUserProfileFromPlayerObject : function(playerObject)
    {
        // {
        //     uid: String,
        //     name: String,
        //     fb_id: String,
        //     udid: String,
        //     xp: Number,
        //     gold: Number,
        //     gems:Number,
        //     last_login: Date,
        //     platform: String,
        //     trophies:Number,
        //     clan_id:String,
        //     items_unlocked:[String],
        //     items_in_progress:[JSON],
        //      slots:[String]
        // },
        let userProfile =  new Util.user.UserProfile();
        userProfile.setUsername(playerObject["name"]);
        userProfile.setXp(playerObject["xp"]);
        userProfile.setGold(playerObject["gold"]);
        userProfile.setGems(playerObject["gems"]);
        userProfile.setTrophies(playerObject["trophies"]);
        userProfile.setClanid(playerObject["clan_id"]);
        userProfile.setPlatform(playerObject["platform"]);
        userProfile.setUserId(playerObject["uid"]);

        var slots = playerObject["slots"];
        slots.forEach(element => {
            userProfile.addSlots(element);
        });

        var itemsUnlocked = playerObject["items_unlocked"];

        itemsUnlocked.forEach(element => {
            userProfile.addItemsunlocked(element);
        });

        var items_in_progress = playerObject["items_in_progress"];

        items_in_progress.forEach(element => {
            userProfile.addItemsinprogress(JSON.stringify(element));
        });

        return userProfile;
    },
    getRewardFromRewardRecord:function(record)
    {
        // id:String,
        // rwid:String,
        // type:String,
        // count:Number
        let reward =  new Util.data.Reward();
        
        reward.setId(record["id"]);
        reward.setRewardid(record["rwid"]);
        reward.setType(record["type"]);
        reward.setCount(record["count"]);
        
        return reward;
    }
    
}
module.exports = Util;