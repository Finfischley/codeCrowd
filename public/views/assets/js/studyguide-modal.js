// ---------- MODAL WINDOW ---------- //
// document. ready function

$.get("/api/study-guide/read/posts", function(data){
    // console.log(data);
      $("#study-guide-results").empty();

      for (var i = 0; i < data.length; i++){

        // console.log(data[i]);

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

        col.addClass("col-md-10");

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
    };
    
});

$("#study-guide-modal").on("click", function(event) {
    event.preventDefault();

    if ($("#guide-title").val().trim() === "" ||
        $("#guide-body").val().trim() === "" ||
        $("#guide-tag").val().trim() === "") {
        return;
    }

    var newPost = {
        title: $("#guide-title").val().trim().toLowerCase(),
        content: $("#guide-body").val().trim(),
        tag: $("#guide-tag").val().trim().replace(/ /g, "-").toLowerCase()
    };

    // console.log(newPost);

    $.post("/api/study-guide/post", newPost, function(){
        window.location.href = "/study-guide";
    });

    // $("#study-guide-modal").text("Your post has been submitted!");
});

$(document).on("click", ".panel-footer .flags-div", function(event){
    event.preventDefault();

    var flags = $(this).text();
    var postID = $(this).attr("data");
    var newFlags = parseInt(flags) + 1;

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
    else {
      $.ajax({
        method: "DELETE",
        url: "/api/study-guide/delete",
        data: {
          id: postID
        }
      }).done(function(){
        $("#post-text-" + postID).empty();
      });
    }


});

$(document).on("click", ".panel-footer .likes-div", function(event){
    event.preventDefault();

    var likes = $(this).text();
    var postID = $(this).attr("data");
    var newLikes = parseInt(likes) + 1;

    // console.log(likes);
    // console.log(postID);
    // console.log(newLikes);

    $.ajax({
      method: "PUT",
      url: "/api/study-guide/likes",
      data: {
        likes: newLikes,
        id: postID
      }
    }).done(function(){
      $("#likes-text-" + postID).text(newLikes);
    });

    
  });

$("#search-positions").on("click", function(event){
    event.preventDefault();

    var tagSearch = $("#search-parameter").val().trim().replace(/ /g, "-").toLowerCase();
    // console.log(tagSearch);

    $.ajax({
        method: "GET",
        url: "/api/study-guide/read/posts",
        data: {
            tag: tagSearch
        }
    }).done(function(data){
        // console.log(data);

        $("#study-guide-results").empty();

        for (var i = 0; i < data.length; i++){

            // console.log(data[i]);

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

            col.addClass("col-md-10");

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
        $("#search-parameter").val("");
    });
});

//     $("#study-guide-results").text("");

//     var div = $("<div>");

//     var title = $("<h3>");

//     var para = $("<p>");

//     var row = $("<div>");
//     var col = $("<div>");
//     var panel = $("<div>");
//     var panelHead = $("<div>");
//     var panelBody = $("<div>");
//     var panelFoot = $("<div>")

//     row.addClass("row");

//     col.addClass("col-md-10");

//     panel.addClass("panel panel-default");

//     panelHead.addClass("panel-heading");

//     title.addClass("panel-title");

//     panelBody.addClass("panel-body");

//     panelFoot.addClass("panel-footer");


//     para.text(newPost.content);
//     panelBody.append(para);

//     title.text(newPost.title);

//     panelFoot.text(newPost.tag);

//     panel.append(panelHead);
//     panel.append(panelBody);

//     col.append(panel);

//     row.append(col);


//     $("#study-guide-results").append(row);






//     //JS to get posts with tag?
    
