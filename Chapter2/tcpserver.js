/**
 * New node file
 */
"use strict";
const 
	net = require('net'),
	fs = require('fs'),
	filename = process.argv[2],
	server = net.createServer(function(connection) {
		console.log("Subscriber connected");
		connection.write(JSON.stringify({
				type : 'watching',
				file : filename})
				+ '\n');
		//connection.write("Watching " + filename + "for changes" );
		
		let watcher = fs.watch(filename, function() {
			connection.write(JSON.stringify({
				type:'changed',
				file: filename,
				timestamp: Date.now()
			}) + '\n');
			//connection.write("File "  + filename + "changed: " + Date.now() + "\n");
		});
		
		connection.on("close",function() {
			console.log("Subscriber disconnected");
			watcher.close();
		});
	});

	if(!filename) {
		throw Error("Filename not specified");
	}
	server.listen(5432, function() {
		console.log("Listening for connections on port 5432!");
	});