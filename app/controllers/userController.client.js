'use strict';


//draw empty chart
var chart = new Highcharts.stockChart('chart', {
         rangeSelector: {
            selected: 1
         },
         series: [{
            name: '',
            data: []
         }]
    });


//helper functions
function processJSON(json) {
	var rawData = JSON.parse(json).dataset;
    var code = rawData.dataset_code;
    var name = rawData.name;
    var updateTime = rawData.refreshed_at;
    var rawStockData = rawData.data;
    var stockData = rawStockData.map(function(d) {
        return [new Date(d[0]).getTime(),d[1]];
    }).reverse();
    
    return {
    	code:code,
    	name:name,
    	updated:new Date(updateTime).toDateString(),
    	stockData:stockData
    }
}

//add stock to chart
function drawStock(code,data) {
	chart.addSeries({
			name:code,
			data:data
	});
}

//remove stock from chart
function removeStock(code) {
	chart.series.forEach(function(e) {
		if(e.name === code) {
			e.remove();
		}
	});
}

//angular module
var app = angular.module('stockWatcher',['ngMaterial','ngMessages', 'material.svgAssetsCache']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
       .primaryPalette('grey',{
      'default': '900'})
       .accentPalette('grey',{
      'default': '700'})
    .dark()
; 

  $mdThemingProvider.theme('default')
    .dark();
    $mdThemingProvider.setDefaultTheme('altTheme');
    $mdThemingProvider.alwaysWatchTheme(true);
})

//controller for stock data
app.controller('stockController',['$scope','$http',function($scope, $http) {
	//load stock data from database
	$http.get('/api/stocks')
	.then(function(response) {
		$scope.myStocks = response.data.map(function(e) {
			return processJSON(e['json']);
		});
		
		//add stocks to chart
		$scope.myStocks.forEach(function(e) {
			console.log(e['code']);
			drawStock(e['code'],e['stockData']);
		});
		console.log($scope.myStocks);
	});
	
	$scope.addStock = function() {
		$http.post('/api/stocks/' + $scope.newStock)
		.then(function(response) {
			if(response.data.error) { //if stock code not exist
				$scope.error = response.data.error;
			} else {
				var newStockData = processJSON(response.data.json);
				$scope.myStocks.push(newStockData); //update $scope
				drawStock(newStockData['code'],newStockData['stockData']); //update chart
				$scope.newStock = '';
			}
		});
	};
	
	$scope.deleteStock = function(index) {
			var stockId = $scope.myStocks[index]['code'];
			$http.delete('/api/stocks/' + stockId)
			.then(function(response) {
				//console.log(response);
				$scope.myStocks.splice(index,1); //update $scope
				removeStock(stockId);//update chart
			});
	}
	
	$scope.updateStock = function(index) {
		var stockId = $scope.myStocks[index]['code'];
		$http.put('/api/stocks/' + stockId)
		.then(function(response) {
			console.log(response);
			//delete old record
			$scope.myStocks.splice(index,1); 
			removeStock(stockId);
			//add new record
			var newStockData = processJSON(response.data.json);
			$scope.myStocks.push(newStockData); 
			drawStock(newStockData['code'],newStockData['stockData']); 
			$scope.newStock = '';
		});
	}
	
	$scope.clearWarning = function() {
		$scope.error = '';
	}
	
}]);



