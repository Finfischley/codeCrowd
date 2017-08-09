// ---------- MODAL WINDOW ---------- //
	var modal = $("#post-interview-modal");

$("#submit-interview").on("click", function(event) {
event.preventDefault();

var newPost = {
  title: $("#interview-title").val().trim(),
  content: $("#interview-body").val().trim(),
  city: $("#interview-city").val().trim(),
  state: $("#interview-state").val().trim(),
  position: $("#interview-position").val().trim(),
  position: $("#interview-company").val().trim(),
};
console.log(newPost);

$.post("/api/interview-prep/post", newPost)
.done(function(data) {

  $("#post-interview-modal").text("Your interview post has been submitted!");
});