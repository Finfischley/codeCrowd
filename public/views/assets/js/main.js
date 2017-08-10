$(document).ready(function(){

    var loggedIn;
    var loggedUser = "";

    // This determines if an user is already logged in or not when opening app
    if (localStorage.getItem("token")) {
        loggedIn = true;
        loggedUser = localStorage.getItem("userFirstName");
    }
    else {
        loggedIn = false;
    }

    // ---------- GRAB LOG IN STATUS FROM SERVER ---------- //
    function dynamicLink(loggedInVal, loggedUserVal){

        // ---------- DYNAMICALLY ADD LOGIN/SIGNUP AND PROFILE LINK TO NAVBAR ---------- //

        if (!loggedInVal) {
            // if the user is not logged in

            // add "login" link to go to login/signup page in navbar
            var loggedOutLink = $("<li class='swapLink' id='loggedOutLink'><a href='#'>Buzz In</a></li>");

            $(".navbar-nav").append(loggedOutLink);

        }

        else {  
            // if the user is logged in

            // add "Sup, ___"? link to go to profile to navbar
            var loggedInLink = $("<li class='swapLink' id='loggedInLink'><a href='#'>Welcome, " + loggedUserVal + "!</a></li>");

            $(".navbar-nav").append(loggedInLink);
        }
    }

    // starting dynamiclink (should show buzz in)
    dynamicLink(loggedIn, loggedUser);

	// ---------- LOGIN/SIGNUP MODAL WINDOW ---------- //
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

    $(".cancel-btn").on('click', function(){
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

    // ---------- POST MODAL WINDOW ---------- //
    var postModal = $("#post-modal");

    postModal.hide();

    $("#viewpost-btn").on('click', function(){
        // show the whole modal window
        $(postModal).show();

        // at the start, first show login form
        $("#post-content").show();
    });

    //// CLOSE MODAL WINDOW

    $(".close-post").on('click', function(){
        $(postModal).hide();
    });

    $("#close-btn").on('click', function(){
        $(postModal).hide();
    });


    // ---------- TOGGLE NAVIGATION ---------- //

    $('.toggle-nav').click(function(e) {
        $(this).toggleClass('active');
        $('.menu ul').toggleClass('active');
 
        e.preventDefault();
	});

    // ---------- HOME LOGIN/SIGNUP ---------- //

    $("#home-login-btn").on("click", homeLogIn);
    $("#home-signup-btn").on("click", homeSignUp);

    // Gives the user the appropiate credentials when they login
    function homeLogIn(event){
        event.preventDefault();
    
        // Grab user input
        var homeUsername = $("#home-login-username").val().trim();
        var homePassword = $("#home-login-password").val().trim();

        // For validation purposes, no empty fields
        if (homeUsername === "" || homePassword === ""){
            // alert("not valid");
            return;
        }

        // Checks if the username and password match 
        $.ajax({
            method: "GET",
            url: "/login",
            data: {
                username: homeUsername,
                password: homePassword
            }
        }).done(function(data){
            // If a match isn't found, then redirect to homepage
            if (data === 'invalid credentials'){
                window.location.href = "/";
                return;
            }

            // If a match is found, then set user's information to local storage
            // This is so validation can be persitent across pages
            localStorage.setItem("token", data.token);
            localStorage.setItem("userFirstName", data.firstname);
            localStorage.setItem("userId", data.userID);
            localStorage.setItem("username", data.username);
           
            // Redirect to the dashboard with JSON Web Token
            window.location.href = "/dashboard?token=" + data.token;

            // dynamically add/change navlink
            loggedIn = true;

            loggedUser = localStorage.getItem("userFirstName");

            dynamicLink(loggedIn, loggedUser);
        });
    }

    // Creates a new user
    function homeSignUp(event){
        event.preventDefault();

        // Grab user input
        var new_first_name = $("#home-signup-fname").val().trim();
        var new_last_name = $("#home-signup-lname").val().trim();
        var new_username = $("#home-signup-username").val().trim();
        var new_password = $("#home-signup-password").val().trim();

        // For validation purposes, no empty fields
        if (new_first_name === "" || new_last_name === "" || new_username === ""
            || new_password === ""){
            // alert("missing info");
            return;
        }

        var new_user = {
            first_name: new_first_name,
            last_name: new_last_name,
            username: new_username,
            password: new_password
        };

        // Adds user to the database and then redirects to the homepage
        $.post("/newuser", new_user, function(){
            window.location.href = "/";
        });
    }

    // ---------- DASHBOARD LOGIN/SIGNUP ---------- //
    $("#dashboard-login-btn").on("click", dashboardLogIn);
    $("#dashboard-signup-btn").on("click", dashboardSignUp);

    function dashboardLogIn(event){
        event.preventDefault();
    
        // Grab user input
        var dashboardUsername = $("#dashboard-login-username").val().trim();
        var dashboardPassword = $("#dashboard-login-password").val().trim();

        // For validation purposes, no empty fields
        if (dashboardUsername === ""|| dashboardPassword === ""){
            // alert("not valid");
            return;
        }

        // Checks if the username and password match 
        $.ajax({
            method: "GET",
            url: "/login",
            data: {
                username: dashboardUsername,
                password: dashboardPassword
            }
        }).done(function(data){
            // If a match isn't found, then redirect to homepage
            if (data === 'invalid credentials'){
                window.location.href = "/";
                return;
            }
            
            // If a match is found, then set user's information to local storage
            // This is so validation can be persitent across pages
            localStorage.setItem("token", data.token);
            localStorage.setItem("userFirstName", data.firstname);
            localStorage.setItem("userId", data.userID);
            localStorage.setItem("username", data.username);

            // Redirect to the dashboard with JSON Web Token
            window.location.href = "/dashboard?token=" + data.token;
            
            // dynamically add/change navlink
            loggedIn = true;

            loggedUser = localStorage.getItem("userFirstName");

            dynamicLink(loggedIn, loggedUser);

        });
    }

    function dashboardSignUp(event){
        event.preventDefault();

        // Grab user input
        var new_first_name = $("#dashboard-signup-fname").val().trim();
        var new_last_name = $("#dashboard-signup-lname").val().trim();
        var new_username = $("#dashboard-signup-username").val().trim();
        var new_password = $("#dashboard-signup-password").val().trim();

        // For validation purposes, no empty fields
        if (new_first_name === "" || new_last_name === "" || new_username === ""
            || new_password === ""){
            // alert("missing info");
            return;
        }

        var new_user = {
            first_name: new_first_name,
            last_name: new_last_name,
            username: new_username,
            password: new_password
        };

        // Adds user to the database and then redirects to the homepage
        $.post("/newuser", new_user, function(){
            window.location.href = "/";
        });
    }


});
