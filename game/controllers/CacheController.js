var cardsModel = require('../models/card');
var chestsModel = require('../models/chest');
var rewardsModel = require('../models/reward');
var gameElementsModel = require('../models/gameElements');

var Cache = {
    cards : [],
    chests : [],
    rewards : [],
    gameelements : [],

    cardsDict : {},
    chestsDict : {},
    rewardsDict : {},
    gameelementsDict : {},
    refreshCache :async function()
    {
        Cache.cards = await cardsModel.getAllCards();
        Cache.cards.forEach(element => {
            Cache.cardsDict[element["id"]] = element;
        });
        console.log("Cards cache is refreshed " + (Cache.cards.length));

        Cache.chests = await chestsModel.getAllChests();
        Cache.chests.forEach(element => {
            Cache.chestsDict[element["id"]] = element;
        });
        console.log("Chests cache is refreshed" + (Cache.chests.length));

        Cache.rewards = await rewardsModel.getAllRewards();

        Cache.rewards.forEach(element => {
            Cache.rewardsDict[element["id"]] = element;
        });
        console.log("Rewards cache is refreshed " + Cache.rewards.length);


        Cache.gameelements = await gameElementsModel.getAllGameElements();
        Cache.gameelements.forEach(element => {
            Cache.gameelementsDict[element["id"]] = element;
        });
        console.log("GameElements cache is refreshed : " + Cache.gameelements.length);
    },
    getChestById : function(chestId)
    {
        return Cache.chestsDict[chestId];
    },
    getRewardForId: function(rewardId)
    {
        return Cache.rewards[rewardId];
    },
    getRewardByRewardId(rewardId)
    {
        return Cache.rewards.find(element => element["rwid"] === rewardId);
    }
};

module.exports =  Cache;

