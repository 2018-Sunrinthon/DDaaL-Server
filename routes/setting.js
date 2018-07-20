/**
 * Created by janghunlee on 2018. 7. 21..
 */

module.exports = setting;

let { User } = require('../DB/schema');
let async = require('async');
let Logger = require('../func/color').Logger
let upload = require('../func/multer').upload;

function setting(app) {
    app.post('/setting/notification',(req,res)=>{
        "use strict";
        var token = req.body.token;
        var noti_allow = req.body.token;

        let save_noti_allow = new Object({
            notification_allow:noti_allow
        })

        User.update({token:token},{$set:{user_setting:save_noti_allow}},(err,model)=>{
            if(err) throw err;

            res.send({
                status:200,
                message:"Update Success"
            })
        });
    });

    app.post('/setting/profile', upload.single('profile'),(req,res)=>{
        "use strict";
        var path = req.file.path;
        var token = req.body.token;

        User.update({token:token},{$sest:{
            user_data:{
                profile_image_url:path
            }
        }},(err,model)=>{
            res.send({
                status:200,
                message:"Save Success"
            })
        });
    });
}