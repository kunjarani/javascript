var fs = require('fs');
var file = fs.readFileSync('product.csv').toString();
var content = file.split('\n');
var header = content[0].split(',');
var indexOf2013 = header.indexOf(' 3-2013')+1;
 var indexOf1993 = header.indexOf(' 3-1993')+1;
 console.log(indexOf2013);
var oilseeds = [];
for (var i = 1; i < content.length; i++) {
  if(content[i].split(',')[0].split(' ')[2]=='Oilseeds'){
      var crop = content[i].split(',')[0].split('Oilseeds')[1];
      var value = content[i].split(',')[indexOf2013];
      if(crop){
        oilseeds.push({
          crop:crop,
          value:value
        });
      }

  }
}
oilseeds.sort(function(a,b){
  return b.value - a.value;
});
 //console.log(oilseeds);
fs.writeFile('oilseeds.json',JSON.stringify(oilseeds,null,4));

var Foodgrains = [];
for (var i = 1; i < 33; i++) {
  if(content[i].split(',')[0].split(' ')[2]=='Foodgrains'){
      var crop = content[i].split(',')[0].split('Foodgrains')[1];
      var value= content[i].split(',')[indexOf2013];
      if(crop){
        Foodgrains.push({
          crop:crop,
          value:value
        });
      }

  }
}
Foodgrains.sort(function(a,b){
  return b.value- a.value;
});
fs.writeFile('Foodgrains.json',JSON.stringify(Foodgrains,null,4));


var commercial = [];
for (var i = 1; i < content.length; i++) {
  if(content[i].split(',')[0].split(' ')[2]=='Commercial'){
      var crop = content[i].split(',')[0].split('Commercial Crops')[1];
      var value = [];
      if(crop){
        var year = 1992;
        for (var j = indexOf1993; j <= indexOf2013; j++) {
          year++;
          var v = {};
          v.year = year;
          v.value = content[i].split(',')[j]
          if(v.value=='NA'){
            v.value = 0;
          }
          value.push(v);
        }
        if(crop!=' Crops Jute and Mesta'){
          commercial.push({
            crops:crop,
            value:value
          });
        }
      }

  }
}
var total = {};
total.name = 'aggregate crops';
total.value = [];
var year = 1993;
for (var i = 0; i < commercial[0].value.length; i++) {
  var sum = 0;
  for (var j = 0; j < commercial.length; j++) {
    if(commercial[j])
    sum+= parseFloat(commercial[j].value[i].value);
  }
  total.value.push({
    year : year + i,
    sum:sum
  })
}

fs.writeFile('commercial.json',JSON.stringify(total,null,4));

var yearData=[];
for (var i = indexOf1993; i <= indexOf2013; i++) {
  var year = 1993;
  for (var j = 0; j < content.length; j++) {
    var state = content[j].split(',')[0].split('Rice Volume')[1];
    if(state == ' Andhra Pradesh'){
      //|| state ==' Karnataka' || state ==' Tamil Nadu' || state ==' Kerala')
      key = year+i-indexOf1993;
      valueAP = content[j].split(',')[i];
      if (valueAP=="NA") {
        valueAP = 0;
      }
    }
    if(state == ' Karnataka'){
      key = year+i-indexOf1993;
      valueKA = content[j].split(',')[i];
      if (valueKA=="NA") {
        valueKA = 0;
      }
    }
    if(state ==' Tamil Nadu' ){
      key = year+i-indexOf1993;
      valueTN = content[j].split(',')[i];
      if (valueTN=="NA") {
        valueTN = 0;
      }
    }

    if(state ==' Kerala' ){
      key = year+i-indexOf1993;
      valueKE = content[j].split(',')[i];
      if (valueKE=="NA") {
        valueKE = 0;
      }
    }


  }

  yearData.push({key,AndhraPradesh:valueAP,Karnataka:valueKA,TamilNadu:valueTN,Kerala:valueKE });
}
fs.writeFile('south.json',JSON.stringify(yearData,null,4));
