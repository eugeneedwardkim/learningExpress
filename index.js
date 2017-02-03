var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var mapple = express();

var port = 8000;

mapple.get('/', function(request, response) {
 response.sendFile(__dirname + '/index.html'); 
})

mapple.get('/products', function(request, response) {
 fs.readFile('products.json', 'utf8', function(err, data) {
 var products = JSON.parse(data);
 response.locals = { products: products };
 response.render('products.ejs');
 });
});

mapple.get('/products/:id', function (request, response){
    fs.readFile('products.json', 'utf8', function(err, data){
        var productsParsed = JSON.parse(data);
        var product = productsParsed.filter( function(p){
            return p.id === parseInt(request.params.id);
        })[0];
        response.locals = {product: product};
        response.render('product.ejs');
    });
});

mapple.listen(port);
console.log('Server listening on http://localhost:port');