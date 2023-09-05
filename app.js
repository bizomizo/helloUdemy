const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')  //127.0.0.1 is same as local host resolved to IPv4
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!!");
})
.catch(err => {
    console.log("OH NO MONGO ERROR!!!");
    console.log(err);
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'my backyard', description: 'cheap camping!'});
    await camp.save();
    res.send(camp);
});

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
});
