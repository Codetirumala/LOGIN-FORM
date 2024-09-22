const mongoose = require('mongoose');
require('dotenv').config();

const uri = 'mongodb+srv://tirumalareddi712:QAplzwbxxwTZvxHm@cluster0.xarhc.mongodb.net/loginform?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB: ", error);
    });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema); 

module.exports = User;
