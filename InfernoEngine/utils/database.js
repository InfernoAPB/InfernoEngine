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


// All utility functions
function findResults(keys,model,callback)
{
    model.find(keys,function (err,results){
        if(err)
         throw(err);
        callback(err,results);
    });
}

function insertRecord(values,recordModel,callback)
{
    var record = new recordModel(values);
    record.save(function (err, record) {
        if (err) {
          callback(err,null);
        }else{
            callback(err,record);
          }
    });
}


module.exports =
    {
        mongoInit,
        mongoConnection,
        db,
        url,
        findResults,
        insertRecord
    };