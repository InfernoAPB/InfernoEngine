var mongoose = require('mongoose');
var database = require('../utils/database');

var UserCollection = {
    collection: 'game_admins'
};

var UserSchema = mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
        sub_id:String,
        login_method:String
    },
    UserCollection
);

var UserModel = mongoose.model('user',UserSchema);

function findUser(keys,callback)
{
    database.findResults(keys,UserModel,function(err,users){
        callback(err,users);
    });
}

function createUser(values,callback)
{
    database.insertRecord(values,UserModel,function(err,record){
        callback(err,record);
    });
}

module.exports = {
    UserSchema,
    UserCollection,
    UserModel,
    findUser,
    createUser
};
