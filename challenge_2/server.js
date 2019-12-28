const express = require('express');
const app = express();
const fs = require('fs')

app.use(express.static('client'));
app.use(express.urlencoded())

app.post('/post_report', (req, res)=> {
  var report = JSON.parse(req.body.report)
  writeData(report, true)
  res.send(readData(report))
  res.status(201).end()

})


app.listen(3000, ()=> console.log("i'm listening on port 3000"))


var writeData = (obj, firstTime = false) => {
  var nextObjs;
  var data = ''
  var objValues = Object.values(obj);
  nextObjs = objValues.splice(objValues.length - 1, 1)[0];
  objValues = objValues.join(', ')
  if(firstTime) {
    var objKeys = Object.keys(obj);
    objKeys = objKeys.slice(0, objKeys.length - 1).join(', ')
    data = objKeys + '\n' + objValues
  }else {
    data = objValues
  }
  console.log(data)
  fs.appendFileSync('reports.csv', data + '\n')
  for(let i = 0; i < nextObjs.length; i++) {
    writeData(nextObjs[i])
  }
}


var readData = (jsonData) => {
  var jsonDiv = `<div>${JSON.stringify(jsonData)}</div>
  `
  var csvDiv = '<div>';
  csvDiv += fs.readFileSync('reports.csv');
  csvDiv += '</div>'
  return jsonDiv + csvDiv;
}