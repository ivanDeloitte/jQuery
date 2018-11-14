import $ from 'jquery'

$("#search").click(function () {
  search_gifs($("#input_gifs").val());
});

function search_gifs(param) {
  $("#results").empty();

  $.ajax({
      url: "https://api.giphy.com/v1/gifs/search?q=" + param + "&api_key=dc6zaTOxFJmzC",
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
          response.data.forEach(function(elem) {
              $("#results").append(
                  '<img class="gif img-fluid" data-stop="' + elem.images['480w_still'].url +
                  '" data-play="' + elem.images.original.url +
                  '" src="' + elem.images['480w_still'].url +
                  '"></img>'
              );
          });
      },
      error: function (xhr, status, error) {
          alert("error");
      }
  });
}

$(document).on('mouseover', '.gif', function (e) {
  $(this).attr("src", $(this).attr('data-play'));
});

$(document).on('mouseout', '.gif', function (e) {
  $(this).attr("src", $(this).attr('data-stop'));
});

$("button").click(function (e) {
    $("html, body").stop().animate({
        scrollTop: 0
    }, 500, 'swing', function () {
    });
});