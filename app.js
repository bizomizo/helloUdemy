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
app.use(express.urlencoded({extended: true}));  //this is related to the app.post below to parse the req.body

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});



app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
});






app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
});
