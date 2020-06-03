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




//FOR SELECTED ALBUM AJAX

var variable1;
function displaySelectedAlbum(y){
    variable1 = y;
    console.log(variable1)
$.ajax({
    type:"POST",
    url:"/song_selected_album/",
    data:{
        'songid':variable1,
    },
    success:searchSuccess_displaySelectedAlbum,
    dataType:'html',


});



};

function searchSuccess_displaySelectedAlbum(data , textStatus,jqXHR)
{
    console.log(data);
    $('#selected-album-ajax').html(data);
    // music.play;
}





var variable2;
function openmodal(y){
    variable2 = y;
    console.log(variable2)
$.ajax({
    type:"POST",
    url:"/display_modal/",
    data:{
        'songid':variable2,
    },
    success:displaymodal,
    dataType:'html',


});



};

function displaymodal(data , textStatus,jqXHR)
{
    console.log(data);
    $('#displaymodal').html(data);
    $("#exampleModalCenter").modal('show');


}
var variable3;
var variable4;
function addToPlaylist(x,y){
    variable3 = x;
    variable4 = y;
    console.log(variable3);
    console.log(variable4);

$.ajax({
    type:"POST",
    url:"/add_to_playlist/",
    data:{
        'songid':variable3,
        'playlistid':variable4,

    },
    success:playlist_add,
    dataType:'html',


});



};

function playlist_add(data , textStatus,jqXHR)
{
    console.log(data);
    $('#displaymodalsuccess').html(data);
    $("#exampleModalCenter").modal('hide');


}


