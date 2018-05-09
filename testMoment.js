var year = process.argv[2]

var moment = require("moment")
var a = moment('2015-01-01');
var b = moment('2015-01-03');

// If you want an exclusive end date (half-open interval)
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
  var target = m.format('YYYY-MM-DD')
}