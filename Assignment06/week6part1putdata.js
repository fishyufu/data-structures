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

//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m01new.json"));
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m02new.json"));
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m03new.json")); 
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m04new.json"));
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m05new.json")); 
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m06new.json"));
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m07new.json"));
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m08new.json"));
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m09new.json"));
//var addressesForDb = JSON.parse(fs.readFileSync("clean-data/m10new.json"));

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();

//var thisQuery = "INSERT INTO aameetings ( mtaddress, mtgroup, mtlat, mtlon, mtlocation, mtwheelchair ,mtday, mtstart, mtend,  mttype,mtspinterest,mtzone) VALUES (E'"+value.streetAddress+"','"+value.group + "',"+value.latitude+ ","+ value.longitude+ ",'"+ value.mtlocation+"','"+value.wheelchair+ "','{"+ value.day + "}','{" + value.start + "}','{"+ value.end +"}','{"+value.type+"}','{"+ value.spinterest+ "}',"+ value.zone+");"; //(for 7，8 work)    
    
//var thisQuery = "INSERT INTO aameetings ( mtaddress, mtgroup, mtlat, mtlon, mtlocation, mtwheelchair ,mtday, mtstart, mtend,  mttype,mtspinterest,mtzone) VALUES (E'"+value.address+"','"+value.group + "',"+value.latLong.Lat+ ","+ value.latLong.Lng+ ",'"+ value.mtlocation+"','"+value.wheelchair+ "','{"+ value.mtDate + "}','{" + value.start + "}','{"+ value.end +"}','{"+value.type+"}','{"+ value.spinterest+ "}',"+ value.zone+");"; //（for 6,10 work）
 
//var thisQuery = "INSERT INTO aameetings ( mtaddress, mtgroup, mtlat, mtlon, mtlocation, mtwheelchair ,mtday, mtstart, mtend,  mttype,mtspinterest,mtzone) VALUES (E'"+value.address+"','"+value.group + "',"+value.latLon.Latitude+ ","+ value.latLon.Longitude+ ",'"+ value.location+"','"+value.wheelchair+ "','{"+ value.day + "}','{" + value.start + "}','{"+ value.end +"}','{"+value.type+"}','{"+ value.spinterest+ "}',"+ value.zone+");"; //(this is for 3,5,9);

//var thisQuery = "INSERT INTO aameetings ( mtaddress, mtgroup, mtlat, mtlon, mtlocation, mtwheelchair ,mtday, mtstart, mtend,  mttype,mtspinterest,mtzone) VALUES (E'"+value.streetAddress+"','"+value.group + "',"+value.lat+ ","+ value.long+ ",'"+ value.mtlocation+"','"+value.wheelchair+ "','{"+ value.day + "}','{" + value.start + "}','{"+ value.end +"}','{"+value.type+"}','{"+ value.spinterest+ "}',"+ value.zone+");"; //(for 1, 2, and 4,work)

// var thisQuery = "SELECT mtgroup, mtzone, mtlocation, mtday, mttype FROM aameetings WHERE mtzone=1";

    setTimeout(callback, 1000); 
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
}); 