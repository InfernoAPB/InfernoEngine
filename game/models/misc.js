
var mongoose = require('mongoose');
var database = require('../../utils/database');


var PropertySchema = database.getSchemaObject({name:String,value:{}});
var Currency = database.getSchemaObject({type:String,value:Number});


module.exports = {
    PropertySchema,
    Currency
}
