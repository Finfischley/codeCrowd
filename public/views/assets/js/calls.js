// FRONT-END CALLS

// CREATE A NEW USER =============================================
// EX: var newUser = {
// 	first_name: "jaz"
// 	last_name: "estrada"
// 	username: "myusername"
// 	password: "mypassword"
// }
// All fields are required
$.post("/newuser", newUser, function(){
	// whatever needs to be done afterwards
});

// WHEN A USER LOGS IN =============================================
// This will check if their credentials are correct
// EX: var credentials = {
// 	username: "myusername",
// 	password: "mypassword"
// }
$.post("/login", credentials, function(data){
	// whatever needs to be done afterwards
});

// GRAB STUDY-GUIDE POSTS =============================================
// Two options -->
// Option 1: Grab all the posts
$.get("/api/study-guide", function(data){
	// whatever needs to be done with the data
});
// Option 2: Grab specific posts according to tag
// url example (tag = javascript): "api/study-guide/javascript"
var topic;
var queryURL = "/api/study-guide" + topic;
$.get(queryURL, function(data){
	// whatever needs to be done with the data
});

// GRAB PARTICULAR STUDY-GUIDE POST =============================================
// url example (grabbing post with id = 1): "/api/study-guide/posts/1"
var id;
$.get("/api/study-guide/posts/" + id, function(data){
	// whatever needs to be done with the data
});

// CREATE NEW STUDY-GUIDE POST =============================================
// EX: var newPost = {
// 	title: "title of the post"
// 	content: "content of the post"
// 	tag: "tag of the post"
// }
// All fields are required
$.post("/api/study-guide/post", newPost, function(){
	// whatever needs to be done next
});

// UPDATE STUDY-GUIDE POST'S CONTENT =============================================
// Does not include likes or flags
// EX: var newUpdate = {
// 	title: "whatever"
// 	content: "whatever"
// }
var id;
$.ajax({
	method: "PUT",
	url: "api/study-guide/post/" + id, // id will be the post's id
	data: newUpdate
}).done(function(){
	// whatever needs to be done
});

// UPDATE STUDY-GUIDE POST'S LIKES =============================================
// EX: var likes = {
// 	"likes": 4 
// }
var id;
$.ajax({
	method: "PUT",
	url: "api/study-guide/likes/" + id, // id will be the post's id
	data: likes
}).done(function(){
	// whatever needs to be done
});

// UPDATE STUDY-GUIDE POST'S FLAGS =============================================
// EX: var flags = {
// 	"flags": 3 
// }
var id;
$.ajax({
	method: "PUT",
	url: "api/study-guide/flags/" + id, // id will be the post's id
	data: flags
}).done(function(){
	// whatever needs to be done
});

// DELETE STUDY-GUIDE POST =============================================
var id;
$.ajax({
	method: "DELETE",
	url: "api/study-guide/" + id // id will be the post's id
}).done(function(){
	// whatever needs to be done
});

// GRAB ALL INTERVIEW-PREP POSTS =============================================
$.get("/api/interview-prep/posts", function(data){
	// whatever needs to be done with the data
});

// GRAB INTERVIEW-PREP POSTS BY LOCATION =============================================
// Query will be based on city AND state
// url example: "/api/interview-prep/location/austin/tx"
var city;
var state;
var queryURL = "/api/interview-prep/location/" + city + "/" + state;
$.get(queryURL, function(data){
	// whatever needs to be done with the data
});

// GRAB INTERVIEW-PREP POSTS BY CITY =============================================
// url example: "/api/interview-prep/city/austin"
var city;
var queryURL = "/api/interview-prep/city/" + city;
$.get(queryURL, function(data){
	// whatever needs to be done with the data
});

// GRAB INTERVIEW-PREP POSTS BY STATE =============================================
// url example: "/api/interview-prep/state/tx"
var state;
var queryURL = "/api/interview-prep/state/" + state;
$.get(queryURL, function(data){
	// whatever needs to be done with the data
});

// GRAB INTERVIEW-PREP POSTS BY POSITION =============================================
// url example: "/api/interview-prep/position/frontend developer"
var position;
var queryURL = "/api/interview-prep/position/" + position;
$.get(queryURL, function(data){
	// whatever needs to be done with the data
});

// GRAB INTERVIEW-PREP POSTS BY COMPANY =============================================
// url example: "/api/interview-prep/company/apple"
var company;
var queryURL = "/api/interview-prep/company/" + company;
$.get(queryURL, function(data){
	// whatever needs to be done with the data
});

// CREATE INTERVIEW-PREP POST =============================================
// url example: "/api/interview-prep/state/tx"
// EX: var newPost = {
// 	title: "xxx" (required)
// 	content: "xxx" (required)
// 	city: "xxx" (required)
// 	state: "xxx" (required)
// 	position: "xxx" (required)
// 	company: "xxx"
// }
$.post("/api/interview-prep/post", newPost ,function(){
	// whatever needs to be done 
});

// UPDATE INTERVIEW-PREP POST'S CONTENT =============================================
// Does not include likes or flags
// EX: var newUpdate = {
// 	title: "whatever"
// 	content: "whatever"
//	and whatever else needs to be updated
// }
var id;
$.ajax({
	method: "PUT",
	url: "api/interview-prep/post/" + id, // id will be the post's id
	data: newUpdate
}).done(function(){
	// whatever needs to be done
});

// UPDATE INTERVIEW-PREP POST'S LIKES =============================================
// EX: var likes = {
// 	"likes": 4 
// }
var id;
$.ajax({
	method: "PUT",
	url: "api/interview-prep/likes/" + id, // id will be the post's id
	data: likes
}).done(function(){
	// whatever needs to be done
});

// UPDATE INTERVIEW-PREP POST'S FLAGS =============================================
// EX: var flags = {
// 	"flags": 3 
// }
var id;
$.ajax({
	method: "PUT",
	url: "api/interview-prep/flags/" + id, // id will be the post's id
	data: flags
}).done(function(){
	// whatever needs to be done
});

// DELETE INTERVIEW-PREP POST =============================================
var id;
$.ajax({
	method: "DELETE",
	url: "api/interview-prep/" + id // id will be the post's id
}).done(function(){
	// whatever needs to be done
});





