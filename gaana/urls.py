from django.urls import path
from . import views

app_name = 'gaana'

urlpatterns = [
    path('', views.home , name='home'),
    path('<int:albumid>/songs/' , views.index , name="index"),
    path('<int:playlistid>/playlist/' , views.index_playlist , name="index_playlist"),
    path('playlist/<playlist_id>', views.index_playlist_spotify, name='playlist_detail'),


    # path('song/',views.song , name="song")
]