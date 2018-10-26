const { Client } = require('pg');
const cTable = require('console.table');

//sql
// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'fishyufu';
db_credentials.host = 'yufu.cbyumywtsktv.us-east-2.rds.amazonaws.com';
db_credentials.database = 'fishyufu';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
//var thisQuery = "DROP TABLE aameetings;"; 
// var thisQuery = "CREATE TABLE aameetings (mtaddress varchar(100), mtlat double precision, mtlon double precision, mtlocation VARCHAR(100), mtwheelchair boolean, mtday VARCHAR [], mtstart VARCHAR [], mtend VARCHAR [], mtgroup VARCHAR(100), mttype VARCHAR [], mtspinterest TEXT [], mtzone SMALLINT);";
//var thisQuery = "SELECT * FROM aameetings;";
    var thisQuery = "SELECT mtgroup, mtzone, mtlocation, mtday, mttype FROM aameetings WHERE 'Tuesday' = ANY (mtday)";

// client.query(thisQuery, (err, res) => {
//     console.log(err, res);
//     client.end();
// });

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});

