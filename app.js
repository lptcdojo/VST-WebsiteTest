const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const PORT = 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'static')));

nunjucks.configure('templates', {
	autoescape: true,
	express: app
});

app.get('/', (req,res) => {
	res.render("home.html", {message: "Rex Sneeze"})
});
app.get("/test", (req,res) => {
	res.render("test.html", {name: req.query.FirstName, message: req.query.message, task: req.query.task})
})
app.get('*', function(req, res) {
    res.redirect('/html/error.html');
});

const server = app.listen(PORT, () =>{
	console.log('Server listing on', server.address());
});