//DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// JSON Web Token
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var secret = "this is a test";

// Unprotected routes
app.use(expressJWT({
	secret: secret,
	getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
     	return req.query.token;
    }
    	return null;
  	}
}).unless({ 
	path: ['/', '/team', '/study-guide', '/interview-prep', '/login',
	'/newuser', '/api/study-guide/read/posts', '/api/study-guide/post',
	'/api/study-guide/post/content', '/api/study-guide/likes', 
	'/api/study-guide/flags', '/api/study-guide/delete',
	'/api/interview-prep/posts', '/api/interview-prep/location',
	'/api/interview-prep/city', '/api/interview-prep/state',
	'/api/interview-prep/position', '/api/interview-prep/company',
	'/api/interview-prep/likes', '/api/interview-prep/flags',
	'/api/interview-prep/delete',
	// index.html css
	'/assets/css/main.css', '/assets/css/full-slider.css',
	// index.html js --> login js/responsive navbar
	 '/assets/js/main.js', '/assets/js/logic.js', "/assets/js/jquery.js",
	 // index.html images
	 '/assets/images/goldenhex.png',
	 // dashboard.html images
	 '/assets/images/hivehex.png',
	 // interviewstuff.html css
	 '/assets/css/interview-modal.css',
	 // interviewstuff.html js
	 '/assets/js/interview-modal.js',
	 // studyguide.html css, js
	 '/assets/css/studyguide-modal.css', '/assets/js/studyguide-modal.js',
	// team html, css, js
	'/assets/css/team.css',
	// code hive logo
	'/assets/images/codehive-logo.png'
	 // routes you need to take away afterwards
	 //'/dashboard'
	 ]
}));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use("/assets/css", express.static(path.join(__dirname, "./public/views/assets/css")));
app.use("/assets/js", express.static(path.join(__dirname, "./public/views/assets/js")));
app.use("/assets/images", express.static(path.join(__dirname, "./public/views/assets/images")));

// Routes
// =============================================================
require("./routes/user-api-routes.js")(app, jwt, secret);
require("./routes/study-api-routes.js")(app);
require("./routes/interview-api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
