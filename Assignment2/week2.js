var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('../Assignment01/Week 01/m01.txt');


var $ = cheerio.load(content);
var address = "";

console.log(address);

$('td').each(function(i, elem){

    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px"){
        address += ($(elem).html().split("<br>")[2].trim());
    }
});

console.log(address);

fs.writeFileSync("./week2.txt", address)