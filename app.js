const express = require('express');
const path = require('path');

const PORT = 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, 'static', "/html/demo1.html"))
});

const server = app.listen(PORT, () =>{
	console.log('Server listing on', server.address());
});