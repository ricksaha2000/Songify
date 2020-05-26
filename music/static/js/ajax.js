var variable;
function firescript(y){
    variable = y;
    console.log(variable)
$.ajax({
    type:"POST",
    url:"/song/",
    data:{
        'songid':variable,
    },
    success:searchSuccess,
    dataType:'html',


});


firescript1(y);

};

function searchSuccess(data , textStatus,jqXHR)
{
    console.log(data)
    music.load();
    $('#music').html(data);
    // music.play;
}


function firescript1(y){

    variable = y;
    console.log(variable)
$.ajax({
    type:"POST",
    url:"/song_player/",
    data:{
        'songid':variable,
    },
    success:searchSuccess1,
    dataType:'html',


});

$(document).ready(function() {
    console.log("NIGGA")
    $("#"+y).click(function() {
        $("html, body").animate({
            scrollTop: $(
              'html, body').get(0).scrollHeight
        }, 2000);
    });
});
};

function searchSuccess1(data , textStatus,jqXHR)
{
    console.log(data)
   console.log("FIRESCRIPT1");
   $('#current_song_playing').html(data);

}

function song(y){
    console.log("FUCK");
  console.log(y);

$(document).ready(function() {
      $("#"+y).click(function() {
          $("html, body").animate({
              scrollTop: $(
                'html, body').get(0).scrollHeight
          }, 2000);
      });
  });
}