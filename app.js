const express = require('express');
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const coursesRoutes = require('./routes/courses-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
var Course = require("./models/courses-model");

const app = express();

// set view engine
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/courses', coursesRoutes);
// create home route
app.get('/home', function(req,res) {
	res.redirect("/");
});

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.get('/find-course-by-topic', function(req,res) {
	Course.find(function(err, courses) {
		if(!courses) {
			res.send("Sorry !!!");
		}
		else {
			res.render('find-course-by-topic', { user: req.user,courses_data: courses });
		}
	});
});

app.post('/find-course-by-topic', function(req,res) {
	console.log(req.body.dropdown);
	res.redirect('/find-course-by-topic');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
