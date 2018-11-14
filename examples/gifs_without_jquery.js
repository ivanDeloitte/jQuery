/* jQuery Lite */
var doc = document;
var id = e => doc.getElementById(e)

function search(e) {
  search_gifs(id("input_gifs").value)
}
id("search").addEventListener("click", search);

function search_gifs(param) {

  var request = new XMLHttpRequest();

  request.open('GET',
    'https://api.giphy.com/v1/gifs/search?q=' + param + '&api_key=dc6zaTOxFJmzC', true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var gifs = JSON.parse(request.responseText);
      id("results").innerHTML = "";
	  
      gifs.data.forEach(function(elem) {
        id("results").insertAdjacentHTML('beforeend',
          '<img class="gif img-fluid" data-stop="' +
          elem.images['480w_still'].url +
          '" data-play="' + elem.images.original.url +
          '" src="' + elem.images['480w_still'].url + '"></img>')
      });
    } 
  };
  request.onerror = function () {
    // There was a connection error of some sort
  };
  request.send();
}

document.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('gif')) {
    event.target.src = e.target.getAttribute('data-play');
  }
})

document.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('gif')) {
    event.target.src = e.target.getAttribute('data-stop');
  }
})

document.getElementById("button").addEventListener("click", function() {
window.scrollTo(0);
});