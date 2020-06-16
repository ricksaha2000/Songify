function displayradio(){

    $.ajax({
        type:"POST",
        url:"/radio/",
        data:{

        },
        success:searchSuccess_radio,
        dataType:'html',


    });

};
function searchSuccess_radio(data , textStatus,jqXHR)
{
    // console.log(data)
    $('#selected-radio-ajax').html(data);
    // music.play;
}
var current_album;
var current_song;
var variable;
function firescript(x,y,z,is_playlist=false){
    console.log(is_playlist);
    is_playlist_current = is_playlist;

    if(!is_playlist){
    console.log("NOT PLAYLIST AJAX");
    current_album = x;
    current_song = y;
    variable = z

    console.log("ALBUM");
    console.log(current_album);
    console.log("CURR SONG");
    console.log(current_song);
    console.log("ID");
    console.log(variable);

$.ajax({
    type:"POST",
    url:"/song/",
    data:{
        'songid':current_song,
        'albumid':current_album,
    },
    success:searchSuccess,
    dataType:'html',


});

    }


    else{
        console.log("IS PLAYLIST AJAX");

        current_album = x;
        current_song = y;
        variable = z

        console.log("PLAYLIST");
        console.log(current_album);
        console.log("CURR SONG");
        console.log(current_song);
        console.log("ID");
        console.log(variable);

    $.ajax({
        type:"POST",
        url:"/song_playlist_song/",
        data:{
            'songid':current_song,
            'albumid':current_album,
        },
        success:searchSuccess_playlist_song,
        dataType:'html',


    });

    }
firescript1(x,y,z,is_playlist);





};

function searchSuccess(data , textStatus,jqXHR)
{
    // console.log(data)
    music.load();
    $('#music').html(data);
    $('#play')[0].click();
    // music.play;
}
function searchSuccess_playlist_song(data , textStatus,jqXHR)
{
    // console.log(data)
    music.load();
    $('#music').html(data);
    $('#play')[0].click();
    // music.play;
}

