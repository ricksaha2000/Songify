from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'spotify_app'

urlpatterns = [
    path('login/', views.HomePage.as_view(), name='spotify_home'),
    # path('playlist/', views.PlaylistListFormView.as_view(), name='playlist_list'),
    # path('playlist/<playlist_id>', views.index_playlist_spotify, name='playlist_detail'),
    # path('playlists/<playlist_id>/recommend', views.RecommendationsView.as_view(), name='recommendations')
]