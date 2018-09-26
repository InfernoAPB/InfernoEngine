
var Util = {
    userProto : null,
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
        let userProfile =  new Util.userProto.UserProfile();
        userProfile.setUsername(playerObject["name"]);
        userProfile.setXp(playerObject["xp"]);
        userProfile.setGold(playerObject["gold"]);
        userProfile.setGems(playerObject["gems"]);
        userProfile.setTrophies(playerObject["trophies"]);
        userProfile.setClanid(playerObject["clan_id"]);
        userProfile.setPlatform(playerObject["platform"]);
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

    init:function()
    {
        Util.userProto = require('../proto_source/User_pb');
    }
}
Util.init();

module.exports = Util;