from django.urls import path
from . import views
from users.views import ArtistSignUpView



app_name = 'users'

urlpatterns = [
    path('login/', views.login_customer, name='login'),
    path('register/', views.register_customer, name='register'),
    path('logout/', views.logout_customer , name='logout'),
    path('artist/',views.artist_view , name='home'),
    path('artist/add',views.add_album , name='add_album'),
    path('artist/song/<int:albumid>/add',views.add_song , name='add_song'),
    path('choose/',views.choose_user_type , name='choose_user_type'),


    # path('dashboard/', views.dashboard_customer , name='dashboard'),
    # path('<int:user_id>/profile/', views.profile_customer , name='profile'),
    path('signup/artist/', ArtistSignUpView.as_view(), name='artist_signup'),
    # path('accounts/signup/student/', StudentSignUpView.as_view(), name='student_signup'),
    path('artist/song/<int:albumid>',views.artist_view_song , name='song_detail'),
    # path('myposts/', views.myposts , name='myposts'),
]
