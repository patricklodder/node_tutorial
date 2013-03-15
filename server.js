var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, repsonse) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " receieved.");

		route(handle, pathname, response);
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;