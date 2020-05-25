from django.shortcuts import render
from gaana.models import Music
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from album.models import Album
# from gaana.models import Music
# Create your views here.
def home(request):
    # songs = Music.objects.order_by('?')[:9]
    albums = Album.objects.all()
    context = {
        'title':'Home',
        'albums':albums,
    }

    return render(request , 'songs/index.html' , context)
@csrf_exempt
def index(request,albumid):

    songs = Music.objects.filter(album =albumid)
    context = {
        'title':'Home',
        'songs':songs,
    }
    return render(request , 'index.html',context)
@csrf_exempt
def song(request):
    if request.method == "POST":
        input_text = request.POST['songid']
        song = Music.objects.filter(musicid = input_text )
        # print("HIIIIII")
        # print(input_text)
    return render_to_response('player.html',{"songs":song})
