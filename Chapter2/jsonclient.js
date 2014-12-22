/**
 * New node file
 */
"use strict";
const
	net = require('net'),
	ldj = require('./ldj.js'),
	netclient = net.connect({port:5432}),
	ldjclient = ldj.connect(netclient);
	

ldjclient.on('message', function(message) {
	if (message.type === 'watching') {
		console.log("Now watching: " + message.file);
		} else if (message.type === 'changed') {
		console.log(
		"File '" + message.file + "' changed at " + new Date(message.timestamp)
		);
		} else {
		throw Error("Unrecognized message type: " + message.type);
		}
	
});