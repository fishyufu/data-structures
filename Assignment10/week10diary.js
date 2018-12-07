var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'fishyufu';
db_credentials.host = 'yufu.cbyumywtsktv.us-east-2.rds.amazonaws.com';
db_credentials.database = 'fishyufu';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// AWS DynamoDB credentials
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-2";



// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    var params = {
    TableName : "DearDiary",
    KeyConditionExpression: "pk = :primaryKey", // the query expression
    //ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
    //     "#pk" : "pk"
    // },
    ExpressionAttributeValues: { // the query values
        ":primaryKey": {S: "1"},
      
    }
};

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            res.send(data.Items);
            console.log('3) responded to request for dear diary data');
        }
    });

});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});