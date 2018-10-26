// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('../Assignment01/Week 01/m01.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

//push to array

// print (to the console) address, cheerio selected based on style.
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") 
    {
    //split by each break, and choose only the 3rd line, trim the white space on the beggining and end.
var abc=($(elem).html().split('<br>')[2].trim());
    //    console.log(abc);
    //    console.log(abc.indexOf(",")); indexOf used to find the specfic location of ",".
    //    console.log(abc.substr(0,abc.indexOf(","))); 
    //    substr(0, 5) to select from the first to fifth location. change 5 to indexOf("," allows to sellect from 0 position to first ",)
var newAddress=abc.substr(0,abc.indexOf(","));
if (newAddress =="22 Barclay Street (Basement)") {
    newAddress = "22 Barclay Street";
}
if (newAddress == "22 Barclay Street- basement chapel"){
    newAddress = "22 Barclay Street";
}
console.log (newAddress);
    meetingsData.push(newAddress);
    }
});

fs.writeFileSync('../Assignment03/week3array.json', JSON.stringify(meetingsData));
