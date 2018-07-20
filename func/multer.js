/**
 * Created by janghunlee on 2018. 7. 20..
 */
let multer = require('multer');
let path = require('path');
let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
});

exports.upload = upload;

