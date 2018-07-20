/**
 * Created by janghunlee on 2018. 7. 20..
 */
class Logger{
    constructor(){
        this.colors = require('colors');
        this.colors.setTheme({
            error:'red',
            info:'green',
            warn:'yellow',
            data:'cyan'
        });
    }
    error(text){ console.log(this.colors.error(text)) }
    info(text){ console.log(this.colors.info(text)) }
    warn(text){ console.log(this.colors.warn(text)) }
    data(text) {console.log(this.colors.data(text)) }
}

const looger = new Logger();

exports.Logger = looger;