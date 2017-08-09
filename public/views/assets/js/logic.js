console.log("test");
var userToken = false;

$("#login-btn").on("click", logIn);
// $("#dashboard-login-btn").on("click", dashboardLogIn);

function logIn(event){
	event.preventDefault();
	console.log('hello')
	// alert("hi");
	var homeUsername = $("#login-username").val();
	var homePassword = $("#login-password").val();

	console.log(homeUsername);
	console.log(homePassword);

	$.ajax({
		method: "GET",
		url: "/login",
		data: {
			username: homeUsername,
			password: homePassword
		}
	}).done(function(data){
		// console.log(data);
		if (data === 'invalid credentials'){
			console.log("no permission");
			window.location.href = "/";
			return;
		}
		console.log(data);
		userToken = "Bearer " + data.token;
		window.location.href = "/dashboard";
		console.log(userToken);

	});
}

// function dashboardLogIn(){
// 	var dashboardUsername = $("#dashboard-login-username").val().trim();
// 	var dashboardPassword = $("#dashboard-login-password").val().trim();

// 	$.ajax({
// 		method: "GET",
// 		url: "/login",
// 		data: {
// 			username: dashboardUsername,
// 			password: dashboardPassword
// 		}
// 	}).done(function(data){
// 		console.log(data);
// 		if (data === 'invalid credentials'){
// 			window.location.href = "/";
// 			return;
// 		}
// 		userToken = "Bearer " + data.token;
// 		window.location.href = "/dashboard";

// 	});
// }
