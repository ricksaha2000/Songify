from django.shortcuts import render
from gaana.models import Music
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from album.models import Album
from users.models import User
from playlist.models import Playlist
from playlist_song.models import PlaylistSong
from django.http import JsonResponse

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
    user_username = request.user.username


    album_all = Album.objects.filter(user__username =album_username)
    playlists = Playlist.objects.filter(user = request.user.id)

    context = {
        'title':'Home',
        'songs':songs,
        'username':album_username,
        'albums':album_all,
        'playlists':playlists,
        'user_username':user_username,



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

@csrf_exempt
def modal_open(request):
    playlists = Playlist.objects.filter(user = request.user.id)

    if request.method == "POST":
        input_text = request.POST['songid']
        print(input_text)
        # song = Music.objects.filter(musicid = input_text)

    return render_to_response('modal_view.html',{'songid':input_text,'playlists':playlists})

@csrf_exempt
def add_to_playlist(request):
    playlists = Playlist.objects.filter(user = request.user.id)

    if request.method == "POST":
        songid = request.POST['songid']
        playlistid = request.POST['playlistid']
        playlist = Playlist.objects.filter(playlistid = playlistid)[0]
        song = Music.objects.filter(musicid = songid)[0]

        print(songid)
        print(playlistid)


        PlaylistSong.objects.create(playlistid = playlist, songid = song)

        # song = Music.objects.filter(musicid = input_text)

    return render_to_response('modal_view_success.html',{})

@csrf_exempt
def playlist_selected(request):

    if request.method == "POST":
        playlistid = request.POST['playlistid']
        print("HII")
        print(playlistid)
        playlist = Playlist.objects.filter(playlistid = playlistid)
        print(playlist)
        playlist_songs = PlaylistSong.objects.filter(playlistid = playlist[0])
        print(playlist_songs)

    return render_to_response('playlist_selected.html',{'playlistsongs':playlist_songs})
l=[]
@csrf_exempt
def add_playlist_basic(request):
    songid = False
    if request.is_ajax():
        title = request.POST.get('title', None) # getting data from input first_name id
        description = request.POST.get('description', None)  # getting data from input last_name id
        image = request.POST.get('image', None)
        print(title)
        print(description)
        print(image)
    if(request.method == 'POST'):
        if(request.POST.get('songid',None)):
            print("FOUNDDDD")
            songid = request.POST['songid']
            print(songid)
            l.append(songid)

    if title and description and l:
        get_new_playlist = Playlist.objects.create(title = title,user = request.user,description=description,photo = image)
        song = Music.objects.filter(musicid = l[0])[0]
        PlaylistSong.objects.create(playlistid = get_new_playlist, songid = song)
        l.pop()
        print("YOO")
        response ={'msg':'Your form has been submitted successfully'}
        return JsonResponse(response) # return response as JSON

    elif (title and description and len(l)==0):
        get_new_playlist = Playlist.objects.create(title = title,user = request.user,description=description,photo = image)
        response ={'msg':'Your form has been submitted successfully'}
        print("YOLOOOOO")
        return JsonResponse(response) # return response as JSON


@csrf_exempt
def re_render_playlist(request):
    playlists = Playlist.objects.filter(user = request.user.id)

    return render_to_response('re_render_playlist.html',{'playlists':playlists})