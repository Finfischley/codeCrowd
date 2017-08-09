$(document).ready(function(){

	// ---------- GRAB LOG IN STATUS FROM SERVER ---------- //
	
	var loggedIn = true; // demo value
	var loggedUser = "Steve"; // demo value

	// ---------- DYNAMICALLY ADD LOGIN/SIGNUP AND PROFILE LINK TO NAVBAR ---------- //

	if (!loggedIn) {
		// if the user is logged in

		// add "Sup, ___"? link to go to profile to navbar
		var loggedInLink = $("<li class='swapLink' id='loggedInLink'><a href='#'>Welcome, " + loggedUser + "!</a></li>");

		$(".navbar-nav").append(loggedInLink);
	}

	else {
		// if the user is not logged in

		// add "login" link to go to login/signup page in navbar
		var loggedOutLink = $("<li class='swapLink' id='loggedOutLink'><a href='#'>Buzz In</a></li>");

		$(".navbar-nav").append(loggedOutLink);
	}

	// ---------- MODAL WINDOW ---------- //
	var modal = $("#user-modal");

    $("#loggedOutLink").on('click', function(){
    	// show the whole modal window
        $(modal).show();

        // at the start, first show login form
        $("#login-content").show();
        // keep the signup content hidden for now
        $("#signup-content").hide();
    });

    //// CLOSE MODAL WINDOW

    $(".close").on('click', function(){
        $(modal).hide();
    });

    $("#cancel-btn").on('click', function(){
    	$(modal).hide();
    });

    //// GO BACK AND FORTH B/T SIGNUP AND LOGIN PAGES

    $(".alt-signup").on('click', function(){
    	// if 'sign up for code hive' is clicked,

    	// hide login form
    	$("#login-content").hide();

    	// show signup form
    	$("#signup-content").show();
    });

    $(".alt-login").on("click", function(){
    	// if 'buzz in to code hive is clicked',

    	// show login form
    	$("#login-content").show();

    	// hide login form
    	$("#signup-content").hide();
    });

    //// SUBMIT LOGIN/SIGN UP INFORMATION

    // ---------- TOGGLE NAVIGATION ---------- //

    $('.toggle-nav').click(function(e) {
        $(this).toggleClass('active');
        $('.menu ul').toggleClass('active');
 
        e.preventDefault();
	});
});
