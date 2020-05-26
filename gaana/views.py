from django.shortcuts import render
from gaana.models import Music
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from album.models import Album
from users.models import User

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

    songs = Music.objects.filter(album = albumid)
    album = Album.objects.get(albumid = albumid)
    album_username = album.user.username
    album_all = Album.objects.filter(user__username =album_username)

    context = {
        'title':'Home',
        'songs':songs,
        'username':album_username,
        'albums':album_all,

    }
    return render(request , 'index.html',context)

@csrf_exempt
def song(request):
    if request.method == "POST":
        input_text = request.POST['songid']
        song = Music.objects.filter(musicid = input_text)

    return render_to_response('player.html',{"songs":song})
@csrf_exempt
def player_song_view(request):
    if request.method == "POST":
        input_text = request.POST['songid']
        # song = Music.objects.filter(musicid = input_text)
        song = Music.objects.get(musicid = input_text)
        title = song.title
        artist = song.album.user.username
    return render_to_response('player_song_view.html',{"title":title,"artist":artist})

@csrf_exempt
def player_album_selected(request):
    if request.method == "POST":
        input_text = request.POST['songid']
        # song = Music.objects.filter(musicid = input_text)
        album = Album.objects.filter(albumid =input_text)
        song = Music.objects.filter(album = input_text)
        title = album[0].title
        artist = album[0].user.username
    return render_to_response('player_album_selected.html',{"songs":song ,"title":title,"artist":artist})

