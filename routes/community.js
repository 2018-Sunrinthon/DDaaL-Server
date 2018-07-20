/**
 * Created by janghunlee on 2018. 7. 20..
 */
module.exports = community;

let async = require('async');
let { User , Post } = require('../DB/schema');
let Logger = require('../func/color').Logger;
let random_string = require('randomstring');
let request = require('request');
let upload = require('../func/multer').upload;


function community(app) {
    // app.get('/',(req,res)=>{
    //     "use strict";
    //     res.render("index.html");
    // });

    app.get('/community/list/:page',(req,res)=>{
        "use strict";
        let page_number = req.params.page;

        let start_page_number = (page_number - 1)*15;
        let finish_page_number = (page_number)*15;
        
        async.waterfall([
            function (cb) {
                Post.find({},(err,model)=>{
                   if(err) throw err;
                   if(model.length == 0){
                       cb(true , 404 , "No Post Data");
                   }
                   else{
                       cb(null , model);
                   }
                });
            },
            function (post , cb) {
                let return_post_date = new Array();
                let post_length = post.length;
                let check_post_length = post_length - (page_number * 15);
                if(check_post_length > 0){
                    let n = 0;
                    for(let i = start_page_number; i<finish_page_number; i++){
                        return_post_date[n] = post[i];
                        n = n + 1;
                    }
                    cb(null , 200 ,return_post_date);
                }
                else if(check_post_length <= 0 && check_post_length > -15){
                    let n = 0;
                    let time = 15 + check_post_length;
                    for(let i = start_page_number; i<time; i++){
                        return_post_date[n] = new Object();
                        return_post_date[n] = post[i];
                        n = n + 1;
                    }
                    cb(null , 200 , return_post_date);
                }
                else if(check_post_length < -14){
                    cb(true , 403 , "Overflow Post Page");
                }
            }
        ],function (cb , status , message) {
            if(cb == true){
                res.send({
                    status:status,
                    message:message
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    data:message
                });
            }
        });
    });

    app.post('/community/post/add', upload.single('profile'),(req,res)=>{
        "use strict";
        let post_token = random_string.generate();
        let post_title = req.body.post_title;
        let post_content = req.body.post_content;
        let post_hash_tag = req.body.post_hash_tag;
        let author_token = req.body.author_token;
        let alba_latitude = req.body.alba_latitude;
        let alba_longitude = req.body.alba_longitude;
        let alba_time = req.body.alba_time;
        let alba_pay = req.body.alba_pay;
        let call = req.body.call;
        let post_profile_image_url = req.file.path;

        async.waterfall([
            function (cb) {
                if(check_data(post_title).status){
                    cb(true , 403 , "Post Title is "+check_data(post_title).data);
                }
                else if(check_data(post_content).status){
                    cb(true , 403 , "Post Content is "+check_data(post_content).data);
                }
                else if(check_data(alba_latitude).status){
                    cb(true , 403 , "Alba Latitude is "+check_data(alba_latitude).data);
                }
                else if(check_data(alba_longitude).status){
                    cb(true , 403 , "Alba Longitude is "+check_data(alba_longitude).data);
                }
                else if(check_data(alba_time).status){
                    cb(true , 403 , "Alba Time is "+check_data(alba_time).data);
                }
                else if(check_data(alba_pay).status){
                    cb(true , 403 , "Alba Pay is "+check_data(alba_pay).data);
                }
                else if(check_data(call).status){
                    cb(true , 403 , "Call Number is "+check_data(call).data);
                }
                else if(check_data(post_profile_image_url).status){
                    cb(true , 403 , "Post Profile Image Url is "+check_data(post_profile_image_url).data);
                }
                else{
                    cb(null);
                }
            },
            function (cb) {
                User.find({token:author_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true, 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , model);
                    }
                });
            },
            function (user , cb) {
                let BASE_URL = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&latlng="+alba_latitude+","+alba_longitude;
                request(BASE_URL,(err,response,body)=>{
                    if(err) throw err;
                    let parseData = JSON.parse(body);

                    let location = parseData.results[0].formatted_address;
                    if(check_data(location).status){
                        cb(true , 404 , "Location Not Found");
                    }
                    else{
                        cb(null , user[0] , location);
                    }
                });
            },
            function (user , location , cb) {
                let savePost = new Post({
                    post_token:post_token,
                    author_data:{
                        author_name: user.user_data.name,
                        author_id: user.id,
                        author_token : user.token,
                        author_admin : user.user_data.admin,
                        author_call : call
                    },
                    post_data:{
                        post_title: post_title,
                        post_content : post_content,
                        post_hash_tag:post_hash_tag,
                        post_profile_image_url: post_profile_image_url,
                        post_puff_comment:new Array()
                    },
                    alba_data:{
                        alba_location:{
                            latitude: alba_latitude,
                            longitude: alba_longitude,
                            location:location
                        },
                        alba_time: alba_time,
                        alba_pay : alba_pay
                    }
                });
                savePost.save((err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , "Save Success");
                });
            }
        ],function (cb , status , message) {
            if(cb == true){
                res.send({
                    status:status,
                    message:message,
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    message:message,
                })
            }
        });
    });

    app.post('/community/check/admin',(req,res)=>{
        "use strict";
        let user_token = req.body.token;

        User.find({token:user_token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Unauthorized Token"
                });
            }else{
                let check_admin = model[0].user_data.admin;

                if(check_admin){
                    res.send({
                        status:200,
                        message:true
                    });
                }
                else{
                    res.send({
                        status:200,
                        message:false
                    });
                }
            }
        });
    });

    app.post('/community/add/comment',(req,res)=>{
        "use strict";
        let post_token = req.body.post_token;
        let comment_user_token = req.body.user_token;
        let comment_user_name = req.body.user_name;
        let comment_time = new Date();
        let comment_text = req.body.text;
        let comment_puff_amount = req.body.puff_amount;

        async.waterfall([
            function (cb) {
                User.find({token:comment_user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , model[0].user_data.profile_image_url);
                    }
                });
            },
            function (profile ,cb) {
                Post.find({post_token:post_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true, 404 , "Post Not Found");
                    }
                    else{
                        cb(null , model[0] , profile);
                    }
                });
            },
            function (model , profile , cb) {
                let updateData = model.post_data.post_puff_comment;
                let updateData_length = updateData.length;

                updateData[updateData_length] = new Object({
                    comment_user_token : comment_user_token,
                    comment_user_name : comment_user_name,
                    comment_time : comment_time,
                    comment_text : comment_text,
                    comment_puff_amount : comment_puff_amount,
                    comment_profile_image:profile
                });

                model.post_data.post_puff_comment = updateData;

                cb(null , model.post_data);
            },
            function (data , cb) {
                Post.update({post_token:post_token},{$set:{post_data:data}},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , "Save Success");
                });
            }
        ],function (cb , status , message) {
            if(cb == true){
                res.send({
                    status:status,
                    message:message
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    message:message
                });
            }
        })
    });
}


function check_data(text) {
    if(text == null){
        return {
            status:true,
            data:"null"
        }
    }
    else if(text == undefined){
        return{
            status:true,
            data:"undefined"
        }
    }
    else if(text == ""){
        return{
            status:true,
            data:""
        }
    }
    else{
        return{
            status:false,
        }
    }
}