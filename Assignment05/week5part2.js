var diaryEntries = [];

class DiaryEntry {
  constructor(primaryKey, water, efficiency, healthy, happy, sleep) {
    this.pk = {};
    this.pk.S = primaryKey.toString();
    this.water = {}; 
    this.water.N = water.toString();
    this.efficiency = {};
    this.efficiency.S = efficiency;
    this.healthy = {};
    this.healthy.BOOL = healthy; 
    this.happy = {};
    this.happy.BOOL = happy; 
    this.sleep = {};
    this.sleep.N = sleep.toString();
    }
  }


diaryEntries.push(new DiaryEntry("0", '1 litter', "low", false, false, "7 hour"));
diaryEntries.push(new DiaryEntry("1", '2 litter', "high", true, true, "4 hour"));
diaryEntries.push(new DiaryEntry("2", '2 litter', "midium", false, true, "7 hour"));
diaryEntries.push(new DiaryEntry("3", '3 litter', "high", true, true,"5 hour"));



console.log(diaryEntries);
