/* CodeHive: Handles the login and signup modal window, adding new users to the database, and
verifying user's login credentials */

$(document).ready(function(){

// GLOBAL VARIABLES =====================================================================
    var loggedIn;
    var loggedUser = "";

// FUNCTIONS ============================================================================
    // This determines if an user is already logged in or not when opening app
    if (localStorage.getItem("token")) {
        // Set loggedIn to true and grab their first name
        loggedIn = true;
        loggedUser = localStorage.getItem("userFirstName").toUpperCase();
    }
    else {
        // Otherwise, set loggedIn to false
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
            var givenToken = localStorage.getItem("token");
            var url = "/dashboard?token=" + givenToken;

            // add "Sup, ___"? link to go to profile to navbar
            var loggedInLink = $("<li class='swapLink' id='loggedInLink'><a href='" + url + "'>Welcome, " + loggedUserVal + "!</a></li>");

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


    // ---------- HOME LOGIN/SIGNUP FUNCTIONALITY ---------- //

    // Home page login modal window: Grabs user input, validates, and calls the logIn function
    function homeLogIn(event){
        event.preventDefault();
    
        // Grab user input
        var homeUsername = $("#home-login-username").val().trim();
        var homePassword = $("#home-login-password").val().trim();

        // For validation purposes, no empty fields
        if (homeUsername === "" || homePassword === "") {
            return;
        }

        logIn(homeUsername, homePassword);
    }

    // Home page signup modal window: Grabs user input, validates, and calls the logIn function
    function homeSignUp(event){
        event.preventDefault();

        // Grab user input
        var new_first_name = $("#home-signup-fname").val().trim().toLowerCase();
        var new_last_name = $("#home-signup-lname").val().trim().toLowerCase();
        var new_username = $("#home-signup-username").val().trim();
        var new_password = $("#home-signup-password").val().trim();

        // For validation purposes, no empty fields
        if (new_first_name === "" || new_last_name === "" || new_username === ""
            || new_password === "") {
            return;
        }

        signUp(new_first_name, new_last_name, new_username, new_password);
    }

    // ---------- DASHBOARD LOGIN/SIGNUP FUNCTIONALITY ---------- //

     // Dashboard page login modal window: Grabs user input, validates, and calls the logIn function
    function dashboardLogIn(event){
        event.preventDefault();
    
        // Grab user input
        var dashboardUsername = $("#dashboard-login-username").val().trim();
        var dashboardPassword = $("#dashboard-login-password").val().trim();

        // For validation purposes, no empty fields
        if (dashboardUsername === ""|| dashboardPassword === "") {
            return;
        }

        logIn(dashboardUsername, dashboardPassword);
    }

     // Dashboard page signup modal window: Grabs user input, validates, and calls the logIn function
    function dashboardSignUp(event){
        event.preventDefault();

        // Grab user input
        var new_first_name = $("#dashboard-signup-fname").val().trim().toLowerCase();
        var new_last_name = $("#dashboard-signup-lname").val().trim().toLowerCase();
        var new_username = $("#dashboard-signup-username").val().trim();
        var new_password = $("#dashboard-signup-password").val().trim();

        // For validation purposes, no empty fields
        if (new_first_name === "" || new_last_name === "" || new_username === ""
            || new_password === "") {
            return;
        }

        signUp(new_first_name, new_last_name, new_username, new_password);
    }

    // ---------- INTERVIEW-PREP LOGIN/SIGNUP FUNCTIONALITY ---------- //

    // Interview-prep page login modal window: Grabs user input, validates, and calls the logIn function
    function intprepLogIn(event){
        event.preventDefault();
    
        // Grab user input
        var intprepUsername = $("#intprep-login-username").val().trim();
        var intprepPassword = $("#intprep-login-password").val().trim();

        // For validation purposes, no empty fields
        if (intprepUsername === ""|| intprepPassword === ""){
            return;
        }

        logIn(intprepUsername, intprepPassword);        
    }


    // Interview-prep page signup modal window: Grabs user input, validates, and calls the logIn function
    function intprepSignUp(event){
        event.preventDefault();

        // Grab user input
        var new_first_name = $("#intprep-signup-fname").val().trim().toLowerCase();
        var new_last_name = $("#intprep-signup-lname").val().trim().toLowerCase();
        var new_username = $("#intprep-signup-username").val().trim();
        var new_password = $("#intprep-signup-password").val().trim();

        // For validation purposes, no empty fields
        if (new_first_name === "" || new_last_name === "" || new_username === ""
            || new_password === "") {
            return;
        }

        signUp(new_first_name, new_last_name, new_username, new_password);
    }

    // ---------- STUDY-GUIDE LOGIN/SIGNUP FUNCTIONALITY ---------- //

    // Study page login modal window: Grabs user input, validates, and calls the logIn function
    function studyLogIn(event){
        event.preventDefault();
    
        // Grab user input
        var studyUsername = $("#study-login-username").val().trim();
        var studyPassword = $("#study-login-password").val().trim();

        // For validation purposes, no empty fields
        if (studyUsername === ""|| studyPassword === ""){
            return;
        }

        logIn(studyUsername, studyPassword);
    }

    // Study page signup modal window: Grabs user input, validates, and calls the logIn function
    function studySignUp(event){
        event.preventDefault();

        // Grab user input
        var new_first_name = $("#study-signup-fname").val().trim().toLowerCase();
        var new_last_name = $("#study-signup-lname").val().trim().toLowerCase();
        var new_username = $("#study-signup-username").val().trim();
        var new_password = $("#study-signup-password").val().trim();

        // For validation purposes, no empty fields
        if (new_first_name === "" || new_last_name === "" || new_username === ""
            || new_password === ""){
            return;
        }

        signUp(new_first_name, new_last_name, new_username, new_password);
    }

    // ---------- TEAM LOGIN/SIGNUP FUNCTIONALITY ---------- //

    // Team page login modal window: Grabs user input, validates, and calls the logIn function
    function teamLogIn(event){
        event.preventDefault();
    
        // Grab user input
        var teamUsername = $("#team-login-username").val().trim();
        var teamPassword = $("#team-login-password").val().trim();

        // For validation purposes, no empty fields
        if (teamUsername === "" || teamPassword === "") {
            return;
        }

        logIn(teamUsername, teamPassword);tyrttttgt
    }

    // Team page signup modal window: Grabs user input, validates, and calls the logIn function
    function teamSignUp(event){
        event.preventDefault();

        // Grab user input
        var new_first_name = $("#team-signup-fname").val().trim().toLowerCase();
        var new_last_name = $("#team-signup-lname").val().trim().toLowerCase();
        var new_username = $("#team-signup-username").val().trim();
        var new_password = $("#team-signup-password").val().trim();

        // For validation purposes, no empty fields
        if (new_first_name === "" || new_last_name === "" || new_username === ""
            || new_password === ""){
            return;
        }

        signUp(new_first_name, new_last_name, new_username, new_password);
    }

    // Checks if username and password match in the database
    function logIn(username, password){
        // Send user credentials to find a match 
        $.ajax({
            method: "GET",
            url: "/login",
            data: {
                username: username,
                password: password
            }
        }).done(function(data){
            // If a match isn't found, then redirect to homepage
            if (data === 'invalid credentials') {
                window.location.href = "/";
                return;
            }

            // If a match is found, then set user's information to local storage
            // This is so validation can be persitent across pages
            localStorage.setItem("token", data.token);
            localStorage.setItem("userFirstName", data.firstname);
            localStorage.setItem("userId", data.userID);
            localStorage.setItem("username", data.username);
           
            // Redirect to the dashboard with JSON Web Token (protected route)
            window.location.href = "/dashboard?token=" + data.token;

            // dynamically add/change navlink
            loggedIn = true;

            loggedUser = localStorage.getItem("userFirstName");

            dynamicLink(loggedIn, loggedUser);
        });
    }

    // Adds new user to the database
    function signUp(userFirstName, userLastName, username, password){
        // Set object for post method
        var new_user = {
            first_name: userFirstName,
            last_name: userLastName,
            username: username,
            password: password
        };

        // Adds user to the database and then redirects to the homepage
        $.post("/newuser", new_user, function(){
            window.location.href = "/";
        });
    }

// MAIN PROCESSES =======================================================================
    
    // ---------- HOME LOGIN/SIGNUP CLICK EVENTS ---------- //
    $("#home-login-btn").on("click", homeLogIn);
    $("#home-signup-btn").on("click", homeSignUp);

    // ---------- DASHBOARD LOGIN/SIGNUP CLICK EVENTS ---------- //
    $("#dashboard-login-btn").on("click", dashboardLogIn);
    $("#dashboard-signup-btn").on("click", dashboardSignUp);

    // ---------- INTERVIEW-PREP LOGIN/SIGNUP CLICK EVENTS ---------- //
    $("#intprep-login-btn").on("click", intprepLogIn);
    $("#intprep-signup-btn").on("click", intprepSignUp);

    // ---------- STUDY-GUIDE LOGIN/SIGNUP CLICK EVENTS ---------- //    
    $("#study-login-btn").on("click", studyLogIn);
    $("#study-signup-btn").on("click", studySignUp);

    // ---------- TEAM LOGIN/SIGNUP CLICK EVENTS ---------- //
    $("#team-login-btn").on("click", teamLogIn);
    $("#team-signup-btn").on("click", teamSignUp);

});


