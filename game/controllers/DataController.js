var dataClass = require('../proto_source/Data_pb');
var requestProto = require('../proto_source/Request_pb');
var SharedEnums = require('../proto_source/SharedEnums_pb');
var cacheController = require('./CacheController');
var cachedDataObject = null;
async function processRequest(request, responses) {
    var gameDataRequest = dataClass.DataRequest.deserializeBinary(request.getPayload());
    var requestId = request.getId();

    var response = new requestProto.Response();
    response.setId(requestId);
    response.setType(SharedEnums.ResponseType.LOAD_GAME_DATA_RESPONSE);
    response.setStatus(SharedEnums.ResponseStatus.FAIL);
    var gameDataResponse = new dataClass.DataResponse();
    var data = getDataObject();

    gameDataResponse.setHashmatched(false);
    gameDataResponse.setData(data);
    response.setPayload(gameDataResponse.serializeBinary());
    responses.addGameResponse(response.serializeBinary());
    return responses;
}

function getDataObject() {
    if (cachedDataObject == null) {
        var dataObject = new dataClass.Data();
        cacheController.gameelements.forEach((gameElement)=>{
            let gameElementProto = new dataClass.GameElement();
            gameElementProto.setId(gameElement["id"]);
            let currencyArray = gameElement["currency"];

            currencyArray.forEach((currencyObject)=>
            {
                let currency = new dataClass.Currency();
                currency.setType(currencyObject["type"]);
                currency.setValue(currencyObject["value"]);
                gameElementProto.addCurrency(currency);
            });

            dataObject.addGameelements(gameElementProto);
        });

        cacheController.cards.forEach((cardObject)=>{
            let cardProto = new dataClass.Card();
            cardProto.setId(cardObject["id"]);
            var properties = cardObject["properties"];

            properties.forEach((propertyObject)=>
            {
                var json = JSON.stringify(propertyObject["value"]);
                var property = new dataClass.Property();
                property.setName(propertyObject["name"]);
                property.setJson(json);
                cardProto.addProperties(property);
            });

            cardProto.setImage(cardObject["image"]);
            cardProto.setDescription(cardObject["description"]);

            dataObject.addCards(cardProto);
        });

        cacheController.chests.forEach((chestObject)=>{
            let chestProto = new dataClass.Chest();
            chestProto.setId(chestObject["id"]);
            chestProto.setName(chestObject["name"]);

            var rewards = chestObject["rewards"];

            rewards.forEach((rewardId)=>
            {
                chestProto.addRewards(rewardId);
            });

            chestProto.setImage(chestObject["image"]);
            chestProto.setDescription(chestObject["description"]);

            dataObject.addChests(chestProto);
        });

        cacheController.rewards.forEach((rwdObject)=>{
            let rewardProto = new dataClass.Reward();
            rewardProto.setId(rwdObject["id"]);
            rewardProto.setRewardid(rwdObject["rwid"]);
            rewardProto.setType(rwdObject["type"]);
            rewardProto.setCount(rwdObject["count"]);
            dataObject.addRewards(rewardProto);
        });


        cachedDataObject = dataObject;
    }
    return cachedDataObject;
}


module.exports = {
    processRequest
}