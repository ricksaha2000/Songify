// Sliders

var sliders = document.getElementById('song-progress');
var counter = 0;
if(counter == 0){
  counter = counter+1;
noUiSlider.create(sliders, {
	start: [ 0 ],
	range: {
		'min': [   0 ],
		'max': [ 100 ]
	}
});
}
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