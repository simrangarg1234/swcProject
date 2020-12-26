var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	image: String,
	department: String,
	designation: String,
	description: String,
	phone: String,
	courses: [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref: "Course"
		}
	]
});


module.export = mongoose.model("User", userSchema);