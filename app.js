var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/moviesApi')

var Movie = require('./models/movieModel')

var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', router);


router.route('/Movies')
    .post(function(req, res) {
        var movie = new Movie(req.body);
        movie.save();
        res.status(201).send(movie);

    })
    .get(function(req,res) {
        var query = {};
        if(req.query.director){
            query.director = req.query.director;
        }
        
        Movie.find(query, function (err, movies){
            if(err){
                res.status(500).send(err)
            }else{
                res.json(movies)
            }
        });
    });

router.route('/Movies/:movieId')
    .get(function(req,res){
        Movie.findById(req.params.movieId, function(err,movie) {
            if(err){
                res.status(500).send(err);
            } else {
                res.json(movie);
            }
        })
    })


app.get('/', function(req,res) {
    res.send('Welcome to the api');
});

app.listen(port, function() {
    console.log('running on port '+ port);
})