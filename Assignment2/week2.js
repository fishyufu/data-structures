var fs = require('fs');
var cheerio = require('cheerio');


var content = fs.readFileSync('../Assignment01/Week 01/m01.txt');


var $ = cheerio.load(content);
var address = "";
// at last make array, var = adddress =[];

console.log(address);

$('td').each(function(i, elem){

// if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px"){
//  (arron demo) console.log($(elem).html().dplit("<br>")[2].trim()); //counting from 0 (at last change it to address.push($(elem)...) to become text)
//  console.log(*****************************************) (to devide)

    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px"){
        address += ($(elem).html().split("<br>")[2].trim());
    }
});

console.log(address);

fs.writeFileSync("./week2.txt", address)