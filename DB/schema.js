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
        age : { type : Number },
        admin : { type : Boolean },
        profile_image_url: { type : String }
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

let post = new mongoose.Schema({
    post_token: { type : String },
    author_data:{
        author_name: { type : String },
        author_id: { type : String },
        author_token : { type : String },
        author_admin : { type : Boolean },
        author_call : { type : String },
    },
    post_data:{
        post_title: { type : String },
        post_content : { type : String },
        post_hash_tag:[{
            hash_tag : { type : String }
        }],
        post_profile_image_url: { type : String },
        post_puff_comment:[{
            comment_user_token : { type : String },
            comment_user_name : { type : String },
            comment_time : { type : String },
            comment_text : { type : String },
            comment_puff_amount : { type : Number }
        }],
    },
    alba_data:{
        alba_location:{
            latitude: { type : Number },
            longitude: { type : Number },
            location: { type : String }
        },
        alba_time: { type : String },
        alba_pay : { type : Number }
    }

});

let postModel = mongoose.model('postModel',post);
let userModel = mongoose.model('userModel',user);

exports.User = userModel;
exports.Post = postModel;