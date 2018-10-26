//Cleaning up zone 4: zone, day, starting time, end time, location, address, long, lat, meetingtypes, spinterest

// require modules
var fs = require('fs');
var cheerio = require('cheerio');

// read zone 4 file
var content = fs.readFileSync('../aa-data/m04.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables

// create an array to store all the addresses
var m04data = fs.readFileSync('../clean-data/m04.json');
var m04 = JSON.parse(m04data);

//location
$('h4[style="margin:0;padding:0;"]').each(
  function(i,elem){

     var locationName=  $(elem).text().trim().replace(/'/g,"''");
 if( locationName !=''){
       m04[i].mtlocation=locationName;
       
   }else{
        m04[i].mtlocation=null;
   }
    
  });

    // remove empty lines and extra spaces and reformat hypostrophy
    //replace(/^\s*$[\n\r]{1,}/gm, ''): replace empaty line;
    //replace(/\s+/g,' '): replace spaces to single space;
    

// day
$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').each(
  function(i,elem){
    var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
    // remove empty lines and extra spaces and split each day
    // console.log(sections);
    var day=[];
    for (var j=0; j<sections.length; j++){      //loop
      var sec = sections[j].split('<b>')[1];    //cut everything after the second <b>
      if (sec != undefined){                    //if undefined, not run
        day.push(sec.substring(0, sec.indexOf('sFrom')));   //keep everything before sFrom
        // console.log(sec);
      }


    }
    m04[i].day = day;    
    //add each day as a json object to the array

// meeting start/end time
$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').each(
  function(i,elem){
    var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').split('<br> <br>');
    // remove empty lines and extra spaces and split each day
    // console.log(sections);
    var start=[];
    var end=[];
    for (var j=0; j<sections.length; j++){

      var st = sections[j].split('</b>')[1];
      var et = sections[j].split('</b>')[2];
      if (st != undefined && et != undefined){          //if start and end time are defined, run the push; otherwise not
        start.push(st.substring(1, st.indexOf(' <')));
        end.push(et.substring(1, et.indexOf(' <')));
        // console.log(sec);
      }
    }
    // console.log(start);
    // console.log(end);
    // add each time schedule as a json object to the array
    m04[i].start = start;
    m04[i].end = end;
  }
);

//meeting group
$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').each(
  function(i,elem){
   var group= $(elem).find('b').text().trim().split(" -")[0].replace(/\s\s/g,'').replace(/-/g,' ').trim().replace(/'/g,"''"); 
    //var group= $(elem).find('b').text().trim().replace(/(?<! )-/g,' ').replace(/\s\s/g,'').split('-')[0] ;
    // $(this).find('h4,b,br,div,span,img').remove();
    // remove redundant html elements
    // var group = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').replace('&apos;','\'').trim();
    // remove empty lines and extra spaces

    m04[i].group=group;
    // add each meeting group as a json object to the array
    
  }
);

//meeting type and special interest
// $('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').each(
//   function(i,elem){
//     var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').split('<br> <br>');
//     // remove empty lines and extra spaces and split each day
//     var type=[];
//     var spinterest=[];
//     for (var j=0; j<sections.length-1; j++){
//       var sec = sections[j].split('<br><b>');
//       sec.shift(); // remove the first element in sections (day and time)
//       sec = sec.join('').trim(); // concat the elements into a string
//       var tpStr = "Meeting Type</b> ";
//       var spStr = "Special Interest</b> ";
//       var tp;
//       var sp;
//       if (sec.includes(tpStr)) {
//         tp = sec.substring(sec.indexOf(tpStr)+tpStr.length,sec.indexOf(' ='));
//       }
//       type.push(tp);
//       if (sec.includes(spStr)) {
//         sp = sec.substring(sec.indexOf(spStr)+spStr.length);
//       }
//       spinterest.push(sp);

//     }
//     // console.log(type);
//     // console.log(spinterest);
//     // add each type and special interest as a json object to the array
//     m04[i].type = type;
//     m04[i].spinterest = spinterest;
//   }
// );

$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').each(function(i,elem){

    var sections = $(this).text().trim().replace(/\A*.*Meeting /g, '').split(/\s\s+/g)//.replace(/=\\?.*/g, '')//.trim().split(" ");
        var type=[];
        var spinterest=[];
       	var tpStr = "Type";
        	var spStr = "Special Interest";
            for (var j=0; j< sections.length; j++){
                if (sections[j].includes(tpStr)){
                type.push(sections[j].replace(/\A*.*Type /g, '').replace(/=\\?.*/g, '').trim());
                }else {
                    type.push('null');
                }
                if (sections[j].includes(spStr)){
                     spinterest.push(sections[j].replace(/\A*.*Special Interest /g, ''));
                }else{
                    spinterest.push('null');
                    }
        }
     //console.log(sections);
    //  console.log(typeofAA)
     m04[i].type = type;
      m04[i].spinterest = spinterest;
 });



// wheelchair
$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').each(
  function(i,elem){
    var wheelchairAccess = $(this).find('span').html(); // find span element
    if (wheelchairAccess == null) {
      m04[i].wheelchair = false;
    } else {
      m04[i].wheelchair = true;
    }
    // add each wheelchair access as a json object to the array
  }
);


    console.log(m04[i]);
  }
);


for (var i=0; i<m04.length; i++){
  m04[i].zone = 4;
}
fs.writeFileSync('../clean-data/m04new.json', JSON.stringify(m04));
// save json file



