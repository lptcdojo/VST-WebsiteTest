const http = require('http');

const hostname = "127.0.0.1";
const port = 8080;

const htmlHome = `
<html>
<body>
<p>Welcome to http://${hostname}:${port}! <a href="/Img/">Click here to see a picture of a pineapple!<a/></p>
</body>
</html>`

const htmlImg = `<html>
<body>
<img src="http://cdn.shopify.com/s/files/1/0206/9470/products/Pineapple_Large_5052_resized_dddf2092-66c5-459f-ae9a-bf48a4eb265d_grande.jpeg?v=1441108713"></img><a href="/"><p>Go back</p></a>
</body>
</html>`

const htmlError = `<html>
<body>
<h1>Error 404: Webpage not found</h1>
<img src="https://lh4.googleusercontent.com/6aMizjbx2ZLRHCZXFkt4RPemrUvqa9CPoAa6UDIdetPBwF53HzaMisrSi-cPWqS-bx6UscKVuAn41CVWb3qm=w1920-h917-rw" height=540 width=960></img>
</body>
</html>`

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-type', 'text/html');
	if (req.url === '/') {
		res.end(htmlHome);
	} else if (req.url == '/Img/') {
		res.end(htmlImg);
	} else {
		res.statusCode = 404;
		res.end(htmlError);
	}
});

server.listen(port, hostname, () => {
	console.log(`Yayyyyyyy! This thing auctually works! BTW the hostname is http://${hostname}:${port}`)
});