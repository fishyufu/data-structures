const { Client } = require('pg');
var async = require('async');
var fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'fishyufu';
db_credentials.host = 'yufu.cbyumywtsktv.us-east-2.rds.amazonaws.com';
db_credentials.database = 'fishyufu';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m04new.json"));

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
 

    //var thisQuery = "INSERT INTO aameetings ( mtaddress, mtgroup, mtlat, mtlon, mtlocation, mtwheelchair ,mtday, mtstart, mtend,  mttype,mtspinterest,mtzone) VALUES (E'"+value.streetAddress+"','"+value.group + "',"+value.lat+ ","+ value.long+ ",'"+ value.mtlocation+"','"+value.wheelchair+ "','{"+ value.day + "}','{" + value.start + "}','{"+ value.end +"}','{"+value.type+"}','{"+ value.spinterest+ "}',"+ value.zone+");";
    var thisQuery = "SELECT mtgroup, mtzone, mtlocation, mtday, mttype FROM aameetings WHERE mtzone=1";

    setTimeout(callback, 1000); 
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
}); 