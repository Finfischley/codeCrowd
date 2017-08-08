// Study-Guide Routes =====================================================

// Import models
var db = require("../models");

module.exports = function(app){

	// READ all posts or by tag --> for study-guide search bar
	app.get("/api/study-guide/:topic?", function(readReq, readRes){
		var whereQuery = {}

		if (readReq.params.topic){
			whereQuery.tag = readReq.params.topic;
		}

		db.Study_Guide_Post.findAll({
			where: whereQuery
		}).then(function(results){
			// console.log(studyPosts);

			readRes.json(results);
		});
	});

	// READ a particular post --> to view individual posts/enlarge
	app.get("/api/study-guide/posts/:id", function(readReq, readRes){

		db.Study_Guide_Post.findById(readReq.params.id).then(function(results){
			readRes.json(results);
		});

	});

	// CREATE a post
	app.post("/api/study-guide/post", function(createReq, createRes){

		// console.log(createReq.body);

		db.Study_Guide_Post.create(createReq.body).then(function(results){
			createRes.end(); // Should we return a json even though it won't be used in front-end?
		});

	});

	// UPDATE post's content
	app.put("/api/study-guide/post/:id", function(updateReq, updateRes){

		// console.log(updateReq.params.id);

		db.Study_Guide_Post.update(updateReq.body, {
			where: {
				id: updateReq.params.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end(); // Should we return a json even though it won't be used in front-end?
		});
	});

	// UPDATE post's likes
	app.put("/api/study-guide/likes/:id", function(updateReq, updateRes){

		// console.log(updateReq.params.id);

		db.Study_Guide_Post.update(updateReq.body, {
			where: {
				id: updateReq.params.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end(); // Should we return a json even though it won't be used in front-end?
		});
	});

	// UPDATE post's flags --> NEED TO COME BACK TO THIS
	app.put("/api/study-guide/flags/:id", function(updateReq, updateRes){

		// console.log(updateReq.params.id);

		db.Study_Guide_Post.update(updateReq.body, {
			where: {
				id: updateReq.params.id
			}
		}).then(function(results){
			// console.log(results);
			updateRes.end();// Should we return a json even though it won't be used in front-end?
		});
	});

	// DELETE post
	app.delete("/api/study-guide/:id", function(deleteReq, deleteRes){

		db.Study_Guide_Post.destroy({
			where: {
				id: deleteReq.params.id
			}
		}).then(function(results){
			deleteRes.end();
		});
	});
}

