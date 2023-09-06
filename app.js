const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));             //this is for faking the method=POST in the edit.ejs page into a PUT or PATCH form method in the app.put below

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', async (req, res) => {   //page reference on the server requires the "/" to start the path
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds});     //ejs with path set above starts looking in the views folder, so don't add "/" to path
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});



app.get('/campgrounds/:id', async (req, res) => {           // the url will include the id from the db, the ":" will store this value within req.params.id
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', {campground});
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', {campground});
});

app.put('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;                        //this format is called destructuring an object, within req.params a property id exists and this will pull this property out to a variable named 'id'
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground}); // the "..." is called a spread operator and will copy all of an existing object into the function
    res.redirect(`/campgrounds/${campground._id}`);     //the "_id" is inherent to every entry created in the database and automatically assigned an id value stored under _id
    
});

app.delete('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});




app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
});
