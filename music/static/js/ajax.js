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




var variable6;
function displaySelectedPlaylist(y){
    variable6 = y;
    console.log(variable6);
$.ajax({
    type:"POST",
    url:"/playlist_selected/",
    data:{
        'playlistid':variable6,
    },
    success:searchSuccess_displaySelectedPlaylist,
    dataType:'html',


});



};

function searchSuccess_displaySelectedPlaylist(data , textStatus,jqXHR)
{
    console.log(data);
    $('#playlistselected').html(data);
    // music.play;
}



$('#my-form').on('submit', function(e){

    e.preventDefault();

        $.ajax({
                                           type : "POST",
                                           url: "/add_playlist_basic/",
                                           data: {
                                            title : $('#title-add-playlist').val(),
                                            description : $('#description-add-playlist').val(),
                                            image : document.getElementById("image-add-playlist").files[0].name,



                                            csrfmiddlewaretoken: '{{ csrf_token }}',
                                             dataType: "json",



                                           },

                                           success: function(data){
                                            $("#addtoplaylistmodal").modal('hide');
                                            $("#exampleModalCenter").modal('hide');

                                            re_render_playlist();


                                           $('#output h1').html(data.msg) /* response message */
                                           },
                                           failure: function() {

                                           }


                                       });


            });

            function re_render_playlist(){
            $.ajax({
                type:"POST",
                url:"/re_render_playlist/",
                data:{
                },
                success:re_render_playlist_success,
                dataType:'html',


            });



            };

            function re_render_playlist_success(data , textStatus,jqXHR)
            {
                console.log(data);
                $('#playlists').html(data);
                // music.play;
            }

            var variable7;
            function addSongToNewPlaylist(y){
                variable7 = y;
                console.log(variable7);
            $.ajax({
                type:"POST",
                url:"/add_playlist_basic/",
                data:{
                    'songid':variable7,
                },
                success:searchSuccess_addSongToNewPlaylist,
                dataType:'html',


            });



            };

            function searchSuccess_addSongToNewPlaylist(data , textStatus,jqXHR)
            {
                console.log(data);
                // $('#playlistselected').html(data);
                // music.play;
            }
