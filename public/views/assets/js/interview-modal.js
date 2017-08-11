// ---------- MODAL WINDOW ---------- //

  // FLAGS BUTTON
  $(document).on("click", ".panel-footer .flags-div", function(event){
    event.preventDefault();

    var flags = $(this).text();
    console.log(this);
    var postID = $(this).attr();
    // console.log(typeof(flags));
    // console.log(flags);
    // console.log(postID);

    if (Number(flags) <= 6){
      // $.ajax({
      //   method: "PUT",
      //   url: "/api/study-guide/flags",
      //   data: {
      //     flags:
      //     id: 
      //   }
      // })
      return;
    }

    console.log("you get deleted");
  });

    $(document).on("click", ".panel-footer .likes-div", function(event){
    event.preventDefault();

    var likes = $(this).text();
    var uniqueTest = $("span").attr("data");
    console.log(this);
    console.log(uniqueTest);

    
  });


// Grab the existing posts by descending order
$.get("/api/interview-prep/posts", function(data){
  console.log(data);
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
           '<div class="likes-div">' +
            '<span class="likes-amt" val="8">' + likesAmount + '</span>' +
            '  <span data="'+ uniquePostID +'" id="' + uniqueLikesID + '" class="icon likes-icon glyphicon glyphicon-star-empty"></span>' +
          '</div>' +

           '<div class="flags-div">' +
            '<span class="flags-amt" val="9">' + flagsAmount + '</span>' +
            '  <span id="'+ uniqueFlagsID + '" class="icon flags-icon glyphicon glyphicon-flag"></span>' +
          '</div>';

    var panelFoot = $("<div class='panel-footer'>").html(footerContent);

    row.addClass("row");

    col.addClass("col-md-10");

    panel.addClass("panel panel-default");

    panelHead.addClass("panel-heading");

    title.addClass("panel-title");

    panelBody.addClass("panel-body");

    panelFoot.addClass("panel-footer");

    para.text(data[i].content);
    panelBody.append(para);

    title.text(data[i].position);

    if (!data[i].company) {
      panelHead.append(title);
    } else {
      title.append(" at " + data[i].company);
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
    title: $("#interview-title").val().trim(),
    content: $("#interview-body").val().trim(),
    city: $("#interview-city").val().trim(),
    state: $("#interview-state").val().trim(),
    position: $("#interview-position").val().trim(),
    company: $("#interview-company").val().trim(),
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
