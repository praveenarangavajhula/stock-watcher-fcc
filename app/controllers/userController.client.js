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

//Angular Material Config
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
app.controller('stockController',['$scope','$http','socket',function($scope, $http,socket) {
	
	//socket to update all users' chart and $scope
	socket.on('send stock', function (newStockData) {
		console.log(newStockData);
    	$scope.myStocks.push(newStockData);//update $scope
    	drawStock(newStockData['code'],newStockData['stockData']);//update chart
    });
    
    socket.on('delete stock', function (data) {
		console.log(data);
    	$scope.myStocks.splice(data.index,1); //update $scope
		removeStock(data.stockId);//update chart
    });
    
    socket.on('update stock', function (data) {
		console.log(data);
    	//delete old record
		$scope.myStocks.splice(data.index,1); 
		removeStock(data.stockId);
		//add new record	
		$scope.myStocks.push(data.newStockData); 
		drawStock(data.newStockData['code'],data.newStockData['stockData']); 
    });
				
	//load stock data from database when first load the page
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
	
	//functions defined for this $scope
	$scope.addStock = function() {
		$http.post('/api/stocks/' + $scope.newStock)
		.then(function(response) {
			if(response.data.error) { //if stock code not exist
				$scope.error = response.data.error;
			} else {
				var newStockData = processJSON(response.data.json);
				console.log(newStockData);
				socket.emit('stock added',newStockData); //emit add stock event to server;
				$scope.newStock = '';
			}
		});
	};
	
	$scope.deleteStock = function(index) {
			var stockId = $scope.myStocks[index]['code'];
			$http.delete('/api/stocks/' + stockId)
			.then(function(response) {
				//console.log(response);
				socket.emit('stock deleted',{
					index:index,
					stockId:stockId
				}); //emit delete stock event to server;
			});
	}
	
	$scope.updateStock = function(index) {
		var stockId = $scope.myStocks[index]['code'];
		$http.put('/api/stocks/' + stockId)
		.then(function(response) {
			console.log(response);
			var newStockData = processJSON(response.data.json);
			socket.emit('stock updated',{
					index:index,
					stockId:stockId,
					newStockData:newStockData
				}); //emit delete stock event to server;
			
			$scope.newStock = '';
		});
	}
	
	$scope.clearWarning = function() {
		$scope.error = '';
	}
	
}]);



