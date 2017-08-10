// Interview-Prep Routes =====================================================

// Import models
var db = require("../models");

module.exports = function(app){
	// READ all posts
	app.get("/api/interview-prep/posts", function(readReq, readRes){
	
		db.Interview_Prep_Post.findAll({
			order: [["likes", "DESC"]]
		}).then(function(results){
			// console.log(studyPosts);

			readRes.json(results);
		});
	});

	// READ posts based on location --> Keep this one or city/location routes
	app.get("/api/interview-prep/location", function(readReq, readRes){

		// console.log(readReq.query);

		db.Interview_Prep_Post.findAll({
			where: 
			{
				city: readReq.query.city,
				state: readReq.query.state
			}
		}).then(function(results){
			readRes.json(results);
		})
	});


	// READ posts based on city --> Keep this or the location route
	app.get("/api/interview-prep/city", function(readReq, readRes){

		// console.log(readReq.query);

		db.Interview_Prep_Post.findAll({
			where: {
				city: readReq.query.city
			}
		}).then(function(results){
			readRes.json(results);
		});
	});

	// READ posts based on state --> Keep this or location route
	app.get("/api/interview-prep/state", function(readReq, readRes){

		// console.log(readReq.query);

		db.Interview_Prep_Post.findAll({
			where: {
				state: readReq.query.state
			}
		}).then(function(results){
			readRes.json(results);
		});
	});

	// READ posts based on position
	app.get("/api/interview-prep/position", function(readReq, readRes){

		// console.log(readReq.query);

		db.Interview_Prep_Post.findAll({
			where: {
				position: readReq.query.position,
			},
			order: [["likes", "DESC"]]
		}).then(function(results){
			readRes.json(results);
		});
	});

	// READ posts based on company name
	app.get("/api/interview-prep/company", function(readReq, readRes){

		// console.log(readReq.query);

		db.Interview_Prep_Post.findAll({
			where: {
				company: readReq.query.company
			}
		}).then(function(results){
			readRes.json(results);
		});
	});

	// CREATE a post --> AUTHORIZED ONLY
	app.post("/api/interview-prep/post", function(createReq, createRes){

		// console.log(createReq.body);

		db.Interview_Prep_Post.create(createReq.body).then(function(results){
			createRes.end(); // Should we return a json even though it won't be used in front-end?
		});

	});

	// UPDATE post's content --> everything except likes and flags --> AUTHORIZED ONLY
	app.put("/api/interview-prep/post/content", function(updateReq, updateRes){

		// console.log(updateReq.query);

		db.Interview_Prep_Post.update({
			title: updateReq.body.title,
			content: updateReq.body.content,
			city: updateReq.body.city,
			state: updateReq.body.state,
			position: updateReq.body.position,
			company: updateReq.body.company
		}, {
			where: {
				id: updateReq.body.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end(); // Should we return a json even though it won't be used in front-end?
		});
	});

	// UPDATE post's likes
	app.put("/api/interview-prep/likes", function(updateReq, updateRes){

		// console.log(updateReq.body);

		db.Interview_Prep_Post.update({
			likes: updateReq.body.likes
		}, {
			where: {
				id: updateReq.body.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end(); // Should we return a json even though it won't be used in front-end?
		});
	});

	// UPDATE post's flags
	app.put("/api/interview-prep/flags", function(updateReq, updateRes){

		// console.log(updateReq.body);

		db.Interview_Prep_Post.update({
			flags: updateReq.body.flags
		}, {
			where: {
				id: updateReq.body.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end();// Should we return a json even though it won't be used in front-end?
		});
	});

	// DELETE post
	app.delete("/api/interview-prep/delete", function(deleteReq, deleteRes){

		db.Interview_Prep_Post.destroy({
			where: deleteReq.body
		}).then(function(results){
			deleteRes.end();
		});
	});

	// GET individual's posts
	app.get("/api/interview-prep/individual/posts", function(readReq, readRes){
		db.Interview_Prep_Post.findAll({
			where: readReq.query
		}).then(function(results){
			// console.log(results);
			readRes.json(results);
		});
	})

}
