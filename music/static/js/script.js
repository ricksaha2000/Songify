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




var music = document.getElementById('music');
var array = [];
// var prog = document.getElementByClassName('noUi-origin');

console.log(music);
function playAudio() {
	if (music.paused) {
		music.play();
		play.className = "";
		play.className = "ion-ios-pause pause";
    var duration;
    var progress = document.getElementById('progress-bar');
    music.addEventListener("timeupdate" , timeUpdate , false);

    function timeUpdate(){
      if(music.currentTime<music.duration){
      var playPercent = 100*((music.currentTime) / music.duration);
      // console.log(playPercent);
      // console.log(music.currentTime);
      // console.log(music.duration);
    document.getElementById("trackstart").innerHTML = fancyTimeFormat(music.currentTime);
    document.getElementById("trackend").innerHTML = fancyTimeFormat(music.duration);
    var prev = sliders.noUiSlider.get();
    console.log(prev);
    
    // console.log(sliders.noUiSlider.get());
        sliders.noUiSlider.destroy();
      noUiSlider.create(sliders, {
        start: [playPercent],
        range: {
          'min': [0],
          'max': [ 100 ]
        }
      });
      // prog.style.marginLeft = playPercent+"%";
      }
    }
    music.addEventListener("canplaythrough", function () {
	duration = music.duration;
  // console.log(duration);
  // console.log(music.duration);
}, false);

}


   else {
		music.pause();
		play.className = "";
		play.className = "ion-ios-play play";
	}


}




function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


var timeline = sliders.getElementsByClassName('noUi-origin');
console.log(timeline);
// timeline.addEventListener("click", function (event) {
// 	moveplayhead(event);
// 	music.currentTime = duration * clickPercent(event);
// }, false);

// // returns click as decimal (.77) of the total timelineWidth
// function clickPercent(event) {
//     return (event.clientX - getPosition(timeline)) / timelineWidth;
// }

// function moveplayhead(event) {
//     var newMargLeft = event.clientX - getPosition(timeline);

// 	if (newMargLeft = 0 amp;amp; newMargLeft = timelineWidth) {
// 		playhead.style.marginLeft = newMargLeft + "px";
// 	}
// 	if (newMargLeft  0) {
// 		playhead.style.marginLeft = "0px";
// 	}
// 	if (newMargLeft  timelineWidth) {
// 		playhead.style.marginLeft = timelineWidth + "px";
// 	}
// }

// // getPosition
// // Returns elements left position relative to top-left of viewport
// function getPosition(el) {
//     return el.getBoundingClientRect().left;
// }


