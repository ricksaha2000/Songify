# Create your views here.
from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from django.contrib import messages,auth
# from django.contrib.auth.models import User

from django.contrib.auth.decorators import login_required
from django.utils.datastructures import MultiValueDictKeyError
from django.core.paginator import Paginator
from django.contrib.auth import login
# from decorators import customer_required
from django.contrib.auth.decorators import login_required
# import users.face_detect as face_detect
from users.models import Profile,User
from django.views.generic import (CreateView, DeleteView, DetailView, ListView, UpdateView)

from django.shortcuts import get_object_or_404, redirect, render
from users.forms import ArtistSignUpForm
import base64
from PIL import Image
from io import BytesIO
# import cv2
# import numpy as np
from django.core.files import File
from django.core.files.base import ContentFile
import requests
import os
from urllib.parse import urlparse
from genre.models import Genre
from album.models import Album
from gaana.models import Music



def choose_user_type(request):

	return render(request,'users/choose.html')
def register_customer(request):
	if request.user.is_authenticated == False:
		if request.method == 'POST':
			username = request.POST['username']
			email = request.POST['email']
			password = request.POST['password']
			password2 = request.POST['password2']
			# img_encoded = request.POST['mydata']
			# img_decode = base64.b64decode(img_encoded)


			if password == password2:
				if User.objects.filter(username=username).exists():
						messages.error(request , 'User Name Already Taken')
						return redirect('users:register')
				else:
					if User.objects.filter(email=email).exists():
						messages.error(request , 'Email Already Exits ')
						return redirect('users:register')
					else:
						user = User.objects.create_user(username=username,password=password,email=email,is_user=True)

						Profile.objects.update_or_create(
							user=user,

						)
						user.save()
						profile = Profile.objects.get(user=user)
						# profile.image = ContentFile(img_decode, 'profile.jpg')
						profile.save()
						messages.success(request,'You Are Now Registered')
						return redirect('users:login')
			else:
				messages.error(request , 'Password Doest Not Match')
				return redirect('users:register')

		else:
			return render(request,'users/register.html')
	else:
		messages.info(request , 'You Are Already Logged In')
		return redirect('/')


def login_customer(request):
	if request.user.is_authenticated == False:
		if request.method == 'POST':
			username = request.POST['username']
			password = request.POST['password']
			is_customer = False
			is_artist = False
			user = auth.authenticate(username=username , password=password)
			if(User.objects.filter(username = username)):
				is_customer = User.objects.filter(username = username).values("is_user")[0]["is_user"]
				is_artist = User.objects.filter(username = username).values("is_artist")[0]["is_artist"]

			if user is not None and is_customer:
				# res = face_detect.check(user)
				res = True
				if res:
					auth.login(request,user)
					messages.success(request,'You Are Now LoggedIn')
					return redirect('gaana:home')
				messages.error(request,'Unauthorized access')
				return render(request,'users/login.html')


			elif user is not None and is_artist:
				# res = face_detect.check(user)
				res = True
				if res:
					auth.login(request,user)
					messages.success(request,'You Are Now LoggedIn')
					return redirect('users:home')
				messages.error(request,'Unauthorized access')
				return render(request,'users/login.html')
			else:
				messages.error(request,'Invalid Credentials')
				return redirect('users:login')

		else:
			return render(request,'users/login.html')

	else:
		messages.error(request,'You Are Alredy Logged In')
		return redirect('/')


@login_required(login_url="/users/login")
def logout_customer(request):
	# if request.method == 'POST':
	auth.logout(request)
	messages.success(request,'You Are Now Logged Out')
	return redirect('/')


class ArtistSignUpView(CreateView):
    model = User
    form_class = ArtistSignUpForm
    template_name = 'artist/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'ARTIST'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('/')

@login_required(login_url="/users/login")
def artist_view(request):
	if(request.user):
		if(request.user.is_artist):
			user_id = request.user.id
			categories = Genre.objects.all()
			products = Album.objects.filter(user = user_id)

			context = {

				# 'title':request.user.name,
				'products':products,
				'category':categories,
			}
			return render(request ,'artist/home.html' , context)
		else:
			return render(request,'users/login.html')


@login_required(login_url="/users/login")
def artist_view_song(request,albumid):
	if(request.user):
		if(request.user.is_artist):
			user_id = request.user.id
			categories = Genre.objects.all()
			products = Music.objects.filter(album = albumid)

			context = {

				# 'title':request.user.name,
				'products':products,
				'category':categories,
				'album_id':albumid
			}
			return render(request ,'artist/songlist.html' , context)
		else:
			return render(request,'users/login.html')

@login_required(login_url="/users/login")
def add_album(request):
	genre = Genre.objects.all()
	context = {
		'category':genre,
	}
	if request.method == 'POST':
		try:
			image = request.FILES['image']
		except MultiValueDictKeyError:
			image = False
		title = request.POST['title']
		description = request.POST['description']
		genre_selected = request.POST.get('category1')

		genre1 = Genre.objects.filter(title=genre_selected)[0]


		album = Album.objects.create(title = title ,
		user=request.user ,
		description = description ,
		genre=genre1 ,
		photo = image )

		album.save()

		return redirect('users:home')

	else:
		return render(request ,"artist/add.html" , context )
@login_required(login_url="/users/login")
def add_song(request,albumid):
	serialid=0
	if request.method == 'POST':
		try:
			audio = request.FILES['audio']
		except MultiValueDictKeyError:
			audio = False
		title = request.POST['title']

		# genre1 = Genre.objects.filter(title=genre_selected)[0]

		album = Album.objects.filter(albumid =albumid)[0]
		music_exists = Music.objects.filter(album = album).values('serialid')
		length = (len(music_exists))

		if(not music_exists):
			serialid = 1
		else:
			serialid = length+1
		# print(serialid)

		music = Music.objects.create(title = title ,
		album=album ,
		audio = audio,serialid=serialid)

		music.save()

		return redirect('users:home')

	else:
		return render(request ,"artist/add_song.html")
