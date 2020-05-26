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
};

function searchSuccess1(data , textStatus,jqXHR)
{
   console.log("FIRESCRIPT1");
   $('#current_song_playing').html(data);
    // music.play;
}