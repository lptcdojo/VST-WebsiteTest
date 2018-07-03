const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const request=require('request');
const Datastore = require('nedb');

const PORT = 8080;
const app = express();

db = new Datastore({filename:path.join(__dirname, 'static/test.db'),
autoload: true});


app.use(express.static(path.join(__dirname, 'static')));

nunjucks.configure('templates', {
	autoescape: true,
	express: app
});
app.get('/', (req,res) => {
	res.redirect("/html/Menu.html")
})

app.get('/reviews', (req,res) => {
	res.redirect("/html/reviews.html")
})

app.get('/news', (req,res) => {
	request
	.get('http://localhost:8080/api/news/Title?name='+req.query.Name)
	.on('data', (data) => {
		results = JSON.parse(data)
		console.log("Rex Sneeze")
		console.log(data)
		res.render("news.html", {'data': results})
	})	
});
app.get("/test", (req,res) => {
	request
	.get('http://localhost:8080/api/news/id?name='+req.query.Name)
	.on('data', (data) => {
		data2 = JSON.parse(data)
		console.log("Rex Sneeze")
		console.log(data2)
		res.render("test.html", {'data2': data2})
})
});

app.get('/api/news/id', (req,res) =>{
	let name = req.query.name;
	let ffs = [];
	db.find({_id: name}, function (err,docs) {
		var data = docs
		console.log(data)
		res.status(200).json(docs)
		})
		console.log(ffs)
		
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

app.get('/api/news/title', (req,res) =>{
	let name = req.query.name;
	if (!name) {
		name = '';
	}
	var data = new RegExp(name)
	console.log(data);
	db.find({title: data}, function (err,docs) {
		console.log(docs)
		res.status(200).json(docs)
		});
		});


app.get('*', function(req, res) {
    res.redirect('/html/error.html');
});


const server = app.listen(PORT, () =>{
	console.log('Server listing on', server.address());
});