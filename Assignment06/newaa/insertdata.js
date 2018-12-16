// modules
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


var rawData = fs.readFileSync('../newaa/aameetingdata.json');
var mdata = JSON.parse(rawData);


async.eachSeries(mdata, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();

    // var thisQuery = "INSERT INTO aameetingsupdate ( address,mtgroup,lat,long, mtlocation, wheelchair ,mtday, mtstart, mtend, mttype,mtspin,mtzone) VALUES (E'"+value.address+"','"+value.mtroup + "',"+value.lat+ ","+ value.long+ ",'"+ value.mtlocation+"','"+value.wheelchair+ "','"+ value.mtday + "','" + value.mtstart + "','"+ value.mtend +"','"+value.mttype+"','"+ value.mtspin+ "',"+ value.mtzone+");";
// var thisQuery = "SELECT mtgroup, mtzone, mtlocation, mtday, mttype FROM aameetingsupdate WHERE mtzone=1";
    var thisQuery = `SELECT address, mtlocation as location, json_agg(json_build_object('day', mtday, 'time', mtstart)) as meetings
                 FROM aameetingsupdate 
                 WHERE mtday = 'Saturday'
                 GROUP BY address, mtlocation
                 ;`;             
    
    setTimeout(callback, 1000);
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
});




//
// // drop tables
// const client = new Client(db_credentials);
// client.connect();
// var thisQuery = "DROP TABLE aameetings";
//     client.query(thisQuery, (err, res) => {
//         console.log(err, res);
//         client.end();
//     });