var async = require('async');

var diaryEntries = [];

class DiaryEntry {
  constructor(primaryKey, waterinlitter, efficiency, healthy, mood, sleepinhour) {
    this.pk = {};
    this.pk.S = primaryKey.toString();
    this.waterinlitter = {}; 
    this.waterinlitter.N = waterinlitter.toString();
    this.efficiency = {};
    this.efficiency.S = efficiency;
    this.healthy = {};
    this.healthy.BOOL = healthy; 
    this.mood = {};
    this.mood.S = mood; 
    this.sleepinhour = {};
    this.sleepinhour.N = sleepinhour.toString();
  }
}

diaryEntries.push(new DiaryEntry("0", "1", "low", false, "feeling down", "7"));
diaryEntries.push(new DiaryEntry("1", "2", "high", true, "happy because I finished Data-Structure homework", "4"));
diaryEntries.push(new DiaryEntry("2", "2", "midium", false, "happy but emotional" , "7"));
diaryEntries.push(new DiaryEntry("3", "3", "high", true, "very excited","5"));

console.log(diaryEntries);

 var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.IAM_ID;
    AWS.config.secretAccessKey = process.env.IAM_KEY;
    AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

//Part3
async.eachSeries(diaryEntries, function(value, callback) {

    var params = {};
    params.Item = value; 
    params.TableName = "DearDiary";

    dynamodb.putItem(params, function (err) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log("Item" + value.pk.S + "inserted!");           // successful response
    });
  

  setTimeout(callback, 2000);
});
