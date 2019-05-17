var fs = require('fs');
var axios = require("axios");
var moment = require('moment');

var searchBand = function(userSearch) {
    // removes quotes if included in search
    if (userSearch.charAt(0) === '"' && userSearch.charAt(userSearch.length - 1) ==='"') {
        userSearch = userSearch.substring(1, userSearch.length - 1);
        console.log(userSearch);
    }
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("Artist: " + userSearch)
            fs.appendFileSync("log.txt", "*********ARTIST: " + userSearch + "**********\n");
            for (var i = 0; i < response.data.length; i++) {
                var date = moment(response.data[i].datetime);
                var formattedDate = date.format("MM/DD/YYYY")
                console.log(i + 1)
                console.log("Venue Name: " + response.data[i].venue.name)
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country)
                console.log("Date: " + formattedDate);
                fs.appendFileSync("log.txt", "----------CONCERT INFO----------\n");
                fs.appendFileSync("log.txt", "Venue Name: " + response.data[i].venue.name + "\n");
                fs.appendFileSync("log.txt", "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n");
                fs.appendFileSync("log.txt", "Date: " + formattedDate + "\n");
            }
        }
    )   

}

module.exports = searchBand;