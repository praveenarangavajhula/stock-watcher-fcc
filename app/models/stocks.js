'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
    code:String,
    update:String,
    json:Object
});

module.exports = mongoose.model('Stock',Stock);