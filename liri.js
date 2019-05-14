require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var command = process.argv[2];
var userSearch = process.argv[3];
var axios = require("axios");

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
                console.log(i);
                console.log("Song: " + song[i].name);
                console.log("Artist(s) " + song[i].artists[0].name);
                console.log("Album: " + song[i].album.name);
                console.log("Preview Song: " + song[i].preview_url)
            }
        })
}

// OMDB

function searchMovie(userSearch) {

    if (userSearch === undefined) {
        userSearch = "mr nobody"
    }

    axios.get("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log ("Movie Title: " + response.data.Title)
            console.log ("Year Released: " + response.data.Year)
            console.log ("IMDB Rating: " + response.data.imdbRating)
            console.log ("Country Produced: " + response.data.Country)
            console.log ("Language: " + response.data.Language)
            console.log ("Plot: " + response.data.Plot)
            console.log ("Actors: " + response.data.Actors)
            console.log ("Actors: " + response.data.Actors)
            for (var i = 0; i < response.data.Ratings.length; i++)
                if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log ("Rotten Tomatoes Rating: " + response.data.Ratings[i].Value);
                }
        }
    )
}

// var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie
