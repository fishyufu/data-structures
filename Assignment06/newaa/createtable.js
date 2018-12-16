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

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// // Sample SQL statement to create a table:

var thisQuery = `CREATE TABLE aameetingsupdate (id serial PRIMARY KEY,
                                           address VARCHAR(100),
                                           lat DOUBLE precision,
                                           long DOUBLE precision,
                                           mtgroup VARCHAR(100),
                                           mtlocation VARCHAR(100),
                                           wheelchair BOOLEAN,
                                           mtday VARCHAR(20),
                                           mtstart VARCHAR(20),
                                           mtend VARCHAR(20),
                                           mttype VARCHAR(10),
                                           mtspin TEXT,
                                           mtzone SMALLINT
                                           );`;


client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
