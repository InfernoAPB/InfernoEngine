
var settings = require("../models/settings");

var currentApiSettings = null;

async function getAPIVersion()
{
   if(currentApiSettings == null)
     currentApiSettings = await settings.getAllSettings();
   return currentApiSettings.api_version;
}

module.exports = {
    getAPIVersion
}


