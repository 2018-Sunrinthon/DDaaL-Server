/**
 * Created by janghunlee on 2018. 7. 20..
 */
module.exports = ocr;

let async = require('async');
let { User } = require('../DB/schema');
let upload = require('../func/multer').upload;
let Logger = require('../func/color').Logger;
let path = require('path');
let vision = require('google-vision-api-client');
let requtil = vision.requtil;

let jsonFile = 'all-blue-9ee0e735bf3f.json';
vision.init(jsonFile);

function ocr(app) {
    app.get('/',(req,res)=>{
        "use strict";
        res.render("index.html");
    });
    
    app.post('/ocr/upload',upload.single('ocr'),(req,res)=>{
        "use strict";
        let file_path = req.file.path;
    	let root_path = __dirname.replace("routes","")+file_path;

        var data = requtil.createRequests().addRequest(
            requtil.createRequest(root_path)
            .build());
            
        vision.query(data,(err , response , body)=>{
            if(err) throw err;
            res.send(JSON.stringify(body));
        });
    });
}
