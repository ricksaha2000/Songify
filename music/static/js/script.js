
// function goToAlbum(){
//   console.log("HEYOO");
//   x = document.getElementById("related-artists");
//   console.log(x);
//   x.click();

// }


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
	start: [ 0.9],
	range: {
		'min': [ 0],
		'max': [ 1]
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

  // console.log(totalHeight);

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
music.onended = function (e) {return goToNextSong();};

var array = [0,];
// var prog = document.getElementByClassName('noUi-origin');

// console.log(music);
function playAudio() {
	if (music.paused) {
		music.play();
		play.className = "";
		play.className = "ion-ios-pause pause";
    var duration;
    var progress = document.getElementById('progress-bar');
    music.addEventListener("timeupdate" , timeUpdate , false);

    var playPercent;
    function timeUpdate(){
      if(music.currentTime<music.duration){
      playPercent = 100*((music.currentTime) / music.duration);
      // console.log(playPercent);
      // console.log("CURRENT"+music.currentTime);
      changevolume();
      // console.log(music.duration);
    document.getElementById("trackstart").innerHTML = fancyTimeFormat(music.currentTime);
    document.getElementById("trackend").innerHTML = fancyTimeFormat(music.duration);
    var prev = sliders.noUiSlider.get();
    var prevPercent = 100*((prev)/music.duration)
    // console.log("PREV"+prev);

    // console.log(sliders.noUiSlider.get());
    var lastItem = array.pop();
    difference =music.currentTime-lastItem ;


    // console.log("LAST ITEM"+lastItem);
    // console.log("DIFFERENCE");
    if(difference<0.27 || difference==undefined){
        sliders.noUiSlider.set(playPercent);
        // console.log(playPercent);
    }
    else{
      // console.log("FUCKKKKKKKKKKK")
      sliders.noUiSlider.set();
      var x = sliders.noUiSlider.get();
      // console.log(x);

      // music.currentTime = x;

    }
        // sliders.noUiSlider.destroy();
      // noUiSlider.create(sliders, {
      //   start: [playPercent],
      //   range: {
      //     'min': [0],
      //     'max': [ 100 ]
      //   }
      // });
    // }
      array.push(music.currentTime);

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
var conter_refresh = 0;
var refreshing = document.getElementById('refresh');
function refresh(){

  switch(conter_refresh){

    case 0:
      music.currentTime = 0;
      refreshing.style.color="#1ed760";
      conter_refresh=conter_refresh+1
      // console.log(conter_refresh);
      break;
    case 1:
      if(music.loop==true){
        music.loop = false;
        refreshing.style.color="";

        console.log("FALSE " +conter_refresh);

      }
      else{
        music.loop = true;
        refreshing.style.color="#297BC1";

        // console.log("TRUE " +conter_refresh);

      }
      conter_refresh = 0;
      break;
    }





  // if(conter_refresh==1){
  //   if(music.loop==true){
  //     music.loop = false;
  //     console.log("FALSE " +conter_refresh);

  //   }
  //   else{
  //     music.loop = true;
  //     console.log("TRUE " +conter_refresh);

  //   }
  //   conter_refresh = 0;
  //   break;
  // }
  //   if(conter_refresh==0){

  //     music.currentTime = 0;
  //     conter_refresh=conter_refresh+1
  //     console.log(conter_refresh);
  //   }



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

// window.setInterval(changevolume(),1000);
function changevolume(){

  audio = slider.noUiSlider.get();
  // console.log("AUDIO "+ audio);
  music.volume = audio;
}

$(".current-track__progress__bar").click(function()
  {
  //   String.prototype.splice = function(idx, rem, str) {
  //     return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  // };

  music.pause();
  var timeline = document.getElementsByClassName('noUi-origin');
  // console.log(timeline);
  var value = timeline[0].attributes[1].value;
  // console.log(value);

  // value = value.replace(/\D/g, '');
  value = value.replace(/[^0-9.]/g, '');
  // console.log(value);

  // value = value.splice(2,0,".");

      sliders.noUiSlider.destroy();
      noUiSlider.create(sliders, {
        start: [value],
        range: {
          'min': [0],
          'max': [ 100 ]
        }
      });
      playPercent = value;
      music.currentTime = ((value * music.duration)/100);
  console.log(playPercent)
});

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


