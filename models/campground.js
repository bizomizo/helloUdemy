const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //just to give the mongoose.Schema a shortcut

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);