
$(document).ready(function(){
	var userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDIyMDk0MjF9.eoUT7nw72jE39TnKhUKNh5w7xLYApIWI2dhNA15GIbQ";
	var loggedInUserID = 2;

	// Home login/signup ======================================================
	$("#home-login-btn").on("click", homeLogIn);
	$("#home-signup-btn").on("click", homeSignUp);

	function homeLogIn(event){
		event.preventDefault();
	
		var homeUsername = $("#home-login-username").val().trim();
		var homePassword = $("#home-login-password").val().trim();

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
				window.location.href = "/";
				return;
			}
			userToken = "Bearer " + data.token;
			loggedInUser = data.userID;
			// window.location.href = "/dashboard";
			console.log(data);

			// here is where you will turn loggedIn = true

		});
	}

	function homeSignUp(event){
		event.preventDefault();

		// we need to add validation

		var new_first_name = $("#home-signup-fname").val().trim();
		var new_last_name = $("#home-signup-lname").val().trim();
		var new_username = $("#home-signup-username").val().trim();
		var new_password = $("#home-signup-password").val().trim();

		var new_user = {
			first_name: new_first_name,
			last_name: new_last_name,
			username: new_username,
			password: new_password
		};

		$.post("/newuser", new_user, function(){
			window.location.href = "/";
			// here is where you will turn loggedIn = true
		});
	}

	// Dashboard login/signup ======================================================
	$("#dashboard-login-btn").on("click", dashboardLogIn);
	$("#dashboard-signup-btn").on("click", dashboardSignUp);

	function dashboardLogIn(event){
		event.preventDefault();
	
		var dashboardUsername = $("#dashboard-login-username").val().trim();
		var dashboardPassword = $("#dashboard-login-password").val().trim();

		$.ajax({
			method: "GET",
			url: "/login",
			data: {
				username: dashboardUsername,
				password: dashboardPassword
			}
		}).done(function(data){
			// console.log(data);
			if (data === 'invalid credentials'){
				window.location.href = "/";
				return;
			}
			userToken = "Bearer " + data.token;
			loggedInUser = data.userID;
			window.location.href = "/dashboard";
			// here is where you will turn loggedIn = true

		});
	}

	function dashboardSignUp(event){
		event.preventDefault();

		// we need to add validation

		var new_first_name = $("#dashboard-signup-fname").val().trim();
		var new_last_name = $("#dashboard-signup-lname").val().trim();
		var new_username = $("#dashboard-signup-username").val().trim();
		var new_password = $("#dashboard-signup-password").val().trim();

		var new_user = {
			first_name: new_first_name,
			last_name: new_last_name,
			username: new_username,
			password: new_password
		};

		$.post("/newuser", new_user, function(){
			window.location.href = "/";
			// here is where you will turn loggedIn = true
		});
	}

	// View Logged In User Interview Post =============================
	$("#viewpost-btn").on("click", viewInterviewPosts);

	function viewInterviewPosts(){
		console.log(loggedInUserID);
		$.ajax({
			method: "GET",
			url: "/api/interview-prep/individual/posts",
			data: {
				UserId: loggedInUserID
			},
			headers: {Authorization: userToken}
		}).done(function(data){
			console.log(data);
		});
	}
});



