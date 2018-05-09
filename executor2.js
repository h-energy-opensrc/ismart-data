var shell = require('shelljs')
var moment = require("moment")
var a = moment('2015-01-01')
var b = moment('2018-05-07')

var id = process.argv[2]  // 2nd ex. "c7"
var acc = process.argv[2] // 3rd e
var pw = process.argv[3]  // 4th 

// If you want an exclusive end date (half-open interval)
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
  
  var target = m.format('YYYY-MM-DD')
  console.log(target)
  var version = shell.exec(`node index.js ${target} ${id} ${acc} ${pw}`
    , {silent:false})
  // console.log(version)
}
