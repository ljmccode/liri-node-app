require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var command = process.argv[2];
var userSearch = process.argv[3];
var axios = require("axios");
var moment = require('moment');


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
                console.log(i+1);
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
        function (response) {
            console.log("Movie Title: " + response.data.Title)
            console.log("Year Released: " + response.data.Year)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log("Country Produced: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            for (var i = 0; i < response.data.Ratings.length; i++)
                if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[i].Value);
                }
        }
    )
}

function searchBand(userSearch) {
    if (userSearch.charAt(0) == '"' && userSearch.charAt(userSearch.length - 1) == '"') {
        userSearch = userSearch.substring(1, userSearch.length - 1);
    }
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var date = moment(response.data[i].datetime);
                var formattedDate = date.format("MM/DD/YYYY")
                console.log(i + 1)
                console.log("Venue Name: " + response.data[i].venue.name)
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country)
                console.log("Date: " + formattedDate);
            }
        }
    )

}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf-8', function (err, data) {
        if (err) {
            return console.log(err)
        }
        var dataArr = data.split(",");
        var command = dataArr[0];
        var userSearch = dataArr[1];
        console.log(command);
        console.log(userSearch);
        if (command === "spotify-this-song") {
            searchSong(userSearch);
        } else if (command === "concert-this") {
            searchBand(userSearch);
        } else if (command === "movie-this") {
            searchMovie(userSearch);
        } else {
            console.log("Invalid command. Please use one of the following commands: \nspotify-this-song \nconcert-this \nmovie-this \ndo-what-it-says")
        }
        
    })
}