var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/moviesApi')

var Movie = require('./models/movieModel')

var app = express();

var port = process.env.PORT || 3000;

var router = require('./Routers/movieRouter')(Movie);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', function(req,res) {
    res.send('Welcome to the api');
});

app.listen(port, function() {
    console.log('running on port '+ port);
})