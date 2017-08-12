// ---------- MODAL WINDOW ---------- //

  // FLAGS BUTTON
  $(document).on("click", ".panel-footer .flags-div", function(event){
    event.preventDefault();

    var flags = $(this).text();
    var postID = $(this).attr("data");
    var newFlags = parseInt(flags) + 1;

    if (newFlags < 7){
      $.ajax({
        method: "PUT",
        url: "/api/interview-prep/flags",
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
        url: "/api/interview-prep/delete",
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
      url: "/api/interview-prep/likes",
      data: {
        likes: newLikes,
        id: postID
      }
    }).done(function(){
      $("#likes-text-" + postID).text(newLikes);
    });

    
  });


// Grab the existing posts by descending order
$.get("/api/interview-prep/posts", function(data){
  // console.log(data);
  $("#interview-results").empty();


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
    // var panelFoot = $("<div>");

    var likesAmount = data[i].likes;
    var flagsAmount = data[i].flags;
    var uniquePostID = data[i].id;

    var uniqueLikesID = "likes-btn-" + i;
    var uniqueFlagsID = "flags-btn-" + i;


    var footerContent = '<!-- likes and flags here -->' +
           '<div class="likes-div" data="'+ uniquePostID +'">' +
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

    title.text(data[i].position.toUpperCase());

    if (!data[i].company) {
      panelHead.append(title);
    } else {
      title.append(" at " + data[i].company.toUpperCase());
      panelHead.append(title);
    }

    panel.append(panelHead);
    panel.append(panelBody);
    panel.append(panelFoot);

    col.append(panel);

    row.append(col);

    $("#interview-results").append(row);

  }

});

// If an user is not logged in, then the button to add interivew 
// tips is hidden
if (!localStorage.getItem("userId")){
  $("#intvw-btn").hide();
}

// Functionality for when an user submits a tip
$("#submit-interview").on("click", function(event) {
  event.preventDefault();

  // For validation purposes, required fields can't be empty
  if ($("#interview-title").val().trim() === "" || 
    $("#interview-body").val().trim() === "" || 
    $("#interview-city").val().trim() === "" ||
    $("#interview-state").val().trim() === "" ||
    $("#interview-position").val().trim() === ""){
    return;
  }

  // the object that will be sent to the backend
  var newInterview = {
    title: $("#interview-title").val().trim().toLowerCase(),
    content: $("#interview-body").val().trim(),
    city: $("#interview-city").val().trim().toLowerCase(),
    state: $("#interview-state").val().trim().toLowerCase(),
    position: $("#interview-position").val().trim().toLowerCase(),
    company: $("#interview-company").val().trim().toLowerCase(),
    UserId: localStorage.getItem("userId")
  };

  // The new post will be added to the database and redirects
  // the user to the dashboard 
  $.ajax({
    method: "POST",
    url: "/api/interview-prep/post",
    headers: {Authorization: "Bearer " + localStorage.getItem("token")},
    data: newInterview
  }).done(function(data){
    window.location.href = "/dashboard?token=" + localStorage.getItem("token");
  });


});

$("#search-positions").on("click", function(event){
  event.preventDefault();

  var positionSearch = $("#search-parameter").val().trim().toLowerCase();
  // console.log(positionSearch);

  $.ajax({
    method: "GET",
    url: "/api/interview-prep/position",
    data: {
      position: positionSearch
    }
  }).done(function(data){
    // console.log(data);

    $("#interview-results").empty();

    for (var j = 0; j < data.length; j++){
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
      var uniquePostID = data[j].id;

      var uniqueLikesID = "likes-btn-" + j;
      var uniqueFlagsID = "flags-btn-" + j;


      var footerContent = '<!-- likes and flags here -->' +
             '<div class="likes-div" data="'+ uniquePostID +'">' +
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

      para.text(data[j].content);
      panelBody.append(para);

      title.text(data[j].position.toUpperCase());

      if (!data[j].company) {
        panelHead.append(title);
      } else {
        title.append(" at " + data[j].company.toUpperCase());
        panelHead.append(title);
      }

      panel.append(panelHead);
      panel.append(panelBody);
      panel.append(panelFoot);

      col.append(panel);

      row.append(col);

      $("#interview-results").append(row);

    }
  }).done(function(){
    $("#search-parameter").val("")
  });

});
