from django.shortcuts import render
from gaana.models import Music
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from django.contrib import messages,auth
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt


def home(request):


    messages.error(request , 'Please Login and Lose Yourself in the world of Music')

    return render(request ,"index_front.html")



@csrf_exempt
def remove_modal(request):

    return render_to_response('modal_view_success.html')