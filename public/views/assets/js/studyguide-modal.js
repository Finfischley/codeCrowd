// ---------- MODAL WINDOW ---------- //
// document. ready function
$.get("/api/study-guide/read/posts", function(data){
    // make data all pretty
});

$("#study-guide-modal").on("click", function(event) {
    event.preventDefault();

    if ($("#guide-title").val().trim() === "" ||
        $("#guide-content").val().trim() === "" ||
        $("#guide-tag").val().trim() === "") {
        return;
    }

    var newPost = {
        title: $("#guide-title").val().trim(),
        content: $("#guide-content").val().trim(),
        tag: $("#guide-tag").val().trim()
    };

    console.log(newPost);

  $.post("/api/study-guide/post", newPost)
  .done(function(data) {

    $("#study-guide-modal").text("Your post has been submitted!");
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
    
