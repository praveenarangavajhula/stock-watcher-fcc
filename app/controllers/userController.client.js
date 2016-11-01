'use strict';

var url = 'https://www.quandl.com/api/v3/datasets/WIKI/FB.json?api_key=1g1-RJGaYCroPrqqD5YV';
var url2 = 'https://www.quandl.com/api/v3/datasets/WIKI/IBM.json?api_key=1g1-RJGaYCroPrqqD5YV';

//empty chart
var chart = new Highcharts.stockChart('chart', {
         rangeSelector: {
            selected: 1
         },
         series: [{
            name: '',
            data: []
         }]
    });

// ajaxFunctions.ajaxRequest('GET',url,function(data) {
//     var rawStockData = JSON.parse(data).dataset.data;
//     var stockData = rawStockData.map(function(d) {
//         return [new Date(d[0]).getTime(),d[1]];
//     }).reverse();
    //console.log(stockData);
   
    // var chart = new Highcharts.stockChart('container', {
    //      rangeSelector: {
    //         selected: 1
    //      },
    //      series: [{
    //         name: 'Facebook',
    //         data: stockData 
    //      }]
    // });

//});

// ajaxFunctions.ajaxRequest('GET',url2,function(data) {
//     var rawStockData = JSON.parse(data).dataset.data;
//     var stockData = rawStockData.map(function(d) {
//         return [new Date(d[0]).getTime(),d[1]];
//     }).reverse();
//     console.log(stockData);
//     $(function() {
        
    //     $('.container').highcharts('stockChart', {
    //          rangeSelector: {
    //             selected: 1
    //          },
    //          series: [{
    //             name: 'IBM',
    //             data: stockData 
    //          }]
    //   });
//     });
// });

