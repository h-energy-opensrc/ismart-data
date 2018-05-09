var admin = require("firebase-admin");
var _ = require("lodash")

var serviceAccount = require("./fbkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://postechproject.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("data/com1/20171230");

ref.limitToFirst(10).on('value', (snap)=>{
    console.log(snap.val())
})

