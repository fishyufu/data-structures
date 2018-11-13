// var diaryEntries = [];

// class DiaryEntry {
//   constructor(primaryKey, date, waterinlitter, efficiency, healthy, mood, sleepinhour) {
//     this.pk = {};
//     this.pk.S = primaryKey.toString(); //primary key has to be string because I select string when create table. 
//     this.date = {}; 
//     this.date.S = new Date(date).toDateString();
//     this.waterinlitter = {}; 
//     this.waterinlitter.N = waterinlitter.toString();
//     this.efficiency = {};
//     this.efficiency.S = efficiency;
//     this.healthy = {};
//     this.healthy.BOOL = healthy; 
//     this.mood = {};
//     this.mood.S = mood; 
//     this.sleepinhour = {};
//     this.sleepinhour.N = sleepinhour.toString(); //this transfer number to string.
//   }
// }


// diaryEntries.push(new DiaryEntry("0","October 13, 2018", "1", "low", false, "feeling down", "7"));
// diaryEntries.push(new DiaryEntry("1","October 14, 2018", "2", "high", true, "happy because I finished Data-Structure homework", "4"));
// diaryEntries.push(new DiaryEntry("2","October 15, 2018", "2", "midium", false, "happy but emotional" , "7"));
// diaryEntries.push(new DiaryEntry("3","October 16, 2018", "3", "high", true, "very excited","5"));

// console.log(diaryEntries);

 var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.IAM_ID;
    AWS.config.secretAccessKey = process.env.IAM_KEY;
    AWS.config.region = "us-east-2"; // in ohio


var dynamodb = new AWS.DynamoDB();

//ask from here.
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
//    KeyConditionExpression: "#tp = :topicName and dt between :minDate and :maxDate", // the query expression
//     ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
//         "#tp" : "topic"
//     };
//     ExpressionAttributeValues: { // the query values
//         ":topicName": {S: "work"},
//         ":minDate": {N: new Date("September 1, 2018").valueOf().toString()},
//         ":maxDate": {N: new Date("October 16, 2018").valueOf().toString()}
//     }
// };


dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});