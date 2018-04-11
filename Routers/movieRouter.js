var express = require('express');


var routes = function(Movie) {
    var router = express.Router();
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

    return router;
}

module.exports = routes;