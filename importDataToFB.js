//  complete
//1324150430 
//0339061375
//0337995003
//0335650156
//1323735506
//0338270748

// fail
// 1710008835 

var fs = require('fs')
var _ = require('lodash')

var obj = JSON.parse(fs.readFileSync('./items_0338270748.txt', 'utf8'))

var admin = require("firebase-admin");
var _ = require("lodash")
var serviceAccount = require("./fbkey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://postechproject.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("data/0338270748");
ref.set(obj)