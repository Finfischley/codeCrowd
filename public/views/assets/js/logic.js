// DASHBOARD LOGIC
$(document).ready(function(){
	// If user is logged in, display their username in the dashboard page
	if (localStorage.getItem("username")){
		$("#dash-username").html(localStorage.getItem("username"));
	}

	// View Logged In User Interview Post =============================
	$("#viewpost-btn").on("click", viewInterviewPosts);

	function viewInterviewPosts(){
		// Grab the logged-in user interview posts
		$.ajax({
			method: "GET",
			url: "/api/interview-prep/individual/posts",
			data: {
				UserId: localStorage.getItem("userId")
			},
			headers: {Authorization: "Bearer " + localStorage.getItem("token")}
		}).done(function(data){
			console.log(data);
		});
	}
});



