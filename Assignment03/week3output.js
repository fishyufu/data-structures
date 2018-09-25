//in bash: export NEW_VAR="geo keyasdaasa as"
//in bash: printenv | grep NEW_VAR
//in bash: npm install request
//in bash: npm install async

var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

var apiKey = process.env.TAMU_KEY; //API key contianed in bash as var.

var meetingsData = [];
//copy my array below
var addresses = JSON.parse(fs.readFileSync('week3array.json'));//to read the text file of clean address

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            var thisGeo={};
            thisGeo.streetAddress = tamuGeo['InputAddress']['StreetAddress'];
            thisGeo.lat = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'];
            thisGeo.long = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'];
            console.log(thisGeo);
            meetingsData.push(thisGeo);
        }
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
});