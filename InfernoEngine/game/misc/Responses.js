
class Responses 
{
    
    constructor()
    {
        this.gameResponses = [];
        this.chatResponses = [];
        this.clanResponses = [];
    }

    addGameResponse(response)
    {
        this.gameResponses.push(response);
    }

    addChatResponses(response)
    {
        this.chatResponses.push(response)
    }

    addClanResponse(response)
    {
        this.clanResponses.push(response);
    }
}

module.exports = {
    Responses
}