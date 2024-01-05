import moment = require("moment");

export function stringToDate(dateString){
    return moment(dateString, "YYYY-MM-DD").toDate();
}