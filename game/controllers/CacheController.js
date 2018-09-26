var cardsModel = require('../models/card');
var chestsModel = require('../models/chest');
var rewardsModel = require('../models/reward');
var gameElementsModel = require('../models/gameElements');

var Cache = {
    cards : [],
    chests : [],
    rewards : [],
    gameelements : [],
    refreshCache : () =>
    {
        cardsModel.getAllCards().then((cards) => {
            Cache.cards = cards;
            console.log("Cards cache is refreshed " + (Cache.cards.length));
        });
    
        chestsModel.getAllChests().then((chests) => {
            Cache.chests = chests;
            console.log("Chests cache is refreshed" + (Cache.chests.length));
        });
    
        rewardsModel.getAllRewards().then((rewards) => {
            Cache.rewards = rewards;
            console.log("Rewards cache is refreshed " + Cache.rewards.length);
        });
    
        gameElementsModel.getAllGameElements().then((gameelements) => {
            Cache.gameelements = gameelements;
            console.log("GameElements cache is refreshed : " + Cache.gameelements.length);
        });
    }
};

module.exports =  Cache;

