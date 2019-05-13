require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var command = process.argv[2];
var userSearch = process.argv[3];

if (command === "spotify-this-song") {
    searchSong(userSearch);
} else if (command === "concert-this") {
    searchBand(userSearch);
} else if (command === "movie-this") {
    searchMovie(userSearch);
} else if (command === "do-what-it-says") {
    doWhatItSays(userSearch);
} else {
    console.log("Invalid command. Please use one of the following commands: \nspotify-this-song \nconcert-this \nmovie-this \ndo-what-it-says")
}

// Spotify
function searchSong(userSearch) {
    if (userSearch === undefined) {
        userSearch === "Ace of Base The Sign";
    }
    spotify.search(
        {
            type: 'track',
            query: userSearch
        },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            
            var song = data.tracks.items;

            for (var i = 0; i < song.length; i++) {
                console.log(i);
                console.log("Song: " + song[i].name);
                console.log("Artist(s) " + song[i].artists[0].name);
                console.log("Album: " + song[i].album.name);
                console.log("Preview Song: " + song[i].preview_url)
            }
        })
}


// Bands in Town
//   var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"