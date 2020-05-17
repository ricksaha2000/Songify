from django.urls import path
from . import views

app_name = 'gaana'

urlpatterns = [
    path('', views.home , name='home'),
    path('songs/' , views.index , name="index"),
    path('song/',views.song , name="song")
]