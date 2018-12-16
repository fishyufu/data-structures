const { Client } = require('pg');
const cTable = require('console.table');

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

// Sample SQL statements for checking your work: 
// var thisQuery = "SELECT * FROM sensorData;"; // print all values
// var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
// var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensortime,
             MAX(sensorValue::int) max_light
             FROM sensorData
             GROUP BY sensortime
             ORDER BY sensortime;`;
             //Trying to select the largest light intensity value, and time of the day, 
             //but I think right now it's sellecting from the whole data set, not from every day.


client.query(q, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
    client.end();
});
             
// client.query(thisQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     console.table(res.rows);
//     }
// });

// client.query(secondQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     console.table(res.rows);
//     }
// });

// client.query(thirdQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     console.table(res.rows);
//     }
//     client.end();
// });