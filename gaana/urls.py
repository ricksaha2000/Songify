from django.urls import path
from . import views

app_name = 'gaana'

urlpatterns = [
    path('', views.home , name='home'),
]