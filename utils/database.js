var mongoose = require('mongoose');

var config = require('../configs/database.json')

var url = `mongodb://${config.username}:${config.password}@${config.hostname}:${config.port}/${config.database}`;
// var url = config.provider + "://" + config.hostname +":"+config.port+ "/" +config.database;
mongoConnection = mongoose.connect(url, function (err) {
    if (err) {
        console.log(err.message);
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected To Server");
});

function mongoInit() {
    return mongoConnection;
}

function getSchemaObject(model,collection)
{
    return mongoose.Schema(model,collection);
}

function getSchemaObject(model)
{
    return mongoose.Schema(model);
}

function getModelByName(name,schema)
{
    return mongoose.model(name,schema);
}

// All utility functions
async function findResults(keys, model) {
    try {
       return new Promise((resolve,reject)=>{
        model.find(keys, function (err, results) {
            if (err)
            {
                reject(err);
                return;
            }
            else
            {
                console.log("database.findResults");
                resolve(results);
            }
        });
       }); 
    }
    catch (err) {
        throw (err);
    }
}

async function insertRecord(values, recordModel) {
    try {
        return new Promise((resolve,reject)=>{
            var record = new recordModel(values);
            record.save(function (err, record) {
                if (err) {
                    reject(err);
                    return;
                }
                else
                {
                    resolve(record);
                }
            });
        });
    }
    catch(error)
    {
        throw(error);
    }
}


module.exports =
    {
        mongoInit,
        mongoConnection,
        db,
        url,
        findResults,
        insertRecord,
        getSchemaObject,
        getModelByName
    };