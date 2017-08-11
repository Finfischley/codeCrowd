// ---------- MODAL WINDOW ---------- //
// document. ready function

$.get("/api/study-guide/read/posts", function(data){
    console.log(data);
      $("#study-guide-results").empty();

      for (var i = 0; i < data.length; i++){

        console.log(data[i]);

        var div = $("<div>");

        var title = $("<h3>");

        var para = $("<p>");

        var row = $("<div>");
        var col = $("<div>");
        var panel = $("<div>");
        var panelHead = $("<div>");
        var panelBody = $("<div>");
        var panelFoot = $("<div>");

        row.addClass("row");

        col.addClass("col-md-10");

        panel.addClass("panel panel-default");

        panelHead.addClass("panel-heading");

        title.addClass("panel-title");

        panelBody.addClass("panel-body");

        panelFoot.addClass("panel-footer");

        para.text(data[i].content);
        panelBody.append(para);

        title.text(data[i].title);
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
        title: $("#guide-title").val().trim(),
        content: $("#guide-body").val().trim(),
        tag: $("#guide-tag").val().trim()
    };

    console.log(newPost);

    $.post("/api/study-guide/post", newPost, function(){
        window.location.href = "/study-guide";
    })

    // $("#study-guide-modal").text("Your post has been submitted!");
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
    
