var fs = require('fs');
var spotify = require('./spotify.js');
var omdb = require('./omdb.js');
var bands = require('./bandsInTown.js')

var doWhatItSays= function() {
    fs.readFile('random.txt', 'utf-8', function (err, data) {
        if (err) {
            return console.log(err)
        }
        var dataArr = data.split(",");
        var command = dataArr[0];
        var userSearch = dataArr[1];
        if (userSearch.charAt(0) == '"' && userSearch.charAt(userSearch.length - 2) == '"') {
            userSearch = userSearch.substring(1, userSearch.length - 2);
        }
        console.log(command);
        console.log(userSearch);
        if (command === "spotify-this-song") {
            spotify(userSearch)
        } else if (command === "concert-this") {
            bands(userSearch);
        } else if (command === "movie-this") {
            omdb(userSearch);
        } else {
            console.log("Invalid command. Please use one of the following commands: \nspotify-this-song \nconcert-this \nmovie-this \ndo-what-it-says")
        }

    })
}

module.exports = doWhatItSays;