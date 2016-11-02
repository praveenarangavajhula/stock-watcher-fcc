'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app) {

	var clickHandler = clickHandler || new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/stocks')
		.get(clickHandler.getStocks);
		
	app.route('/api/stocks/:id')
		.post(clickHandler.addStock)
		.delete(clickHandler.removeStock)
		.put(clickHandler.updateStock)
 };
