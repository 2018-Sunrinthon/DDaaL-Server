/**
 * Created by janghunlee on 2018. 7. 20..
 */
module.exports = auth;

let random_string = require('randomstring');
let { User } = require('../DB/schema');
let async = require('async');

function auth(app) {
    app.post('/auth/login',(req,res)=>{
        "use strict";
        let id = req.body.id;
        let password = req.body.password;

        User.find({
            id:id,
            password:password
        },(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Fail to /auth/login",
                });
            }else{
                res.send({
                    status:200,
                    data:{
                        token:model[0].token
                    }
                });
            }
        });
    });

    app.post('/auth/login/auto',(req,res)=>{
        "use strict";
        let token = req.body.token;
        User.find({
            token:token,
        },(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Fail to /auth/login/auto",
                });
            }else{
                res.send({
                    status:200
                });
            }
        })
    });

    app.post('/auth/register',(req,res)=>{
        "use strict";
        let id = req.body.id;
        let password = req.body.password;
        let name = req.body.name;
        let age = req.body.age;
        let admin = req.body.admin;
        let token = random_string.generate();

        async.waterfall([
            function (cb) {
                User.find({id:id},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(null);
                    }
                    else{
                        cb(true , "User Already Exist");
                    }
                });
            },
            function (cb) {
                let saveUser = new User({
                    id:id,
                    password:password,
                    token:token,
                    user_data:{
                        name:name,
                        age:age,
                        admin:admin
                    }
                });

                saveUser.save((err,moㄴㅁdel)=>{
                    if(err) throw err;
                    cb(null);
                });
            }
        ],function (cb , text) {
            if(cb == true){
                res.send({
                    status:401,
                    message:text
                });
            }
            else if(cb == null){
                res.send({
                    status:200,
                    data:{
                        token:token
                    }
                });
            }
        })
    });
}