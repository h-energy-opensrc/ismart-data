var shell = require('shelljs');


var moment = require("moment")
var a = moment('2015-01-01');
var b = moment('2018-05-07');

// If you want an exclusive end date (half-open interval)
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
  var id = "1324150430"  // 2nd ex. "c7"
  var acc = "1324150430" // 3rd e
  var pw = "A24150430"  // 4th 
  
  var target = m.format('YYYY-MM-DD')
  console.log(target)
  var version = shell.exec(`node index.js ${target} ${id} ${acc} ${pw}`
    , {silent:false})
  // console.log(version)
}




// If you want an exclusive end date (half-open interval)
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
  var id = "0339061375"  // 2nd ex. "c7"
  var acc = "0339061375" // 3rd e
  var pw = "q39061375"  // 4th 

  var target = m.format('YYYY-MM-DD')
  console.log(target)
  var version = shell.exec(`node index.js ${target} ${id} ${acc} ${pw}`
    , {silent:false})
}
