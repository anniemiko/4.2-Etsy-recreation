var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=mountain&includes=Images,Shop";

var source = $("#item-template").html();
console.log(source);
var template = handlebars.compile(source);



fetchJSONP(url, function(data) {
  console.log(data.results);
  _.each(data.results, function(etsy){
    console.log(etsy);
    var content = {
      title: etsy.title,
      image: etsy.Images[0].url_fullxfull,
      price: etsy.price,
      Maker: etsy.Shop.shop_name
    };

    $('#item-container').append(template(content));
  });

});



















/*
  (url: String, callback: Function) -> undefined

Execute a callback function with the JSON results from the url specified.

Examples
    var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

    fetchJSONP(url, function(data) {
      // do something with data
    });

    // OR

    function logData(data) {
      console.log(data);
    }

    fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
  var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  var script = document.createElement('script');

  window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
  };

  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.body.appendChild(script);
}
