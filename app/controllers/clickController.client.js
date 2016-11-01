'use strict';

// (function () {
    var addBar = document.getElementById('stock-id');
    var addButton = document.getElementById('add');
    
   // var deleteButton = document.querySelector('.btn-delete');
    //var clickNbr = document.querySelector('#click-nbr');
    var apiUrl = appUrl + '/api/clicks/';

//     function updateClickCount (data) {
//       var clicksObject = JSON.parse(data);
//       clickNbr.innerHTML = clicksObject.clicks;
//     }

//     ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

    function addTab(code, name) {;
        $('.stock-block-container').append(
            '<div class="col-md-4 col-sm-6">'
    		            + '<div class="stock-block">'
    		                + '<i class="material-icons remove" data-name="' + code + '">delete_sweep</i>'
    		                + '<h3>'+ code +'</h3>'
    		                + '<p>' + name +'</p>'
    		            + '</div>'
    		        + '</div>'
            );
    }
    
    //add stock binding
    // addButton.addEventListener('click', function () {
    //     ajaxFunctions.ajaxRequest('POST', apiUrl + addBar.value, function (data) {
    //         var stock = JSON.parse(data);
    //         //append tab
    //         addTab(stock['code'],stock['name']);
    //         //add new series to chart
    //         chart.addSeries({
    //             name: addBar.value,
    //             data:stock['stockData']
    //         });
    // });

    //}, false);
    
    //remove stock binding
    // var removeButtons = document.querySelectorAll('.remove');
    // for (var i = 0; i < removeButtons.length; i++) {
    //     var removeButton = removeButtons[i];
    //     removeButton.addEventListener('click', function(event) {
    //         ajaxFunctions.ajaxRequest('DELETE',apiUrl + event.target.getAttribute('data-name'), function(data) {
    //             console.log(data);
    //         });
    //     });
    // }

    //update stock
    
//     deleteButton.addEventListener('click', function () {

//       ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
//          ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
//       });

//     }, false);

// })();
