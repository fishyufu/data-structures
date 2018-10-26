//Cleaning up zone 1: day, starting time, end time, location, address, long, lat, meetingtypes 

// require modules
var fs = require('fs');
var cheerio = require('cheerio');

// read zone 1 file
var content = fs.readFileSync('../aa-data/m01.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables

// create an array to store all the addresses
var m01data =   fs.readFileSync('../clean-data/m01.json');
var m01 = JSON.parse(m01data);

//location
// $('h4[style="margin:0;padding:0;"]').each(
//   function(i,elem){

//     var location = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').replace('&apos;','\'').trim();
//     // remove empty lines and extra spaces and reformat hypostrophy

//     m01[i].location=location;
//     // add each loaction as a json object to the array
//   }
// );

$('h4[style="margin:0;padding:0;"]').each(function(i,elem){
    
    var locationName=   $(elem).text().trim().replace(/'/g,"''");
    m01[i].mtlocation=locationName;
    if( locationName !=''){
       m01[i].mtlocation=locationName;
       
   }else{
        m01[i].mtlocation=null;
   }
  });
  


// day
$('td[style="border-bottom\\:1px solid #e3e3e3;width\\:350px;"]').each(
  function(i,elem){
    var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
    // remove empty lines and extra spaces and split each day
    // console.log(sections);
    var day=[];
    for (var j=0; j<sections.length; j++){
      var sec = sections[j].split('<b>')[1];
      if (sec != undefined){
        day.push(sec.substring(0, sec.indexOf('sFrom')));
        // console.log(sec);
      }
      // type.push(sections[i].split('<b>')[2].substring(13,indexOf(' =')));
      // spinterest.push(sections[i].split('<b>')[3].substring(17)));
    }
    m01[i].day = day;
    //
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
      if (st != undefined && et != undefined){
        start.push(st.substring(1, st.indexOf(' <')));
        end.push(et.substring(1, et.indexOf(' <')));
        // console.log(sec);
      }
      // type.push(sections[i].split('<b>')[2].substring(13,indexOf(' =')));
      // spinterest.push(sections[i].split('<b>')[3].substring(17)));
    }
    // console.log(start);
    // console.log(end);
    // add each time schedule as a json object to the array
    m01[i].start = start;
    m01[i].end = end;
  }
);

//meeting group

$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').each(
  function(i,elem){
    //var group = $(this).html().split('<br>')[1].replace('<b>','').replace('</b>','').replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').replace('&apos;','\'').trim();
    //var group= $(elem).find('b').text().trim().split(" -")[0].replace(/\s\s/g,'').replace(/-/g,' ').trim(); 
     var group= $(elem).find('b').text().trim().split(" -")[0].replace(/\s\s/g,'').replace(/-/g,' ').trim().replace(/'/g,"''"); 
    // this .replace(/'/g,"''") replace all the single quote in the group name string from ‘ to ‘’ ,this is what postgreSQL need to read ‘ as string. 

    // remove empty lines and extra spaces

    m01[i].group=group;
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
//     m01[i].type = type;
//     m01[i].spinterest = spinterest;
//   }
// );
 $('td[style="border-bottom\\:1px solid #e3e3e3;width\\:350px;"]').each(function(i,elem){

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
     m01[i].type = type;
      m01[i].spinterest = spinterest;
 });




// wheelchair
$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').each(
  function(i,elem){
    var wheelchairAccess = $(this).find('span').html(); // find span element
    if (wheelchairAccess == null) {
      m01[i].wheelchair = false;
    } else {
      m01[i].wheelchair = true;
    }
    // add each wheelchair access as a json object to the array
  }
);


    console.log(m01[i]);
  }
);


for (var i=0; i<m01.length; i++){
  m01[i].zone = 1;
}
fs.writeFileSync('../clean-data/m01new.json', JSON.stringify(m01));
// save json file



