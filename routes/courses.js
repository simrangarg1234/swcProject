var express = require("express");
var router = express.Router();
var Course = require("../models/course");

//show all courses
router.get("/", function(req,res){
	//Get all courses from DB
	Course.find({}, function(err,allcourses){
	if(err){
		console.log(err);
	}
	else{
		res.render("courses", {courses:allcourses});
	}
});
		});

//CREATE - add new course to DB
router.post("/", function(req,res){
	var name = req.body.name;
	var title = req.body.title;
	var credits = req.body.credits;
	var desc = req.body.description;
	var refs = req.body.references;
	var conts = req.body.contents;
	var author = {
		id: req.user._id,
		username : req.user.username
	}
	var newcourse = {name: name, title: title, credits:credits, description:desc, contents:conts, author:author}
	//Create new course and save to DB
	Course.create(newcourse, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			//redirect to courses page
			console.log(newlyCreated);
			res.redirect("/courses");
		}
	});
});

//NEW- show form to create new course 
router.get("/new", function(req, res){
	res.render("courses/new");
});

module.exports = router;