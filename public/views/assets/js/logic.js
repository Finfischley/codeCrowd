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

			for (var j = 0; j < data.length; j++){

				$("#posts-go-here").empty();

				var div = $("<div>");

	    		var title = $("<h3>");

	    		var para = $("<p>");

			    var row = $("<div>");
			    var col = $("<div>");
			    var panel = $("<div>");
			    var panelHead = $("<div>");
			    var panelBody = $("<div>");
			    // var panelFoot = $("<div>");

			    var likesAmount = data[j].likes;
				var flagsAmount = data[j].flags;

				var footerContent = '<!-- likes and flags here -->' +
				   '<div class="likes-div">' +
						'<span class="likes-amt" val="0">' + likesAmount + '</span>' +
						'  <span id="likes-btn" class="icon likes-icon glyphicon glyphicon-star-empty"></span>' +
					'</div>' +

				   '<div class="flags-div">' +
						'<span class="flags-amt" val="0">' + flagsAmount + '</span>' +
						'  <span id="flags-btn" class="icon flags-icon glyphicon glyphicon-flag"></span>' +
					'</div>';

				var panelFoot = $("<div class='panel-footer'>").html(footerContent);

			    row.addClass("row");

			    col.addClass("col-md-10");

			    panel.addClass("panel panel-default");

			    panelHead.addClass("panel-heading");

			    title.addClass("panel-title");

			    panelBody.addClass("panel-body");

			    // panelFoot.addClass("panel-footer");

			    para.text(data[j].content);
			    panelBody.append(para);

	    		title.text(data[j].position);

			    if (!data[j].company) {
			      panelHead.append(title);
			    } else {
			      title.append(" at " + data[j].company);
			      panelHead.append(title);
			    }

			    panel.append(panelHead);
			    panel.append(panelBody);
			    panel.append(panelFoot);

			    col.append(panel);

			    row.append(col);

			    $("#posts-go-here").append(row);
			}

		});
	}

	// Logout Functionality ==========================================
	// When an user logs out...
	$("#logout-btn").on("click", function(){
		// clear the local storage
		localStorage.clear();
		// redirect to the homepage
		window.location.href = "/";
	});

	$("#submit-dash-interview").on("click", function(event){
		event.preventDefault();

		if ($("#interview-title").val().trim() === "" || 
    		$("#interview-body").val().trim() === "" || 
    		$("#interview-city").val().trim() === "" ||
    		$("#interview-state").val().trim() === "" ||
    		$("#interview-position").val().trim() === ""){
    	return;
  		}

  		var newInterview = {
    		title: $("#interview-title").val().trim(),
    		content: $("#interview-body").val().trim(),
    		city: $("#interview-city").val().trim(),
		    state: $("#interview-state").val().trim(),
		    position: $("#interview-position").val().trim(),
		    company: $("#interview-company").val().trim(),
		    UserId: localStorage.getItem("userId")
  		};

		$.ajax({
    		method: "POST",
    		url: "/api/interview-prep/post",
    		headers: {Authorization: "Bearer " + localStorage.getItem("token")},
    		data: newInterview
  		}).done(function(data){
    		window.location.href = "/dashboard?token=" + localStorage.getItem("token");
  		});
	});

	$("#submit-dash-post").on("click", function(event){
		event.preventDefault();

		if ($("#guide-title").val().trim() === "" ||
        	$("#guide-body").val().trim() === "" ||
        	$("#guide-tag").val().trim() === "") {
        return;
    	}

	    var newPost = {
	        title: $("#guide-title").val().trim().toLowerCase(),
	        content: $("#guide-body").val().trim(),
	        tag: $("#guide-tag").val().trim().toLowerCase()
	    };

    	console.log(newPost);

	    $.post("/api/study-guide/post", newPost, function(){
	        window.location.href = "/dashboard?token=" + localStorage.getItem("token");
	    });
	})

});

// Likes Functionality =========================================
	$(".panel-footer").on("click", "#flags-btn", function(event){
		event.preventDefault();
		console.log("hello");
	});



