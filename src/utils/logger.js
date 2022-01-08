const { getTimeString, getDateString } = require("./utils");

const frame = {
    start : "[",
    end : "]"
}

const logger = {
    info : function(message) {
        const out = _info(message);
        console.log(out);
    },

    warn : function(message) {
        const out = _warn(message);
        console.log(out);
    },

    error : function(message) { 
        const out = _error(message);
        console.log(out);
    }
}

function _info(message){
    let level = padFrame("INFO");
    return getDateTimeData() + " - " + level + " : " + message;
}

function _warn(message){
    let level = padFrame("WARN");
    return getDateTimeData() + " - " + level + " : " + message;
}

function _error(message){
    let level = padFrame("ERROR");
    return getDateTimeData() + " - " + level + " : " + message;
}

function getDateTimeData(){
    return padFrame(
        getDateString() +
        " " +
        getTimeString() 
    );
}

function padFrame(data){
    return frame.start + data + frame.end;
}

module.exports = {
    logger
}