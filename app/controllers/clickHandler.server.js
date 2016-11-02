'use strict';

var request = require('request');
var Highcharts = require('highcharts/highstock');
var Stocks = require('../models/stocks.js')

function ClickHandler () {
    //add a new stock
    this.addStock = function(req,res) {
        var stockId = req.params.id;
        var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stockId + '.json?api_key=' + process.env.QUANDL_KEY +'&start_date=2015-01-01';
        //load stock data from Quandl
        request(url, function (error, response, body) {
          if (response.statusCode == 404) {
              res.json({'error':'Wrong Code'});
          }
          if (!error && response.statusCode == 200) {
            var rawData = JSON.parse(body).dataset;
            var code = rawData.dataset_code;
            var updateTime = rawData.refreshed_at;
            
            //save in database
            var stock = new Stocks({
                code:code,
                updated:updateTime,
                json:body
            });
            stock.save(function(err,result) {
                if(err) { throw err; }
                console.log('saved');
            });
            
            res.json(stock);
          }
        });
    }
    //remove stock
    this.removeStock = function(req,res) {
        var stockId = req.params.id;
        Stocks
            .findOneAndRemove({code:stockId})
            .exec(function(err,result) {
                if(err) { throw err;}
                res.json(result);
            });
    }
    //Get all stocks in the database
	this.getStocks = function (req, res) {
	    Stocks
	        .find({})
	        .exec(function(err,result) {
	            if(err) { throw err; }
	            res.json(result);
	        });
	};
	
	//update stock
	this.updateStock = function(req,res) {
        var stockId = req.params.id;
        var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stockId + '.json?api_key=' + process.env.QUANDL_KEY +'&start_date=2015-01-01';
        //load stock data from Quandl
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var rawData = JSON.parse(body).dataset;
            var code = rawData.dataset_code;
            var updateTime = rawData.refreshed_at;
            
            //update database
            Stocks
                .findOneAndUpdate({code:stockId},{updated:updateTime,json:body})
                .exec(function(err,result) {
                    if(err) { throw err;}
                    console.log('updated');
                    res.json(result);
                });
            
          }
        });
	}
}

module.exports = ClickHandler;
