'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
// var Users = require(path + '/app/models/users.js');

module.exports = function (app) {

	var clickHandler = clickHandler || new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});


// 	app.route('/profile')
// 		.get(function (req, res) {
// 			res.sendFile(path + '/public/profile.html');
// 		});
		
// 	app.route('/api/search') 
// 		.get(search);
		
// 	app.route('/api/:id')
// 		.get(function (req, res) {
// 			if(req.user) { 
// 				Users.findOne({'twitter.id':req.user.twitter.id},{'_id':false})
//                 .exec( function(err,result) {
//                     if(err) {
//                         throw err;
//                     } 
//                     if (result) {
//                          res.json(result);
//                     } 
                    
//                 });
// 			} else {
// 				res.json({status:"guest"});
// 			}
// 		});

// 	app.route('/auth/twitter')
// 		.get(passport.authenticate('twitter'));

// 	app.route('/auth/twitter/callback')
// 		.get(passport.authenticate('twitter', {
// 			successRedirect: '/',
// 			failureRedirect: '/'
// 		}));

	app.route('/api/stocks')
		.get(clickHandler.getStocks);
		
	app.route('/api/stocks/:id')
		.post(clickHandler.addStock)
		.delete(clickHandler.removeStock)
		.put(clickHandler.updateStock)
 };
