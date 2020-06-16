$(function(){

        $('#search-home').keyup(function(){
            var x = $('#search-home').val()
            console.log(x);
            if(x=='')
            {
                x = "NONE"


            }
            $(document).ready(function () {
                $('a#search-goto-song').trigger('click');
              });


            $.ajax({

                type:"POST",
                url:"/search_homepage/",
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
        $('#dump-search').html(data);
        checkemptySong();

    }

    function checkemptySong(){
        var x = $('#search-home').val();
        if(x==''){
            $(document).ready(function () {
                console.log("EMPTY");
                $('a#related-songss').trigger('click');
              });
        }
        else{
            console.log("OKAY");
        }


    }