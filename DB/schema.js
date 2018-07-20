/**
 * Created by janghunlee on 2018. 7. 20..
 */

let mongoose = require('mongoose');
let Logger = require('../func/color').Logger;

mongoose.connect('mongodb://localhost:27017/ddaal') ;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    Logger.data("Mongo DB ON");
});

let user = new mongoose.Schema({
    id:{ type : String },
    password : { type : String },
    token : { type : String },
    user_data:{
        name : { type : String },
        age : { type : String },
        admin : { type : Boolean }
    },
    user_location:{
        user_latitude:{ type : String },
        user_longitude:{ type : String },
    },
    user_hash_tag:[{
        hash_tag:{ type : String },
    }],
    user_contract:{
        user_contract_image_url : { type : String },
        user_contract_pdf_url : { type : String },
    },
    user_setting:{
        notification_allow: { type : Boolean },
    }
});

let userModel = mongoose.model('userModel',user);

exports.User = userModel;