var requestProto = require('../proto_source/Request_pb');
var requestTypeProto = require('../proto_source/SharedEnums_pb');
var responsesClass = require('../misc/Responses');
const REQUEST_SIZE = 4;
var controllers = {
    [requestTypeProto.RequestType.STARTUP]: require('../controllers/LoginPlayerController'),
    [requestTypeProto.RequestType.CREATE_NEW_USER]: require('../controllers/CreatePlayerController'),
    [requestTypeProto.RequestType.LOAD_GAME_DATA]: require('../controllers/DataController')
};

async function processRequest(request, callback) {
    console.log(request);
    let cursor = 0;
    var responses = new responsesClass.Responses();
    let requests = [];
    while (cursor < request.length) {
        let size = request.readInt32BE(cursor);
        cursor += REQUEST_SIZE;
        let parsedRequest = new requestProto.Request.deserializeBinary(request.slice(cursor, cursor + size));
        let type = parsedRequest.getType();
        let controller = controllers[type];
        requests.push(controller.processRequest(parsedRequest, responses));
        cursor += size;
    }

    await Promise.all(requests).catch(reason => { console.log(reason) });

    var buffer = createResponseBuffer(responses);

    return buffer;
}

function createResponseBuffer(responses) {
    let bufferSize = 0;
    responses.gameResponses.forEach(element => {
        bufferSize += REQUEST_SIZE;
        bufferSize += element.length;
    });
    var buffer = Buffer.allocUnsafe(bufferSize);
    
    let cursor = 0;
    responses.gameResponses.forEach(element => {
    
       let length = element.length;
       buffer.writeInt32LE(length,cursor);
       cursor += REQUEST_SIZE;
       buffer.fill(element,cursor,cursor + length);
    });

    return buffer;
}

module.exports = {
    processRequest
}

