var mongoose = require('mongoose');

var config = require('../configs/database.json')

var url = `mongodb://${config.username}:${config.password}@${config.hostname}:${config.port}/${config.database}`;
// var url = config.provider + "://" + config.hostname +":"+config.port+ "/" +config.database;
mongoConnection = mongoose.connect(url,function(err){
    if(err)
    {
        console.log(err.message);
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected To Server");
});

function mongoInit() {
    return mongoConnection;
}

module.exports =
    {
        mongoInit,
        mongoConnection,
        db,
        url
    };