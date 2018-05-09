var admin = require("firebase-admin");
var serviceAccount = require("./fbkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://postechproject.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("data/test1/tab1");
ref.on('value', snap=>{
    var data = snap.val()
    console.log(data.length)
})