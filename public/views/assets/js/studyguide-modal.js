/* CodeHive: Javascript for Study Guide Posts.
1. Grabs and displays posts from the database for the study-guide page. 
2. Gets data from user input and sends it to the database.
3. Keeps track of the likes and flags for study guide posts.
4. Get search query from user to search posts by tag.
*/

$(document).ready(function() {

// ---------- READ AND DISPLAY EXISTING POSTS ---------- //

    // Get data from database.    
    $.get("/api/study-guide/read/posts", function(data){

        $("#study-guide-results").empty();

        // Loop through our data and build our HTML to display.
        for (var i = 0; i < data.length; i++){

            var div = $("<div>");

            var title = $("<h3>");

            var para = $("<p>");

            var row = $("<div>");
            var col = $("<div>");
            var panel = $("<div>");
            var panelHead = $("<div>");
            var panelBody = $("<div>");


            // Likes, flags, and ID so we can attach it to the HTML for the posts.
            var likesAmount = data[i].likes;
            var flagsAmount = data[i].flags;
            var uniquePostID = data[i].id;

            var uniqueLikesID = "likes-btn-" + i;
            var uniqueFlagsID = "flags-btn-" + i;

            var footerContent = '<!-- likes and flags here -->' +
               '<div class="likes-div" data="'+ uniquePostID +'">' + '<div>#'+ data[i].tag + '</div>' +
                '<span class="likes-amt" id="likes-text-'+ uniquePostID +'">' + likesAmount + '</span>' +
                '  <span id="' + uniqueLikesID + '" class="icon likes-icon glyphicon glyphicon-star-empty"></span>' +
              '</div>' +
               '<div class="flags-div" data="'+ uniquePostID +'">' +
                '<span class="flags-amt" id="flags-text-'+ uniquePostID +'">' + flagsAmount + '</span>' +
                '  <span id="'+ uniqueFlagsID + '" class="icon flags-icon glyphicon glyphicon-flag"></span>' +
              '</div>';

            var panelFoot = $("<div class='panel-footer'>").html(footerContent);

            row.addClass("row");

            col.addClass("col-md-12");

            col.attr("id", "post-text-" + uniquePostID);

            panel.addClass("panel panel-default");

            panelHead.addClass("panel-heading");

            title.addClass("panel-title");

            panelBody.addClass("panel-body");

            panelFoot.addClass("panel-footer");

            para.text(data[i].content);
            panelBody.append(para);

            title.text(data[i].title.toUpperCase());
            panelHead.append(title);

            panel.append(panelHead);
            panel.append(panelBody);
            panel.append(panelFoot);

            col.append(panel);

            row.append(col);

            // append the html created to our div.

            $("#study-guide-results").append(row);
        };
    });


// ---------- MODAL WINDOW ---------- //

    $("#study-guide-modal").on("click", function(event) {
        event.preventDefault();

        // grab user input to create newPost object.
        if ($("#guide-title").val().trim() === "" ||
            $("#guide-body").val().trim() === "" ||
            $("#guide-tag").val().trim() === "") {
            return;
        }

        // create newPost object to send to database.
        var newPost = {
            title: $("#guide-title").val().trim().toLowerCase(),
            content: $("#guide-body").val().trim(),
            tag: $("#guide-tag").val().trim().replace(/ /g, "-").toLowerCase()
        };


        // post to database and redirect to /study-guide
        $.post("/api/study-guide/post", newPost, function(){
            window.location.href = "/study-guide";
        });
    });



// ---------- TRACK FLAGS ---------- //

    $(document).on("click", ".panel-footer .flags-div", function(event){
        event.preventDefault();

        // on click, grab the number of flags, the post's ID, and update the number of flags.
        var flags = $(this).text();
        var postID = $(this).attr("data");
        var newFlags = parseInt(flags) + 1;

        // if the number of flags is less than 7, we update the flags in the database and update the number in the window.
        if (newFlags < 7){
          $.ajax({
            method: "PUT",
            url: "/api/study-guide/flags",
            data: {
              flags: newFlags,
              id: postID
            }
          }).done(function(){
            $("#flags-text-" + postID).text(newFlags);
          });
        }

        // once a post gets 7 flags, make an AJAX request to delete the post from the database.
        else {
          $.ajax({
            method: "DELETE",
            url: "/api/study-guide/delete",
            data: {
              id: postID
            }
          }).done(function(){
            // once it is deleted, dynamically remove the post from the browser window.
            $("#post-text-" + postID).empty();
          });
        }
    });

// ---------- UPDATE LIKES ---------- //

    $(document).on("click", ".panel-footer .likes-div", function(event){
        event.preventDefault();

        // on click, grab the postID, the number of likes and update the number of likes.
        var postID = $(this).attr("data");
        var likes = $("#likes-text-" + postID).text();
        var newLikes = parseInt(likes) + 1;

        // update the number of likes in the database for that post.
        $.ajax({
          method: "PUT",
          url: "/api/study-guide/likes",
          data: {
            likes: newLikes,
            id: postID
          }
        }).done(function(){
          // dynamically update new likes in the browser.
          $("#likes-text-" + postID).text(newLikes);
        });    
    });


// ---------- SEARCH STUDY GUIDE POSTS ---------- //

    $("#search-positions").on("click", function(event){
        event.preventDefault();

        // grab the search query from the user input
        var tagSearch = $("#search-parameter").val().trim().replace(/ /g, "-").toLowerCase();

        // AJAX call to get the posts with a tag equal to the search query.
        $.ajax({
            method: "GET",
            url: "/api/study-guide/read/posts",
            data: {
                tag: tagSearch
            }
        }).done(function(data){

            $("#study-guide-results").empty();

            // Loop through the results and create HTML for each post.
            for (var i = 0; i < data.length; i++){

                var div = $("<div>");

                var title = $("<h3>");

                var para = $("<p>");

                var row = $("<div>");
                var col = $("<div>");
                var panel = $("<div>");
                var panelHead = $("<div>");
                var panelBody = $("<div>");
                
                var likesAmount = data[i].likes;
                var flagsAmount = data[i].flags;
                var uniquePostID = data[i].id;

                var uniqueLikesID = "likes-btn-" + i;
                var uniqueFlagsID = "flags-btn-" + i;

                var footerContent = '<!-- likes and flags here -->' +
                   '<div class="likes-div" data="'+ uniquePostID +'">' + '<div id="tag-aesthetics">#'+ data[i].tag + '</div>' +
                    '<span class="likes-amt" id="likes-text-'+ uniquePostID +'">' + likesAmount + '</span>' +
                    '  <span id="' + uniqueLikesID + '" class="icon likes-icon glyphicon glyphicon-star-empty"></span>' +
                  '</div>' +

                   '<div class="flags-div" data="'+ uniquePostID +'">' +
                    '<span class="flags-amt" id="flags-text-'+ uniquePostID +'">' + flagsAmount + '</span>' +
                    '  <span id="'+ uniqueFlagsID + '" class="icon flags-icon glyphicon glyphicon-flag"></span>' +
                  '</div>';

                var panelFoot = $("<div class='panel-footer'>").html(footerContent);

                row.addClass("row");

                col.addClass("col-md-12");

                col.attr("id", "post-text-" + uniquePostID);

                panel.addClass("panel panel-default");

                panelHead.addClass("panel-heading");

                title.addClass("panel-title");

                panelBody.addClass("panel-body");

                panelFoot.addClass("panel-footer");

                para.text(data[i].content);
                panelBody.append(para);

                title.text(data[i].title.toUpperCase());
                panelHead.append(title);

                panel.append(panelHead);
                panel.append(panelBody);
                panel.append(panelFoot);

                col.append(panel);

                row.append(col);

                $("#study-guide-results").append(row);
            }

        }).done(function(){
            
            // empty the search bar
            $("#search-parameter").val("");
       
        });
    });

});
    
