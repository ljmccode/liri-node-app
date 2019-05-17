require("dotenv").config();

var command = process.argv[2];
var userSearch = process.argv[3];
var spotify = require('./spotify.js');
var omdb = require('./omdb.js');
var bands = require('./bandsInTown.js')
var random = require('./doWhatItSays.js')

if (command === "spotify-this-song") {
    spotify(userSearch);
} else if (command === "concert-this") {
    bands(userSearch);
} else if (command === "movie-this") {
    omdb(userSearch);
} else if (command === "do-what-it-says") {
    random(userSearch);
} else {
    console.log("Invalid command. Please use one of the following commands: \nspotify-this-song \nconcert-this \nmovie-this \ndo-what-it-says")
}

