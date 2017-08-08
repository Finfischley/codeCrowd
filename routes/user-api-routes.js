// Users Routes =====================================================

// Import models
var db = require("../models");

module.exports = function(app){

	// READ user information to check if they can log in
	app.get("/api/user/:username/:password", function(readReq, readRes){

		// console.log(readReq.params.username);
		db.User.findAll({
			where: {
				username: readReq.params.username
			}
		}).then(function(results){
			// console.log(results[0]);
			if (!results[0]){
				readRes.send("wrong username");
				return;
			}
			var password = results[0].password;

			if (readReq.params.password !== password){
				readRes.send("wrong password");
			
				// console.log("logged in" + loggedIn);
				return;
			}

			readRes.send("you are logged in");

		});
	});

	// CREATE new user
	app.post("/newuser", function(createReq, createRes){

		db.User.create(createReq.body).then(function(results){
			createRes.end();
		});
	});

}


