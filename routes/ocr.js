/**
 * Created by janghunlee on 2018. 7. 20..
 */
module.exports = ocr;

let tesseract = require('node-tesseract');
let async = require('async');
let { User } = require('../DB/schema');
let upload = require('../func/multer').upload;
let Logger = require('../func/color').Logger;
let path = require('path');

function ocr(app) {
    app.post('/ocr/upload',upload.single('ocr'),(req,res)=>{
        "use strict";
        let file_path = req.file.path;
        tesseract.process(__dirname + file_path,function(err, text) {
            if(err) throw err;
            console.log(text);

            res.send(text);
        });
    });
}