var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

var searchSong = function (userSearch) {
    if (userSearch === undefined) {
        userSearch = "Ace of Base The Sign";
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
                console.log(i + 1);
                console.log("Song: " + song[i].name);
                console.log("Artist(s) " + song[i].artists[0].name);
                console.log("Album: " + song[i].album.name);
                console.log("Preview Song: " + song[i].preview_url)
                fs.appendFileSync("log.txt", "----------SONG INFO----------\n");
                fs.appendFileSync("log.txt", "Song: " + song[i].name + "\n");
                fs.appendFileSync("log.txt", "Artist(s) " + song[i].artists[0].name + "\n");
                fs.appendFileSync("log.txt", "Album: " + song[i].album.namee + "\n");
                fs.appendFileSync("log.txt", "Preview Song: " + song[i].preview_url + "\n");
            }
        })
}

module.exports = searchSong;