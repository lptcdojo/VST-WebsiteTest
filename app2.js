const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const request=require('request');
const Datastore = require('nedb');

const PORT = 8080;
const app = express();

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
	.get('http://localhost:8080/api/fruits?name='+req.query.Name)
	.on('data', (data) => {
		emojis = JSON.parse(data)
		console.log("Rex Sneeze")
		res.render("home.html", {'emojis': emojis})
	})	
});
app.get("/test", (req,res) => {
	res.render("test.html", {name: req.query.FirstName, message: req.query.message, task: req.query.task})
})

app.get('/api/fruits', (req,res) =>{
	let name = req.query.name;
	let ffs = [];
	
	fruits.forEach((fruit) => {
		if (fruit.listname.indexOf(name) >= 0) {
			ffs.push(fruit);
		}			
	})
	
	res.status(200).json(ffs);
})
app.get('*', function(req, res) {
    res.redirect('/html/error.html');
});


const server = app.listen(PORT, () =>{
	console.log('Server listing on', server.address());
});