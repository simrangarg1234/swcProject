var express = require("express");
var router = express.Router();
var Course = require("../models/courses-model");


router.get("/", function(req,res) {
	Course.find(function(err, courses) {
		if(!courses) {
			res.send("Sorry !!!");
		}
		else {
			res.render('courses', { user: req.user,courses_data: courses });
		}
	});
});


router.get("/add-course", function(req,res) {
	//if admin
	res.render("form",{ user: req.user });
	//else
});

router.post("/add-course",function(req,res) {
	cou_id = req.body.course_id;
	cou_name = req.body.course_name;
	credits = req.body.credits;
	cou_des = req.body.course_desc;
	instructur = req.body.instructur;
	level = req.body.level;

	const course = new Course ({
		course_id: cou_id,
		name: cou_name,
		credits: credits,
		description: cou_des,
		instructur: instructur,
		level: level
	});
	course.save();
	res.redirect("/courses");
});

router.post("/coursecontent", function(req,res) {
	res.redirect("/courses/"+req.body.course_id);
})

router.get('/:courseid', function(req,res) {
	Course.find( {course_id: req.params.courseid}, function(err, courses) {
		if(err) {
			res.send("Sorry !!!");
		}
		else {
			res.render('coursecontent', { user: req.user,courses_data: courses });
		}
	});
});

module.exports = router;