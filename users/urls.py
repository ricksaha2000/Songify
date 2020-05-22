from django.urls import path
from . import views
from users.views import SellerSignUpView,seller_product_song



app_name = 'users'

urlpatterns = [
    path('login/', views.login_customer, name='login'),
    path('register/', views.register_customer, name='register'),
    path('logout/', views.logout_customer , name='logout'),
    path('seller/',views.seller_product , name='home'),

    # path('dashboard/', views.dashboard_customer , name='dashboard'),
    # path('<int:user_id>/profile/', views.profile_customer , name='profile'),
    path('signup/artist/', SellerSignUpView.as_view(), name='teacher_signup'),
    # path('accounts/signup/student/', StudentSignUpView.as_view(), name='student_signup'),
    path('artist/song/<int:albumid>',views.seller_product_song , name='song_detail'),
    # path('myposts/', views.myposts , name='myposts'),
]
