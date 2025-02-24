const express = require('express');
const app = express();
const connectDB = require('./dbConnect');
const Listing = require('./models/listingmodel')


//connecting to db from importing dbConnect.js
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/listings', async(req, res) => {
    const alllisting = await Listing.find({});
    console.log(alllisting)
    res.send("listing fetched")
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