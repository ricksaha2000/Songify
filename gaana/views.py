from django.shortcuts import render, redirect
from gaana.models import Music
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from album.models import Album
from users.models import User
from artist_follow.models import ArtistFollow
from user_follow.models import UserFollow
from saveUserPlaylist.models import SaveUserPlaylist
from playlist.models import Playlist
from playlist_song.models import PlaylistSong
from django.http import JsonResponse
from recently_played.models import RecentlyPlayed
def home(request):
    if not request.user.is_authenticated:
        return redirect('/')
    # songs = Music.objects.order_by('?')[:9]
    albums = Album.objects.all()
    playlists = Playlist.objects.filter(user=request.user)
    context = {
        'title':'Home',
        'albums':albums,
        'playlists':playlists,
    }

    return render(request , 'songs/index.html' , context)

@csrf_exempt
def index(request,albumid):
    if not request.user.is_authenticated:
        return redirect('/')
    songs = Music.objects.filter(album = albumid).order_by('serialid')
    number_of_songs = len(songs)
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
    recently_played_songs = RecentlyPlayed.objects.filter(user = request.user).order_by('-published_at')

    followed_playlist = SaveUserPlaylist.objects.filter(user = request.user)

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
        'followed_playlist':followed_playlist,
        "recently_played_songs":recently_played_songs,
        "number_of_songs":number_of_songs,

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
        'followed_playlist':followed_playlist,
        "recently_played_songs":recently_played_songs,
        "number_of_songs":number_of_songs,



        }




    return render(request , 'index.html',context)



@csrf_exempt
def index_playlist(request,playlistid):
    if not request.user.is_authenticated:
        return redirect('/')
    songs = PlaylistSong.objects.filter(playlistid = playlistid)
    number_of_songs = len(songs)

    album = Playlist.objects.get(playlistid = playlistid)
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
    recently_played_songs = RecentlyPlayed.objects.filter(user = request.user).order_by('-published_at')

    followed_playlist = SaveUserPlaylist.objects.filter(user = request.user)

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
        'followed_playlist':followed_playlist,
        "recently_played_songs":recently_played_songs,
        "number_of_songs":number_of_songs,

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
        'followed_playlist':followed_playlist,
        "recently_played_songs":recently_played_songs,
        "number_of_songs":number_of_songs,



        }




    return render(request , 'index_playlist.html',context)


@csrf_exempt
def song(request):
    if request.method == "POST":
        songid = request.POST['songid']
        albumid = request.POST['albumid']
        album = Album.objects.filter(albumid = albumid)[0]
        songs = Music.objects.filter(album = album).order_by('serialid')
        number_of_songs = len(songs)
        song = Music.objects.filter(serialid=songid,album=album)
        print(song)
    return render_to_response('player.html',{"songs":song,"number_of_songs":number_of_songs})
@csrf_exempt
def player_song_view(request):
    if request.method == "POST":
        songid = request.POST['songid']
        albumid = request.POST['albumid']
        album = Album.objects.filter(albumid = albumid)[0]
        song = Music.objects.get(serialid=songid,album=album)
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
    serialid=0
    print("I AM IN ADD_TO_PLAYLIST")
    if request.method == "POST":
        songid = request.POST['songid']
        playlistid = request.POST['playlistid']
        playlist = Playlist.objects.filter(playlistid = playlistid)[0]
        song = Music.objects.filter(musicid = songid)[0]

        print(songid)
        print(playlistid)
        playlistsong_exists = PlaylistSong.objects.filter(playlistid=playlistid).values('serialid')
        length = (len(playlistsong_exists))

        if(not playlistsong_exists):
            serialid = 1
        else:
            serialid = length+1

        PlaylistSong.objects.create(playlistid = playlist, songid = song,serialid = serialid)

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
        playlist_songs = PlaylistSong.objects.filter(playlistid = playlist[0]).order_by('serialid')
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
        print("I AM IN 1")
        serialid=0
        get_new_playlist = Playlist.objects.create(title = title,user = request.user,description=description,photo = image)
        song = Music.objects.filter(musicid = l[0])[0]
        playlistsong_exists = PlaylistSong.objects.filter(playlistid=get_new_playlist).values('serialid')
        length = (len(playlistsong_exists))

        if(not playlistsong_exists):
            serialid = 1
        else:
            serialid = length+1
        PlaylistSong.objects.create(playlistid = get_new_playlist, songid = song,serialid = serialid)
        l.pop()
        # print("YOO")
        response ={'msg':'Your form has been submitted successfully'}
        return JsonResponse(response) # return response as JSON

    elif (title and description and len(l)==0):
        print("I AM IN 2")

        get_new_playlist = Playlist.objects.create(title = title,user = request.user,description=description,photo = image)

        response ={'msg':'Your form has been submitted successfully'}
        # print("YOLOOOOO")
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
        # print(x)
        if(x):
            # print("BOOYEAH")
            user_new = User.objects.filter(id = followuserids)[0]
            # print("YOMAMAMAM")
            to_be_deleted = UserFollow.objects.filter(user = request.user,follow_user = user_new)
            to_be_deleted.delete()
            response = {
                'user_added':False
            }

        else:
            user_new = User.objects.filter(id = followuserids)[0]
            # print(user_new)
            # print("HII")
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
        #    print(userid)

           results = results.exclude(id=userid)
        #    print(results)


    return render(None,'search_users.html',{"results":results})

@csrf_exempt
def refresh_user_list(request):
    all_user = UserFollow.objects.filter(user = request.user)

    return render_to_response('refresh_user_list.html',{'all_users':all_user})

