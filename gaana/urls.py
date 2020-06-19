from django.urls import path
from . import views

app_name = 'gaana'

urlpatterns = [
    path('', views.home , name='home'),
    path('<int:albumid>/songs/' , views.index , name="index"),
    path('<int:playlistid>/playlist/' , views.index_playlist , name="index_playlist"),



    # path('song/',views.song , name="song")
]