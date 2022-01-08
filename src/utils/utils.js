
const DELIMITER = ":"


function getDate(){
    let dt = new Date();
    return dt.getDate() + DELIMITER + dt.getMonth() + DELIMITER + dt.getFullYear();
}


function getTime(){
    let dt = new Date();
    return dt.getHours() + DELIMITER + dt.getMinutes() + DELIMITER + dt.getSeconds();
}



module.exports = {
    getDateString : function() {
        return getDate();
    },

    getTimeString : function() {
        return getTime();
    }
}