@csrf_exempt
def refresh_search_list(request):
    if request.method == "POST":
        x = request.POST['x']
        print(x)
        results = User.objects.filter(username__contains = x , username__isnull = False)
        result_copy = User.objects.filter(username__contains = x , username__isnull = False)

        length = len(results.values())
    for i in range(length):
        userid =  (result_copy.values())[i]['id']
        print(userid)
        x = UserFollow.objects.filter(user = request.user,follow_user=userid)
        if x:
            print(userid)

            results = results.exclude(id=userid)
        print(results)



    return render_to_response('refresh_search_list.html',{"results":results})

@csrf_exempt
def showfolloweduserplaylist(request):

    if request.method == "POST":
        follow_user_id = request.POST['follow_user_id']
        print(follow_user_id)
    playlists = Playlist.objects.filter(user = follow_user_id)
    print(playlists)

    return render_to_response('showfolloweduserplaylist.html',{'playlists':playlists})

@csrf_exempt
def showfolloweduserSongs(request):

    if request.method == "POST":
        follow_user_playlist_id = request.POST['follow_user_playlist_id']
        print(follow_user_playlist_id)
    playlist_user = Playlist.objects.filter(playlistid =follow_user_playlist_id).values()[0]['user_id']
    playlists_songs = PlaylistSong.objects.filter(playlistid = follow_user_playlist_id)
    print(playlist_user)

    return render_to_response('showfolloweduserSongs.html',{'playlist_songs':playlists_songs,"follow_user_playlist_id":follow_user_playlist_id,"user_id":playlist_user})

@csrf_exempt
def SaveFollowedUserPlaylist(request):

    if request.method == "POST":
        follow_user_playlist_id = request.POST['follow_user_playlist_id']
        user_id = request.POST['user_id']
    user = User.objects.filter(id = user_id)[0]
    playlist = Playlist.objects.filter(playlistid = follow_user_playlist_id)[0]
    SaveUserPlaylist.objects.create(playlistid =playlist ,user = request.user , belongsTo=user)

    return render_to_response('showfolloweduserSongs.html',{"follow_user_playlist_id":follow_user_playlist_id})
@csrf_exempt
def recently_played(request):

    if request.method == "POST":
        albumid = request.POST['albumid']
        song_id = request.POST['songid']
        album = Album.objects.filter(albumid = albumid)[0]
        # song = Music.objects.filter(serialid=songid,album=album)
        music = Music.objects.filter(serialid=song_id,album=album)[0]
        # print("YOLOO")
        # print(song_id)
        count_objects = RecentlyPlayed.objects.filter(user = request.user)
        length = len(count_objects)
        # print(count_objects)
        print(length)
        if(RecentlyPlayed.objects.filter(user = request.user , songid = music).count() > 0):
                print("1st")
                temp_duplicates = RecentlyPlayed.objects.filter(user = request.user , songid = music).order_by('published_at')
                temp_duplicate = temp_duplicates.values()[0]['songid_id']

                music_temp_duplicate = Music.objects.filter(musicid = temp_duplicate)[0]
                temp = RecentlyPlayed.objects.filter(user = request.user).exclude(songid = music_temp_duplicate).order_by('published_at')
                # print(temp)
                temp_delete_duplicate = RecentlyPlayed.objects.filter(user = request.user , songid = music_temp_duplicate)
                temp_delete_duplicate.delete()
                RecentlyPlayed.objects.create(user = request.user ,songid = music)

        elif(length>=3):
            print("2nd")
            temp = RecentlyPlayed.objects.filter(user = request.user).order_by('published_at')
            # print(temp)
            temps = temp.values()[0]['songid_id']
            # print("YOLOO")
            # print(temps)
            music_temp = Music.objects.filter(musicid = temps)[0]
            temp = RecentlyPlayed.objects.filter(user = request.user).exclude(songid = music_temp).order_by('published_at')
            # print(temp)
            temp_delete = RecentlyPlayed.objects.filter(user = request.user , songid = music_temp)
            temp_delete.delete()
            RecentlyPlayed.objects.create(user = request.user ,songid = music)

        else:
            print("3rd")
            RecentlyPlayed.objects.create(user = request.user ,songid = music)

    updated_recently_played_songs = RecentlyPlayed.objects.filter(user = request.user).order_by('-published_at')


    return render_to_response('recently_played_songs.html',{"recently_played_songs":updated_recently_played_songs})

@csrf_exempt
def radio(request):


    return render_to_response('radio_ajax.html')










@csrf_exempt
def search_song(request):
    result=''
    if request.method == "POST":
        search_text = request.POST['search_text']
    else:
        search_text = ''
    results = Music.objects.filter(title__contains = search_text , title__isnull = False)



    return render(None,'search_song.html',{"results":results})


@csrf_exempt
def song_playlist_song(request):
    if request.method == "POST":
        songid = request.POST['songid']
        albumid = request.POST['albumid']
        album = Playlist.objects.filter(playlistid = albumid)[0]
        songs = PlaylistSong.objects.filter(playlistid=album).order_by('serialid')
        number_of_songs = len(songs)

        song = PlaylistSong.objects.filter(serialid=songid,playlistid=album)
        print(song)
    return render_to_response('player_playlist.html',{"songs":song,"number_of_songs":number_of_songs})

@csrf_exempt
def song_player_playlist(request):
    if request.method == "POST":
        songid = request.POST['songid']
        albumid = request.POST['albumid']
        print(songid)
        print(albumid)
        album = Playlist.objects.filter(playlistid = albumid)[0]
        song = PlaylistSong.objects.filter(serialid=songid,playlistid=album)
        print("YOMAMAMAM")
        # print(song)
        # title = song.songid.title
        # print(title)
        # artist = song.songid.album.user.username
        # print(artist)
        return render_to_response('player_song_view_playlist.html',{"songs":song})