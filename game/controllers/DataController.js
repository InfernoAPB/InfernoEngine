// var dataClass = require('../proto_source/Data_pb');
// var requestProto = require('../proto_source/Request_pb');
// var SharedEnums = require('../proto_source/SharedEnums_pb');
// var cacheController = require('./CacheController');
// var cachedDataObject = null;
// async function processRequest(request, responses) {
//     var gameDataRequest = dataClass.DataRequest.deserializeBinary(request.getPayload());
//     var requestId = request.getId();

//     var response = new requestProto.Response();
//     response.setId(requestId);
//     response.setType(SharedEnums.ResponseType.LOAD_GAME_DATA_RESPONSE);
//     response.setStatus(SharedEnums.ResponseStatus.FAIL);
//     var gameDataResponse = new dataClass.DataResponse();
//     var data = getDataObject();

//     gameDataResponse.setHashmatched(false);
//     gameDataResponse.setData(data);
//     response.setPayload(gameDataResponse.serializeBinary());
//     responses.addGameResponse(response.serializeBinary());
//     return responses;
// }

// function getDataObject() {
//     if (cachedDataObject == null) {
//         var dataObject = new dataClass.Data();
//         cacheController.gameelements.forEach((gameElement)=>{
//             let gameElementProto = new dataClass.GameElement();
//             gameElementProto.setId(gameElement["id"]);
//             let currencyArray = gameElement["currency"];

//             currencyArray.forEach((currencyObject)=>
//             {
//                 let currency = new dataClass.Currency();
//                 currency.setType(currencyObject["type"]);
//                 currency.setValue(currencyObject["value"]);
//                 gameElementProto.addCurrency(currency);
//             });

//             dataObject.addGameelements(gameElementProto);
//         });

//         cacheController.cards.forEach((cardObject)=>{
//             let cardProto = new dataClass.Card();
//             cardProto.setId(cardObject["id"]);
//             var properties = cardObject["properties"];

//             properties.forEach((propertyObject)=>
//             {
//                 var json = JSON.stringify(propertyObject["value"]);
//                 var property = new dataClass.Property();
//                 property.setName(propertyObject["name"]);
//                 property.setJson(json);
//                 cardProto.addProperties(property);
//             });

//             cardProto.setImage(cardObject["image"]);
//             cardProto.setDescription(cardObject["description"]);

//             dataObject.addCards(cardProto);
//         });

//         cacheController.chests.forEach((chestObject)=>{
//             let chestProto = new dataClass.Chest();
//             chestProto.setId(chestObject["id"]);
//             chestProto.setName(chestObject["name"]);
//             var rewards = chestObject["rewards"];

//             rewards.forEach((rewardId)=>
//             {
//                 chestProto.addRewards(rewardId);
//             });

//             chestProto.setImage(chestObject["image"]);
//             chestProto.setDescription(chestObject["description"]);
//             dataObject.addChests(chestProto);
//         });

//         cacheController.rewards.forEach((rwdObject)=>{
//             let rewardProto = new dataClass.Reward();
//             rewardProto.setId(rwdObject["id"]);
//             rewardProto.setRewardid(rwdObject["rwid"]);
//             rewardProto.setType(rwdObject["type"]);
//             rewardProto.setCount(rwdObject["count"]);
//             dataObject.addRewards(rewardProto);
//         });

//         cachedDataObject = dataObject;
//     }
//     return cachedDataObject;
// }


var DataController = {

    dataClass: null,
    requestProto: null,
    SharedEnums: null,
    cacheController: null,
    cachedDataObject: null,

    init: function () {
        DataController.dataClass       = require('../proto_source/Data_pb');
        DataController.requestProto    = require('../proto_source/Request_pb');
        DataController.SharedEnums     = require('../proto_source/SharedEnums_pb');
        DataController.cacheController = require('./CacheController');

        if (DataController.cachedDataObject == null) {
            DataController.cacheController.refreshCache().then(function () {
                DataController.cachedDataObject = DataController.getDataObject();
            });

        }
    },

    processRequest: async function (request, responses) {
        var gameDataRequest = DataController.dataClass.DataRequest.deserializeBinary(request.getPayload());
        var requestId = request.getId();

        var response = new DataController.requestProto.Response();
        response.setId(requestId);
        response.setType(DataController.SharedEnums.ResponseType.LOAD_GAME_DATA_RESPONSE);
        response.setStatus(DataController.SharedEnums.ResponseStatus.FAIL);
        var gameDataResponse = new DataController.dataClass.DataResponse();
        var data = DataController.getDataObject();

        gameDataResponse.setHashmatched(false);
        gameDataResponse.setData(data);
        response.setPayload(gameDataResponse.serializeBinary());
        responses.addGameResponse(response.serializeBinary());
        return responses;
    },

    getDataObject: function () {
        if (DataController.cachedDataObject == null) {
            var dataObject = new DataController.dataClass.Data();
            DataController.cacheController.gameelements.forEach((gameElement) => {
                let gameElementProto = new DataController.dataClass.GameElement();
                gameElementProto.setId(gameElement["id"]);
                let currencyArray = gameElement["currency"];

                currencyArray.forEach((currencyObject) => {
                    let currency = new DataController.dataClass.Currency();
                    currency.setType(currencyObject["type"]);
                    currency.setValue(currencyObject["value"]);
                    gameElementProto.addCurrency(currency);
                });
                dataObject.addGameelements(gameElementProto);
            });

            DataController.cacheController.cards.forEach((cardObject) => {
                let cardProto = new DataController.dataClass.Card();
                cardProto.setId(cardObject["id"]);
                var properties = cardObject["properties"];

                properties.forEach((propertyObject) => {
                    var json = JSON.stringify(propertyObject["value"]);
                    var property = new DataController.dataClass.Property();
                    property.setName(propertyObject["name"]);
                    property.setJson(json);
                    cardProto.addProperties(property);
                });

                cardProto.setImage(cardObject["image"]);
                cardProto.setDescription(cardObject["description"]);

                dataObject.addCards(cardProto);
            });

            DataController.cacheController.chests.forEach((chestObject) => {
                let chestProto = new DataController.dataClass.Chest();
                chestProto.setId(chestObject["id"]);
                chestProto.setName(chestObject["name"]);
                var rewards = chestObject["rewards"];

                rewards.forEach((rewardId) => {
                    chestProto.addRewards(rewardId);
                });

                chestProto.setImage(chestObject["image"]);
                chestProto.setDescription(chestObject["description"]); 
                dataObject.addChests(chestProto);
            });

            DataController.cacheController.rewards.forEach((rwdObject) => {
                let rewardProto = new DataController.dataClass.Reward();
                rewardProto.setId(rwdObject["id"]);
                rewardProto.setRewardid(rwdObject["rwid"]);
                rewardProto.setType(rwdObject["type"]);
                rewardProto.setCount(rwdObject["count"]);
                dataObject.addRewards(rewardProto);
            });

            DataController.cachedDataObject = dataObject;
        }
        return DataController.cachedDataObject;
    },

    getChestById:function(chestId)
    {
        return DataController.cachedDataObject.chests.forEach((chest) =>{
            if(chest.getId() === chestId)
            {
                return chest;
            }
            return null;
        });
    },
    getChestById:function(chestId)
    {
        return DataController.cachedDataObject.chests.forEach((chest) =>{
            if(chest.getId() === chestId)
            {
                return chest;
            }
            return null;
        });
    }
}

DataController.init();

module.exports = DataController;