// Users Routes =====================================================

// Import models
var db = require("../models");

module.exports = function(app, jwt, secret){

	app.get("/login", function(req, res){
		db.User.findOne({
			where: {
				username: req.query.username,
				password: req.query.password
			}
		}).then(function(results){
			console.log(results);
			if (results === null) {
				res.send("invalid credentials");
				return;
			}
			// console.log(results.dataValues.id);
			var myToken = jwt.sign({}, secret);
	 		res.status(200).json({
	 			token: myToken,
	 			userID: results.id,
	 			firstname: results.first_name
	 		});
		})
	});
	
	// CREATE new user
	app.post("/newuser", function(createReq, createRes){

		db.User.create(createReq.body).then(function(results){
			createRes.end();
		});
	});

}


