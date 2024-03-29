"""music URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from gaana.views import (song,
                        player_song_view,
                        player_album_selected,
                        modal_open,add_to_playlist,
                        playlist_selected,
                        add_playlist_basic,
                        re_render_playlist,
                        follow_artist,
                        follow_user,
                        search_user,
                        search_song,
                        refresh_user_list,
                        refresh_search_list,
                        showfolloweduserplaylist,
                        showfolloweduserSongs,
                        SaveFollowedUserPlaylist,
                        recently_played,
                        radio,
                        song_playlist_song,
                        song_player_playlist,
                        re_render_user_followed_playlist,
                        search_homepage,
                        search_artist_homepage)
from music import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home,name="home"),
    path('music/',include('gaana.urls')),

    # AJAX VIEW
    path('song/',song , name="song"),
    path('song_player/',player_song_view , name="song_player"),
    path('song_selected_album/',player_album_selected , name="album_selected"),
    path('display_modal/',modal_open , name="modal_open"),
    path('add_to_playlist/',add_to_playlist , name="add_to_playlist"),
    path('playlist_selected/',playlist_selected , name="playlist_selected"),
    path('add_playlist_basic/',add_playlist_basic , name="add_playlist_basic"),
    path('re_render_playlist/',re_render_playlist , name="re_render_playlist"),
    path('follow_artist/',follow_artist , name="follow_artist"),
    path('follow_user/',follow_user , name="follow_user"),
    path('search_user/',search_user , name="search_user"),
    path('refresh_user_list/',refresh_user_list , name="refresh_user_list"),
    path('refresh_search_list/',refresh_search_list , name="refresh_search_list"),
    path('showfolloweduserplaylist/',showfolloweduserplaylist , name="showfolloweduserplaylist"),
    path('showfolloweduserSongs/',showfolloweduserSongs , name="showfolloweduserSongs"),
    path('SaveFollowedUserPlaylist/',SaveFollowedUserPlaylist , name="SaveFollowedUserPlaylist"),
    path('recently_played/',recently_played , name="recently_played"),
    path('radio/',radio,name="radio"),
    path('search_song/',search_song , name="search_song"),
    path('song_playlist_song/',song_playlist_song , name="song_playlist_song"),
    path('song_player_playlist/',song_player_playlist , name="song_player_playlist"),
    path('re_render_user_followed_playlist/',re_render_user_followed_playlist, name="re_render_user_followed_playlist"),
    path('search_homepage/',search_homepage , name="search_homepage"),
    path('remove_modal/',views.remove_modal,name="remove_modal"),
    path('search_artist_homepage/',search_artist_homepage , name="search_artist_homepage"),










    #AJAX VIEWS END
    path('users/',include('users.urls')),
    path('', include('spotify_app.urls', namespace='spotify_app')),
    path('social/', include('social_django.urls')),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

