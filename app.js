const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const request=require('request');
const Datastore = require('nedb');

const PORT = 8080;
const app = express();

db = new Datastore({filename:path.join(__dirname, 'static/test.db'),
autoload: true});


const fruits = [
{listname: 'apple', name: 'Apple', description: 'This is a Red Apple.'},
{listname: 'banana', name: 'Banana', description: 'This is a Yellow Banana. It is not a puffy Banana. :('},
{listname: 'pineapple', name: 'Pineapple', description: 'This is a Yellow Space Pineapple. It will take over the world and appear in Tom\'s Game.'},
];

app.use(express.static(path.join(__dirname, 'static')));

nunjucks.configure('templates', {
	autoescape: true,
	express: app
});

app.get('/', (req,res) => {
	request
	.get('http://localhost:8080/api/news?name='+req.query.Name)
	.on('data', (data) => {
		results = JSON.parse(data)
		console.log("Rex Sneeze")
		console.log(data)
		res.render("home.html", {'data': results})
	})	
});
app.get("/test", (req,res) => {
	let name = req.query.Name;
	request
	.get('http://localhost:8080/api/news?name='+req.query.Name)
	.on('data', (data) => {
		data2 = JSON.parse(data)
		console.log("Rex Sneeze")
		console.log(data2)
		res.render("test.html", {'data2': data2})
})
});

app.get('/api/news', (req,res) =>{
	let name = req.query.name;
	let ffs = [];
	db.find({}, function (err,docs) {
		var data = docs
		console.log(data)
		data.forEach((item) => {
			if (item._id == name) {
				ffs.push(item);
			} else if (item.Title.toLowerCase().indexOf(name.toLowerCase()) >= 0) {
				ffs.push(item);
			}
		})
		console.log(ffs)
		res.status(200).json(ffs)
		});
})
app.get('*', function(req, res) {
    res.redirect('/html/error.html');
});


const server = app.listen(PORT, () =>{
	console.log('Server listing on', server.address());
});