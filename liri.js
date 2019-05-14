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

// OMDB
function searchMovie(userSearch) {

    if (userSearch === undefined) {
        userSearch = "mr nobody"
    }

    axios.get("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            fs.appendFileSync("log.txt", "----------MOVIE INFO----------\n");
            fs.appendFileSync("log.txt", "Movie Title: " + response.data.Title + "\n");
            fs.appendFileSync("log.txt", "Year Released: " + response.data.Year + "\n");
            fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating + "\n");
            fs.appendFileSync("log.txt", "Country Produced: " + response.data.Country + "\n");
            fs.appendFileSync("log.txt", "Language: " + response.data.Language + "\n");
            fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
            fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
            for (var i = 0; i < response.data.Ratings.length; i++) {
                if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[i].Value);
                    fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + response.data.Ratings[i].Value + "\n");
                }
            }
        }
    )
}

// Bands in Town
function searchBand(userSearch) {
    // removes quotes if included in search
    if (userSearch.charAt(0) == '"' && userSearch.charAt(userSearch.length - 1) == '"') {
        userSearch = userSearch.substring(1, userSearch.length - 1);
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

// Takes text from random.txt to search
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