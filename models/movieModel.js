var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var movieModel = new Schema({
    title: {
        type: String
    },
    director:{
        type: String
    },
    watched:{
        type: Boolean
    }
});

module.exports = mongoose.model('Model',movieModel);