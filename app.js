
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Campground = require('./models/campground');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!!");
})
.catch(err => {
    console.log("OH NO MONGO ERROR!!!");
    console.log(err);
});


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'My backyard', description: 'cheap camping!'});
    await camp.save();
    res.send(camp);
})



app.listen(3000, () => {
    console.log("Serving on port 3000");
});