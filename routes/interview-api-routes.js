// Interview-Prep Routes =====================================================

// Import models
var db = require("../models");

module.exports = function(app){
	// READ all posts
	app.get("/api/interview-prep/posts", function(readReq, readRes){
	
		db.Interview_Prep_Post.findAll().then(function(results){
			// console.log(studyPosts);

			readRes.json(results);
		});
	});

	// READ posts based on location --> Keep this one or city/location routes
	app.get("/api/interview-prep/location/:city/:state", function(readReq, readRes){

		db.Interview_Prep_Post.findAll({
			where: 
			{
				city: readReq.params.city,
				state: readReq.params.state
			}
		}).then(function(results){
			readRes.json(results);
		})
	});


	// READ posts based on city --> Keep this or the location route
	app.get("/api/interview-prep/city/:city", function(readReq, readRes){

		// console.log(readReq.params);

		db.Interview_Prep_Post.findAll({
			where: {
				city: readReq.params.city
			}
		}).then(function(results){
			readRes.json(results);
		});
	});

	// READ posts based on state --> Keep this or location route
	app.get("/api/interview-prep/state/:state", function(readReq, readRes){

		// console.log(readReq.params);

		db.Interview_Prep_Post.findAll({
			where: {
				state: readReq.params.state
			}
		}).then(function(results){
			readRes.json(results);
		});
	});

	// READ posts based on position
	app.get("/api/interview-prep/position/:position", function(readReq, readRes){

		// console.log(readReq.params);

		db.Interview_Prep_Post.findAll({
			where: {
				position: readReq.params.position
			}
		}).then(function(results){
			readRes.json(results);
		});
	});

	// READ posts based on company name
	app.get("/api/interview-prep/company/:company", function(readReq, readRes){

		// console.log(readReq.params);

		db.Interview_Prep_Post.findAll({
			where: {
				company: readReq.params.company
			}
		}).then(function(results){
			readRes.json(results);
		});
	});

	// CREATE a post
	app.post("/api/interview-prep/post", function(createReq, createRes){

		// console.log(createReq.body);

		db.Interview_Prep_Post.create(createReq.body).then(function(results){
			createRes.end(); // Should we return a json even though it won't be used in front-end?
		});

	});

	// UPDATE post's content --> everything except likes and flags
	app.put("/api/interview-prep/post/:id", function(updateReq, updateRes){

		// console.log(updateReq.params.id);

		db.Interview_Prep_Post.update(updateReq.body, {
			where: {
				id: updateReq.params.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end(); // Should we return a json even though it won't be used in front-end?
		});
	});

	// UPDATE post's likes
	app.put("/api/interview-prep/likes/:id", function(updateReq, updateRes){

		// console.log(updateReq.params.id);

		db.Interview_Prep_Post.update(updateReq.body, {
			where: {
				id: updateReq.params.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end(); // Should we return a json even though it won't be used in front-end?
		});
	});

	// UPDATE post's flags
	app.put("/api/interview-prep/flags/:id", function(updateReq, updateRes){

		// console.log(updateReq.params.id);

		db.Interview_Prep_Post.update(updateReq.body, {
			where: {
				id: updateReq.params.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end();// Should we return a json even though it won't be used in front-end?
		});
	});

	// DELETE post
	app.delete("/api/interview-prep/:id", function(deleteReq, deleteRes){

		db.Interview_Prep_Post.destroy({
			where: {
				id: deleteReq.params.id
			}
		}).then(function(results){
			deleteRes.end();
		});
	});

}
