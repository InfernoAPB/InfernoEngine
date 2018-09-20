var cardsModel = require('../models/card');
var chestsModel = require('../models/chest');
var rewardsModel = require('../models/reward');
var gameElementsModel = require('../models/gameelement');

var cards = null;
var chests = null;
var rewards = null;
var gameelements = null;


function refreshCache()
{
    var cards =  cardsModel.getAllCards().then(()=>{console.log("Cards Cache is Refreshed")});
    var chests =  chestsModel.getAllChests().then(()=>{console.log("Chests Cache is Refreshed")});
    var rewards =  rewardsModel.getAllRewards().then(()=>{console.log("Rewards Cache is Refreshed")});
    var gameelements =  gameElementsModel.getAllGameElements().then(()=>{console.log("GameElements Cache is Refreshed:")});
}


module.exports = {
    refreshCache,
}