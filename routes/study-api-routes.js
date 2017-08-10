// Study-Guide Routes =====================================================

// Import models
var db = require("../models");

module.exports = function(app){

	// READ all posts or by tag/id  --> for study-guide search bar
	app.get("/api/study-guide/read/posts", function(readReq, readRes){

		// console.log(readReq.query)

		db.Study_Guide_Post.findAll({
			where: readReq.query,
			order: [["likes", "DESC"]]
		}).then(function(results){
			// console.log(results);

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
	app.put("/api/study-guide/post/content", function(updateReq, updateRes){

		// console.log(updateReq.body);

		db.Study_Guide_Post.update({
			content: updateReq.body.content
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
	app.put("/api/study-guide/likes", function(updateReq, updateRes){

		// console.log(updateReq.body);

		db.Study_Guide_Post.update({
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

	// UPDATE post's flags --> NEED TO COME BACK TO THIS
	app.put("/api/study-guide/flags", function(updateReq, updateRes){

		// console.log(updateReq.body);

		db.Study_Guide_Post.update({
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
	app.delete("/api/study-guide/delete", function(deleteReq, deleteRes){

		// console.log(deleteReq.body);

		db.Study_Guide_Post.destroy({
			where: deleteReq.body
		}).then(function(results){
			deleteRes.end();
		});
	});
}

