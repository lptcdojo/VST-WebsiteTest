const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const request=require('request');
const PORT = 8080;
const app = express()
nunjucks.configure('templates', {
	autoescape: true,
	express: app
});
app.get('/', (req,res) => {
	res.render("test2.html", {'Content': "<p>Hello World</p>"});
});
const server = app.listen(PORT, () =>{
	console.log('Server listing on', server.address());
});