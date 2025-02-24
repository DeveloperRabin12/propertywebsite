const mongoose = require('mongoose');


// Connect to MongoDB and export it to app.js FILE
async function connectDB(){
  await mongoose.connect('mongodb://localhost:27017/realestate')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
}

module.exports = connectDB;