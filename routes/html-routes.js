var path = require("path");

module.exports = function(app){

	// Home page
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname, "../public/views/index.html"));
	});

	// Code Hive Team page
	app.get("/team", function(req, res){
		res.sendFile(path.join(__dirname, "../public/views/teampage.html"));
	});

	// Study-guide posts
	app.get("/study-guide", function(req, res){
		res.sendFile(path.join(__dirname, "../public/views/studyguide.html"));
	});

	// Interview-prep posts
	app.get("/interview-prep", function(req, res){
		res.sendFile(path.join(__dirname, "../public/views/interviewstuff.html"));
	});

	// dashboard
	app.get("/dashboard", function(req, res){
		res.sendFile(path.join(__dirname, "../public/views/dashboard.html"));
	});
}
