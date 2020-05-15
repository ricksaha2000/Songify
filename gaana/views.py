from django.shortcuts import render
from gaana.models import Music
# Create your views here.
def home(request):
    songs = Music.objects.order_by('?')[:9]
    context = {
        'title':'Home',
        'songs':songs,
    }

    return render(request , 'songs/index.html' , context)