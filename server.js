'use strict'

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var routes = require('./app/routes/index.js');



require('dotenv').load();
mongoose.connect(process.env.MONGODB_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/services', express.static(process.cwd() + '/app/services'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

routes(app);

var port = process.env.PORT || 8080;

var io = require('socket.io').listen(app.listen(port));

//Whenever someone connects this gets executed
io.on('connection', function(socket){
    console.log('A user connected');
    //a stock is added by a user
    socket.on('stock added', function (data) {
		io.sockets.emit('send stock',data);
    });
    // a stock is deleted by a user
    socket.on('stock deleted', function (data) {
		io.sockets.emit('delete stock',data);
    });
    //a stock is updated by a user
    socket.on('stock updated', function (data) {
		io.sockets.emit('update stock',data);
    });
    
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

});