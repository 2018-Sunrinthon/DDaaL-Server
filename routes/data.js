/**
 * Created by janghunlee on 2018. 7. 21..
 */
module.exports = data;

let { User } = require('../DB/schema');

function data(app) {
    app.get('/data:/token',(req,res)=>{
        "use strict";
        let token = req.params.token;

        User.find({token:token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Unauthorized Token"
                });
            }
            else{
                res.send({
                    status:200,
                    data:model[0]
                });
            }
        });
    });
}