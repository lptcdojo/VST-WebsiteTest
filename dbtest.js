const Datastore = require('nedb');
const path = require('path');

db = new Datastore({filename:path.join(__dirname, 'static/test.db'),
autoload: true});

db.remove({},{multi: true})

var testdata = {msg: 'Hello World', content:"This is a test", Title: "Test"};
db.insert(testdata, function(err, newDoc){
	console.log('Done')
})

var testdata2 = {msg: 'I am a Evil Array', content:"I am a very evil Array",Title: "Evil Array"};
db.insert(testdata2, function(err, newDoc){
	console.log('Done')
})

db.find({msg: 'Hello World'}, function (err,docs){
	console.log(docs)
})

db.find({msg: /Evil/ }, function (err,docs){
	console.log(docs)
})