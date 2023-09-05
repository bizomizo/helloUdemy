
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')  //127.0.0.1 is same as local host resolved to IPv4
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!!");
})
.catch(err => {
    console.log("OH NO MONGO ERROR!!!");
    console.log(err);
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`    
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});