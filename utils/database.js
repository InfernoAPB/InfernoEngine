// var mongoose = require('mongoose');
// var config = require('../configs/database.json')
// var url = `mongodb://${config.username}:${config.password}@${config.hostname}:${config.port}/${config.database}`;
// // var url = config.provider + "://" + config.hostname +":"+config.port+ "/" +config.database;
// mongoConnection = mongoose.connect(url, function (err) {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log("Connection to database Successfull");
// });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     // we're connected!
//     console.log("Connected To Server");
// });
// function mongoInit() {
//     return mongoConnection;
// }
// // All utility functions
// async function findResults(keys, model) {
//     try {
//         return new Promise((resolve, reject) => {
//             model.find(keys, function (err, results) {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 else {
//                     console.log("database.findResults");
//                     resolve(results);
//                 }
//             });
//         });
//     }
//     catch (err) {
//         throw (err);
//     }
// }
// async function insertRecord(values, recordModel) {
//     try {
//         return new Promise((resolve, reject) => {
//             var record = new recordModel(values);
//             record.save(function (err, record) {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 else {
//                     resolve(record);
//                 }
//             });
//         });
//     }
//     catch (error) {
//         throw (error);
//     }
// }


var database = {
    config: null,
    url: null,
    mongoConnection: null,
    db: null,
    mongoose : null,

    mongoInit: function () {
        database.mongoose = require('mongoose');
        database.config = require('../configs/database.json');
        database.url = `mongodb://${database.config.username}:${database.config.password}@${database.config.hostname}:${database.config.port}/${database.config.database}`;
        database.mongoConnection = database.mongoose.connect(database.url, function (err) {
            if (err) {
                console.log(err.message);
            }
            console.log("Connection to database Successfull");
        });
        database.db = database.mongoose.connection;
        database.db.on('error', console.error.bind(console, 'connection error:'));
        database.db.once('open', function () {
            // we're connected!
            console.log("Connected To Server");
        });
    },

    findResults: async function (keys, model) {
        try {
            return new Promise((resolve, reject) => {
                model.find(keys, function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    else {
                        console.log("database.findResults");
                        resolve(results);
                    }
                });
            });
        }
        catch (err) {
            throw (err);
        }
    },
    insertRecord: async function (values, recordModel) {
        try {
            return new Promise((resolve, reject) => {
                var record = new recordModel(values);
                record.save(function (err, record) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    else {
                        resolve(record);
                    }
                });
            });
        }
        catch (error) {
            throw (error);
        }
    },
    updateRecord : async function (conditions,updates,recordModel)
    {
        try{
        return new Promise((resolve, reject) => {
            recordModel.findOneAndUpdate(conditions,updates,function(err,record){
                if(err) {
                    reject(err);
                }
                else {
                    resolve(record);
                }
            });
        });
     }
     catch(error)
     {
         throw(error);
     }

    },
    getSchemaObject: function (model, collection) {
        return database.mongoose.Schema(model, collection);
    },
    
    getSchemaObject : function (model) {
        return database.mongoose.Schema(model);
    },
    
    getModelByName : function (name, schema) {
        return database.mongoose.model(name, schema);
    }

}

database.mongoInit();

module.exports = database;