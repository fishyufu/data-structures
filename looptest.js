// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

for(var i=1; i < 11; i++){
    var url = 'https://parsons.nyc/aa/m02.html';
    var fn = '/home/ec2-user/environment/loopdata'
    request('https://parsons.nyc/aa/m02.html', function(error, response, body){
        if (!error && response.statusCode == 200) {
            fs.writeFileSync('/home/ec2-user/environment/loopdata/hw02.txt', body);
    }
    else {console.log("Something happened!")}
});
}