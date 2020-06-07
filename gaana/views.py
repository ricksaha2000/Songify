from django.shortcuts import render
from gaana.models import Music
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from album.models import Album
from users.models import User
from artist_follow.models import ArtistFollow
from user_follow.models import UserFollow

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

    all_user = UserFollow.objects.filter(user = request.user)

    artist_id = album.user.id
    artist = User.objects.filter(id = artist_id).values()
    # print(artist)
    x = ArtistFollow.objects.filter(user = request.user,artist = artist_id)
    # print(x)
    if(x):
        print("BOOYEAH")
        context = {
        'title':'Home',
        'songs':songs,
        'username':album_username,
        'artist_id':album.user.id,
        'albums':album_all,
        'playlists':playlists,
        'user_username':user_username,
        'added':True,
        'all_users':all_user,
        }
    else:
        context = {
        'title':'Home',
        'songs':songs,
        'username':album_username,
        'artist_id':album.user.id,
        'albums':album_all,
        'playlists':playlists,
        'user_username':user_username,
        'added':False,
        'all_users':all_user,


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

@csrf_exempt
def follow_artist(request):
    response = {}
    if request.method == "POST":
        artist_id = request.POST['artist_id']
        # print(artist_id)
    artist = User.objects.filter(id = artist_id).values()
    # print(artist)
    x = ArtistFollow.objects.filter(user = request.user,artist = artist_id)
    # print(x)
    if(x):
        # print("BOOYEAH")
        artist_new = User.objects.filter(id = artist_id)[0]

        to_be_deleted = ArtistFollow.objects.filter(user = request.user,artist = artist_new)
        to_be_deleted.delete()
        response = {
            'added':False
        }

    else:
        artist_new = User.objects.filter(id = artist_id)[0]

        ArtistFollow.objects.create(user = request.user,artist = artist_new)

        response = {
            'added':True
        }
        # print("LOLO")

    return render_to_response('artist_follow.html',response)


@csrf_exempt
def follow_user(request):
    response = {}
    if request.method == "POST":
        followuserids = request.POST['follow_user_id']
        print(followuserids)
        # print(artist_id)
        wanttofollowuser = User.objects.filter(id = followuserids).values()
        print(wanttofollowuser)
        x = UserFollow.objects.filter(user = request.user,follow_user=followuserids)
        print(x)
        if(x):
            print("BOOYEAH")
            user_new = User.objects.filter(id = followuserids)[0]
            print("YOMAMAMAM")
            to_be_deleted = UserFollow.objects.filter(user = request.user,follow_user = user_new)
            to_be_deleted.delete()
            response = {
                'user_added':False
            }

        else:
            user_new = User.objects.filter(id = followuserids)[0]
            # print(user_new)
            print("HII")
            UserFollow.objects.create(user = request.user,follow_user = user_new)

            response = {
                'user_added':True
            }
            # print("LOLO")

    return render_to_response('user_follow.html',response)

@csrf_exempt
def search_user(request):
    result=''
    if request.method == "POST":
        search_text = request.POST['search_text']
    else:
        search_text = ''
    results = User.objects.filter(username__contains = search_text , username__isnull = False)
    result_copy = User.objects.filter(username__contains = search_text , username__isnull = False)
    length = len(results.values())
    # print(length)
    for i in range(length):
       userid =  (result_copy.values())[i]['id']
       x = UserFollow.objects.filter(user = request.user,follow_user=userid)
       if x:
           print(userid)

           results = results.exclude(id=userid)
           print(results)







    return render(None,'search_users.html',{"results":results})