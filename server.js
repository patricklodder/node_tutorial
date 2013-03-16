var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;

		if (request.method === "POST") {

			console.log("POST Reuest for " + pathname + "received, collecting postData before routing!");

			request.setEncoding("utf8");
			request.addListener("data", function(postDataChunk) {
				postData += postDataChunk;
				console.log("Received POST data chunk '" + 
					postDataChunk + "'.");
			});

			request.addListener("end", function() {
				route(handle, pathname, response, postData);
			});

		} else if (request.method === "GET") {
			console.log("GET Request for " + pathname + " receieved.");
			route(handle, pathname, response);

		} else {
			console.log(request.method + " Request for " + pathname + " receieved, sending 405...");
			response.writeHead(405, {'Content-Type': 'text/plain'});
			response.end('method not allowed!');

		}

	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
