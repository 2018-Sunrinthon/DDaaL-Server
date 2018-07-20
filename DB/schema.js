/**
 * Created by janghunlee on 2018. 7. 20..
 */

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ddaal') ;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    Logger.data("Mongo DB ON");
});
