require("dotenv").config();

var axios = require('axios');

var fs = require("fs");

var moment = require("moment");

var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

var userSearch = process.argv[2];
var parameter = process.argv[3];
console.log(userSearch);

function runLiri(){
switch(userSearch){
    case "concert-this":
        concertThis();
    break;

    case "spotify-this-song":
        spotifyThis();
    break;

    case "movie-this":
        movieThis();
    break;

    case "do-what-it-says":
        doThis();
    break;

    default: 
    console.log("please enter valid search");
}
}


//concert - band in town 
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

//name of venue, location, date/time using moment 

function concertThis(err, response, body){
    var artist = process.argv[3]
    console.log(artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(res) {
    console.log("-----------------------");
      console.log("Venue: " + res.data[0].venue.name);
      console.log("Location: " + res.data[0].venue.city + ", " + res.data[0].venue.country);
      console.log("Date: " + moment(res.data[0].datetime).format("MM/DD/YYYY"));
      console.log("-----------------------");

  }).catch(function (error) {
    console.log(error);
  })
}

//spotify
function spotifyThis(parameter, songSearch){
var songSearch;
if(parameter === undefined){
    songSearch = "Ripple"
}else{
    songSearch = parameter
}
spotify.search({ type: 'track', query: songSearch }, function(err, data) {

    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
//   console.log
    console.log("-----------------------")
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Alblum: " + data.tracks.items[0].album.name);
    console.log("Song Preview: " + data.tracks.items[0].preview_url);
    console.log("-----------------------")

  });
}

//movie * Title of the movie. Year the movie came out.IMDB Rating of the movie.Rotten Tomatoes Rating of the movie.
//Country where the movie was produced.Language of the movie.Plot of the movie. Actors in the movie.

function movieThis(){
    var movieName = process.argv[3]
    console.log(movieName)
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function(response){
            console.log("-----------------------")
            console.log("Title: " + response.data.Title);
            console.log("Release Date: " + response.data.Year)
            console.log("Rating: " + response.data.Rated)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Production Location: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Actors: " + response.data.Actors)
            console.log("Plot Summary: " + response.data.Plot)
            console.log("-----------------------")
        })
}

function doThis(){
    fs.readFile("random.txt", "utf8", function(error,data){
        
        var dataArr = data.split(", ") 
       // console.log(dataArr)
        if(dataArr[0] === "spotify-this-song"){
            var songCheck = dataArr[1];
            spotifyThis(songCheck);
        }
    }
)}



runLiri();