function firescript1(x,y,z,is_playlist){
    console.log(is_playlist);
if(!is_playlist){
    console.log("FIRESCRIPT1 NOT PLAYLIST")
    current_album = x;
    current_song = y;
    variable = z;
$.ajax({
    type:"POST",
    url:"/song_player/",
    data:{
        'songid':current_song,
        'albumid':current_album
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

recently_played(x,y);

}

else{
    console.log("FIRESCRIPT1 IS PLAYLIST")

    current_album = x;
    current_song = y;
    variable = z;
$.ajax({
    type:"POST",
    url:"/song_player_playlist/",
    data:{
        'songid':current_song,
        'albumid':current_album,
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

}

// recently_played(x,y);

};

function searchSuccess1(data , textStatus,jqXHR)
{
    // console.log(data)
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

            var variable8;
            function FollowArtist(y){
                variable8 = y;
                console.log(variable8);
            $.ajax({
                type:"POST",
                url:"/follow_artist/",
                data:{
                    'artist_id':variable8,
                },
                success:searchSuccess_FollowArtist,
                dataType:'html',


            });



            };

            function searchSuccess_FollowArtist(data , textStatus,jqXHR)
            {
                console.log(data);
                $('#artist_added').html(data);
                // music.play;
            }

            var variable9;
            function FollowUser(y){
                variable9 = y;
                console.log(variable9);
            $.ajax({
                type:"POST",
                url:"/follow_user/",
                data:{
                    'follow_user_id':variable9,
                },
                success:searchSuccess_FollowUser,
                dataType:'html',


            });



            };

            function searchSuccess_FollowUser(data , textStatus,jqXHR)
            {
                console.log(data);
                $('#user_added').html(data);
                // music.play;
                refresh_user_list();
            }


            $(function(){

                $('#search_user').keyup(function(){
                    var x = $('#search_user').val()
                    if(x=='')
                    {
                        x = "NONE"


                    }
                    $(document).ready(function () {
                        $('a#user-search-success').trigger('click');
                      });


                    $.ajax({

                        type:"POST",
                        url:"/search_user/",
                        data:{
                            'search_text':x,
                            //  $('#search').val(),
                            // 'csrfmiddlewaretoken':$("input|name=csrfmiddlewaretoken").val()

                        },
                        success:searchSuccessUser,
                        dataType:'html',

                    });
                 });
            });

            function searchSuccessUser(data , textStatus,jqXHR)
            {
                console.log(data)
                $('#search-user-results').html(data);
                checkempty();

            }

function checkempty(){
    var x = $('#search_user').val();
    if(x==''){
        $(document).ready(function () {
            $('a#friend-list').trigger('click');
          });
    }
    else{
        console.log("OKAY");
    }


}

function refresh_user_list(){
$.ajax({
    type:"POST",
    url:"/refresh_user_list/",
    data:{
    },
    success:searchSuccess_refresh_user_list,
    dataType:'html',


});



};

function searchSuccess_refresh_user_list(data , textStatus,jqXHR)
{
    console.log(data);
    $('#user-already-follows').html(data);
    refresh_search_list();
    // music.play;
}


function refresh_search_list(){
    var x = $('#search_user').val();

    $.ajax({
        type:"POST",
        url:"/refresh_search_list/",
        data:{
            "x":x,
        },
        success:searchSuccess_refresh_search_list,
        dataType:'html',


    });

    };

    function searchSuccess_refresh_search_list(data , textStatus,jqXHR)
    {
        console.log(data);
        $('#search-user-results').html(data);

    }


    var variable10;
    function showfolloweduserplaylist(y){
        variable10 = y;
        console.log(variable10);
    $.ajax({
        type:"POST",
        url:"/showfolloweduserplaylist/",
        data:{
            'follow_user_id':variable10,
        },
        success:searchSuccess_showfolloweduserplaylist,
        dataType:'html',


    });



    };

    function searchSuccess_showfolloweduserplaylist(data , textStatus,jqXHR)
    {
        console.log(data);
        $('#showfolloweduserplaylist').html(data);
        // music.play;
    }


    var variable11;
    function showfolloweduserSongs(y){
        variable11 = y;
        console.log(variable11);
    $.ajax({
        type:"POST",
        url:"/showfolloweduserSongs/",
        data:{
            'follow_user_playlist_id':variable11,
        },
        success:searchSuccess_showfolloweduserSongs,
        dataType:'html',


    });



    };

    function searchSuccess_showfolloweduserSongs(data , textStatus,jqXHR)
    {
        console.log(data);
        $('#showfolloweduserSongs').html(data);
        // music.play;
    }




    var variable12;
    var variable13;
    function SaveFollowedUserPlaylist(x,y){
        variable12 = x;
        variable13 = y;
        console.log(variable12);
    $.ajax({
        type:"POST",
        url:"/SaveFollowedUserPlaylist/",
        data:{
            'follow_user_playlist_id':variable12,
            'user_id':variable13,
        },
        success:searchSuccess_SaveFollowedUserPlaylist,
        dataType:'html',


    });



    };

    function searchSuccess_SaveFollowedUserPlaylist(data , textStatus,jqXHR)
    {
        console.log(data);
        $('#').html(data);
        re_render_user_followed_playlist();
        // music.play;
    }


    var albumid_recent;
    var variable14;
    function recently_played(x,y){
        albumid_recent = x;
        variable14 = y;
        console.log(variable14);
    $.ajax({
        type:"POST",
        url:"/recently_played/",
        data:{
            'songid':variable14,
            'albumid':albumid_recent,
        },
        success:searchSuccess_recently_played,
        dataType:'html',


    });



    };

    function searchSuccess_recently_played(data , textStatus,jqXHR)
    {
        // console.log(data);
        $('#refresh_recently_played').html(data);
        // music.play;
    }

    $(function(){

        $('#search-mosambi-song').keyup(function(){
            var x = $('#search-mosambi-song').val()
            // console.log(x);
            if(x=='')
            {
                x = "NONE"


            }
            $(document).ready(function () {
                $('a#related-rai-search').trigger('click');
              });


            $.ajax({

                type:"POST",
                url:"/search_song/",
                data:{
                    'search_text':x,
                    //  $('#search').val(),
                    // 'csrfmiddlewaretoken':$("input|name=csrfmiddlewaretoken").val()

                },
                success:searchSuccessSong,
                dataType:'html',

            });
         });
    });

    function searchSuccessSong(data , textStatus,jqXHR)
    {
        console.log(data)
        $('#rai-search-ajax').html(data);
        checkemptySong();

    }

    function checkemptySong(){
        var x = $('#search-mosambi-song').val();
        if(x==''){
            $(document).ready(function () {
                $('a#related-song').trigger('click');
              });
        }
        else{
            console.log("OKAY");
        }


    }


    function re_render_user_followed_playlist(){
        $.ajax({
            type:"POST",
            url:"/re_render_user_followed_playlist/",
            data:{
            },
            success:re_render_user_followed_playlist_success,
            dataType:'html',


        });



        };

        function re_render_user_followed_playlist_success(data , textStatus,jqXHR)
        {
            console.log(data);
            $('#followedplaylists').html(data);
            // music.play;
        }