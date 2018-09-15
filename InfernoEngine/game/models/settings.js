
var database = require('../../utils/database')

var settingsCollection = {
    collection: 'settings'
} 

var settingSchemaDefination = {
    api_version:String
}

var settingSchemaObject = database.getSchemaObject(settingSchemaDefination,settingsCollection);

var settingsModel = database.getModelByName('settings',settingSchemaObject);

async function getAllSettings()
{
    var records = await database.findResults({},settingsModel).catch(reason=> console.log("[Error][settings.js : getAllSettings] "+ reason));
    return records[0];
}


module.exports = {
    getAllSettings
}