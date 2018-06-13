const Datastore = require('nedb');
const path = require('path');
var dumbcontent= "<p>What is Dumb Doodles?<p><p>Dumb Doodles is a drawing app made by Jake Feeney for kids. You can draw on pictures of people. You can drag and drop moustaches onto pictures of people to make them look silly and you can drag and drop pixelated sunglasses onto yourself so that you look cool. Then you can email and text the photos/doodles you make to your family and friends! And it’s FREE.<br>Here are some screenshots taken with the app:</p><img src='/imgs/demo1.png'></img><img src='/imgs/demo2.png'></img><br><p>I also brought it to the Coderdojo Coolest Projects 2018</p><img src='/imgs/cool1.jpg' height='1365' width='1024'></img><img src='/imgs/cool2.jpg' height='768' width='1024'></img>"
db = new Datastore({filename:path.join(__dirname, 'static/test.db'),
autoload: true});
console.log(dumbcontent)
db.remove({},{multi: true})

var testdata = {msg: 'Hello World', content:"This is a test", Title: "Test"};
db.insert(testdata, function(err, newDoc){
	console.log('Done')
})

var testdata2 = {msg: 'I am a Evil Array', content:"I am a very evil Array",Title: "Evil Array"};
db.insert(testdata2, function(err, newDoc){
	console.log('Done')
})

var testdata3 = {msg: 'Dumb Doodles is a drawing app for kids!',
content:dumbcontent,
Title: "Dumb Doodles"};
db.insert(testdata3, function(err, newDoc){
	console.log('Done')
})


db.find({msg: 'Hello World'}, function (err,docs){
	console.log(docs)
})

db.find({msg: /Evil/ }, function (err,docs){
	console.log(docs)
})