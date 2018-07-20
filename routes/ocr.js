/**
 * Created by janghunlee on 2018. 7. 20..
 */
module.exports = ocr;

let async = require('async');
let { User } = require('../DB/schema');
let upload = require('../func/multer').upload;
let Logger = require('../func/color').Logger;
let path = require('path');
let pythonShell = require('python-shell');

function ocr(app) {
    app.get('/',(req,res)=>{
        "use strict";
        res.render("index.html");
    });
    
    app.post('/ocr/upload',upload.single('ocr'),(req,res)=>{
        "use strict";
        let file_path = req.file.path;
	let root_path = __dirname.replace("routes","")+file_path;
	let options = { 
        mode: 'text',
  		pythonPath: '',
  		pythonOptions: ['-u'],
		scriptPath: '',
		args : [root_path]
	};
	pythonShell.run('ocr.py',options,(err , results)=>{
		if(err) throw err;
		res.send(results);
	});
    });
}
