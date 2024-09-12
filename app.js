require('dotenv').config();
const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const all = require("./router/routes");
const flash = require('express-flash');
const session = require('express-session');

// Only require mongoose and connect to MongoDB if MONGO_URL is set
if (process.env.MONGO_URL) {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Successful connection to MongoDB");
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB:", err);
        });
} else {
    console.log("Skipping MongoDB connection as MONGO_URL is not set.");
}

// Set up EJS templating engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: 'thisIsJustDumb',
    saveUninitialized: false,
    resave: false   // Signing the cookie
}));
app.use(flash());

// Routes
app.use('/', all);

// Start the server
app.listen(8000, () => {
    console.log("App up and running on port 8000");
});
