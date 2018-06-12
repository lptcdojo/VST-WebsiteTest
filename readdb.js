const Datastore = require('nedb');
const path = require('path');

db = new Datastore({filename:path.join(__dirname, 'static/test.db'),autoload: true});



db.find({}, function(err, docs){
	console.log(docs)
	console.log("Hello")
});