const express = require('express');
const app = express();
const connectDB = require('./dbConnect');
const Listing = require('./models/listingmodel')
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("layout", "layouts/boilerplate");
app.engine('ejs', ejsMate);


//connecting to db from importing dbConnect.js
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/listings', async(req, res) => {
    const alllisting = await Listing.find({});
    res.render('listings/index.ejs', { alllisting });
});

app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
})

app.get('/listings/:id', async(req, res) => {
    let {id} = req.params;
    const onelisting = await Listing.findById(id);
    res.render('listings/show.ejs', { onelisting });


})

//create new listing
app.post('/listings', async(req, res) => {
    const { title, description, image, price, location, country } = req.body;
    let newListing = new Listing({
        title,
        description,
        image,
        price,
        location,
        country
    })
    await newListing.save();
    res.redirect('/listings')
})


//edit listing
app.get('/listings/:id/edit', async(req, res) => {
    let {id} = req.params;
    const onelisting = await Listing.findById(id);
    res.render('listings/edit.ejs', { onelisting });
    console.log("page loaded")
})

//edited listing
app.put('/listings/:id', async(req, res) => {
    let {id} = req.params;
    const { title, description, image, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country });
    console.log("updated")
    res.redirect(`/listings`);
});

//delete listing
app.delete('/listings/:id', async(req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    
    res.redirect('/listings');
});



// app.get('/testlisting', async(req, res) => {
//         let sampleListing = new Listing({
//             title:"new  home",
//             description : "buying this will worth money",
//             price : 120000,
//             location : "Nepal",
//             country : "nepal",
//         })
//         await sampleListing.save()
//         console.log("first sample saved")
//         res.send("sample saved")
// })

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

