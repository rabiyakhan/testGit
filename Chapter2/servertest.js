/**
 * New node file
 */
"use strict";
const 
	net = require('net'),
	server = net.createServer(function(connection) {
		console.log('subscriber connected');
		connection.write('{"type":"changed","file":"tar');
		
		let timer = setTimeout(function(){
			connection.write('get","timestamp":1358175758495}' + "\n");
			connection.end();
		},1000);
		
		connection.on('end', function(){
			clearTimeout(timer);
			console.log('Subscriber terminated');
		});
	});

server.listen(5432, function() {
	console.log('test server listening for subscribers');
});  

