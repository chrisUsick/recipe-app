http = require('http')
http.createServer(function(req, res) {
	res.end("hello there")
}).listen(3000)