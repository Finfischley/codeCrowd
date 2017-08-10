$(document).ready(function(){

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
});
