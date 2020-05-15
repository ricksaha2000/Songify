// Sliders

var slider = document.getElementById('song-progress');
function play() {


  var duration;
  // var music = document.getElementById('song-progress');
  slider.addEventListener("timeupdate", timeUpdate, false);

  function timeUpdate() {
    var playPercent = 100 * (slider.currentTime / duration);
    song-progress.style.marginLeft = playPercent + "%";
  }

  // Gets audio file duration
  slider.addEventListener("canplaythrough", function () {
    duration = slider.duration;
  }, false);
noUiSlider.create(slider, {
	start: [ 0 ],
	range: {
		'min': [   0 ],
		'max': [ 100 ]
	}
});

var slider = document.getElementById('song-volume');

noUiSlider.create(slider, {
	start: [ 90 ],
	range: {
		'min': [   0 ],
		'max': [ 100 ]
	}
});


// Tooltips

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Viewport Heights

$(window).on("resize load", function(){

  var totalHeight = $(window).height();

  var headerHeight = $('.header').outerHeight();
  var footerHeight = $('.current-track').outerHeight();
  var playlistHeight = $('.playlist').outerHeight();
  var nowPlaying = $('.playing').outerHeight();

  var navHeight = totalHeight - (headerHeight + footerHeight + playlistHeight + nowPlaying);
  var artistHeight = totalHeight - (headerHeight + footerHeight);

  console.log(totalHeight);

  $(".navigation").css("height" , navHeight);
  $(".artist").css("height" , artistHeight);
  $(".social").css("height" , artistHeight);

});





// Collapse Toggles

$(".navigation__list__header").on( "click" , function() {

  $(this).toggleClass( "active" );

});


// Media Queries

$(window).on("resize load", function(){
	if ($(window).width() <= 768){

    $(".collapse").removeClass("in");

    $(".navigation").css("height" , "auto");

    $(".artist").css("height" , "auto");

	}
});

$(window).on("resize load", function(){
	if ($(window).width() > 768){

    $(".collapse").addClass("in");

	}
});