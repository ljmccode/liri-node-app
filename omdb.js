var fs = require('fs');
var axios = require("axios");

var searchMovie = function(userSearch) {

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

module.exports = searchMovie;