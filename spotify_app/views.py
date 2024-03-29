import time

import spotipy
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView
from django.views.generic.edit import FormView, FormMixin

# import ds_pipeline as ds
import get_feat_playlists_new_albums
from .forms import PlaylistInputForm
# Create your views here.
from .models import Playlists, Song
from funcy import chunks
from django.core.paginator import Paginator
from django.views.generic import TemplateView
from django.shortcuts import render, redirect
from gaana.models import Music
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
from album.models import Album
from users.models import User
from artist_follow.models import ArtistFollow
from user_follow.models import UserFollow
from saveUserPlaylist.models import SaveUserPlaylist
from playlist.models import Playlist
from playlist_song.models import PlaylistSong
from django.http import JsonResponse
from recently_played.models import RecentlyPlayed
from spotify_app.models import Playlists
import get_feat_playlists_new_albums
import spotipy
class HomePage(TemplateView):
    template_name = 'spotify/index.html'

def show_diverse_recs(res, threshold):
    """
    alternate cluster in recommendation so that songs are different genres/artists
    :param res:
    :param threshold:
    :return: df with subset of recs that are arranged with alternating cluster ids
    """
    rec_ids = []  # result list
    while len(rec_ids) < threshold:
        for clust in res['CENTROID'].unique():
            cluster_rec = res[res['CENTROID'] == clust]
            if len(rec_ids) < threshold:
                for i in cluster_rec.index:
                    if i in rec_ids:
                        continue
                    else:
                        rec = i
                        if rec not in rec_ids:
                            rec_ids.append(rec)  # add unique rec
                            break
                        else:
                            continue
            else:
                break
    # return subset of df with re-arranged items
    return res.loc[rec_ids]


User = get_user_model()


class PlaylistListFormView(LoginRequiredMixin, ListView, FormView, FormMixin):
    model = Playlists
    template_name = 'spotify/index.html'
    queryset = Playlists.objects.all()
    form_class = PlaylistInputForm
    success_url = reverse_lazy('spotify_app:playlist_list')

    def get_context_data(self, **kwargs):
        get_feat_playlists_new_albums.main()  # get featured playlists on launch
        context = super().get_context_data(**kwargs)
        context['playlists'] = Playlists.objects.all().order_by('-date_created')[0:10]
        res = []
        try:
            for i, p in enumerate(context['playlists']):
                if i < len(context['playlists']) - 1:
                    if i % 3 == 0 or i == 0:
                        res.append((p, context['playlists'][i + 1], context['playlists'][i + 2]))
        except IndexError:
            print('NO FEATURED PLAYLISTS RIGHT NOW')

        context['playlist_batches'] = res

        context['form'] = self.get_form()
        social = self.request.user.social_auth.get(provider='spotify')
        context['token'] = social.extra_data['access_token']
        social.extra_data['spotify_me'] = spotipy.Spotify(auth=context['token']).me()
        print(social.extra_data['spotify_me']['display_name'].split()[0])
        user_instance = User.objects.get(username =social.extra_data['spotify_me']['display_name'].split()[0])
        user_instance_values = User.objects.filter(username =social.extra_data['spotify_me']['display_name'].split()[0]).values()[0]["is_user"]
        if(not user_instance_values):
            user_instance.is_user = True
            user_instance.is_spotify = True
            user_instance.save()

        print(user_instance_values)
        # if(user)
        context['first_name'] = social.extra_data['spotify_me']['display_name'].split()[0]
        # context['last_name'] = social.extra_data['spotify_me']['display_name'].split()[1]
        return context

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            instance = form.save(commit=False)
            instance.playlist_id = instance.playlist_id.split(':')[
                4]  # filter down to the playlist ID

            username = request.user.username

            social = self.request.user.social_auth.get(provider='spotify')
            token = social.extra_data['access_token']

            sp = spotipy.Spotify(auth=token)

            playlist = sp.user_playlist(username, playlist_id=instance.playlist_id)
            instance.playlist_name = playlist['name']
            print(instance.playlist_name)
            instance.playlist_url = playlist['external_urls']['spotify']
            print(instance.playlist_url)
            instance.playlist_num_tracks = len(playlist['tracks']['items'])
            instance.playlist_owner = playlist['owner']['display_name']
            instance.date_created = time.time()
            instance.save()
            return redirect('spotify_app:playlist_detail',playlist_id=instance.playlist_id)
        else:
            return self.form_invalid(form)


# class ChosenPlaylistListView(ListView):
#     template_name = 'spotify/recommendations.html'
#     model = Playlists
#     playlist_id = None

#     def get_context_data(self, *, object_list=None, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['chosen_playlist'] = Playlists.objects.get(
#             playlist_id=self.kwargs['playlist_id'])

#         return context




@csrf_exempt
def index_playlist_spotify(request,playlist_id):
    if not request.user.is_authenticated:
        return redirect('/')
    # songs = PlaylistSong.objects.filter(playlistid = playlistid)
    chosen_playlist = Playlists.objects.get(playlist_id=playlist_id)
    # number_of_songs = len(songs)
    albumies = Album.objects.all()
    # album = Playlist.objects.get(playlistid = playlistid)
    # album_username = album.user.username
    user_username = request.user.username

    # album_all = Album.objects.filter(user__username =album_username)
    playlists = Playlist.objects.filter(user = request.user.id)

    all_user = UserFollow.objects.filter(user = request.user)

    # artist_id = album.user.id
    # artist = User.objects.filter(id = artist_id).values()
    # print(artist)
    # x = ArtistFollow.objects.filter(user = request.user,artist = artist_id)
    # print(x)
    recently_played_songs = RecentlyPlayed.objects.filter(user = request.user).order_by('-published_at')

    followed_playlist = SaveUserPlaylist.objects.filter(user = request.user)

    if(True):
        print("BOOYEAH")
        context = {
        'title':'Home',
        # 'songs':songs,
        # 'username':album.title,
        # 'artist_id':album.user.id,
        'chosen_playlist':chosen_playlist,
        'albums':albumies,
        'playlists':playlists,
        'user_username':user_username,
        'added':True,
        'all_users':all_user,
        'followed_playlist':followed_playlist,
        "recently_played_songs":recently_played_songs,
        # "number_of_songs":number_of_songs,

        }
    else:
        context = {
        'title':'Home',
        # 'songs':songs,
        # 'username':album.title,
        # 'artist_id':album.user.id,
        'chosen_playlist':chosen_playlist,

        'albums':albumies,
        'playlists':playlists,
        'user_username':user_username,
        'added':False,
        'all_users':all_user,
        'followed_playlist':followed_playlist,
        "recently_played_songs":recently_played_songs,
        # "number_of_songs":number_of_songs,



        }




    return render(request , 'index_playlist_spotify.html',context)

# class RecommendationsView(ListView):
#     template_name = 'recommendations.html'
#     model = Playlist

#     def get_context_data(self, *, object_list=None, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['chosen_playlist'] = Playlist.objects.get(
#             playlist_id=self.kwargs['playlist_id'])

#         username = self.request.user.username

#         print('=> starting recommendations for {}\n'.format(username))

#         social = self.request.user.social_auth.get(provider='spotify')
#         token = social.extra_data['access_token']

#         recs = ds.main(playlist_id=context['chosen_playlist'].playlist_id,username=username, token=token)

#         if recs.shape[0] > 5:  # order recommendations alternating clusters
#             recs = show_diverse_recs(recs, 5)
#         else:
#             pass

#         context['active_user'] = username
#         sp = spotipy.Spotify(auth=token)
#         social = self.request.user.social_auth.get(provider='spotify')
#         context['token'] = social.extra_data['access_token']
#         social.extra_data['spotify_me'] = spotipy.Spotify(auth=context['token']).me()
#         context['first_name'] = social.extra_data['spotify_me']['display_name'].split()[0]
#         context['last_name'] = social.extra_data['spotify_me']['display_name'].split()[1]

#         if recs.shape[0] > 0:
#             print("=> creating Song db objects\n")
#             print("=> recommendations df shape {}\n".format(recs.shape))

#             rec_tracks = sp.tracks(recs.index.values)

#             print(len(rec_tracks['tracks']))
#             for i, rec in recs.iterrows():
#                 tmp_song = Song()
#                 tmp_song.song_id = i
#                 tmp_song.song_name = rec_tracks['tracks'][recs.index.get_loc(
#                     i)]['name']
#                 tmp_song.artist_name = rec_tracks['tracks'][recs.index.get_loc(
#                     i)]['artists'][0]['name']
#                 tmp_song.song_is_explicit = recs.loc[i, :]['explicit']
#                 tmp_song.song_popularity = recs.loc[i, :]['popularity']
#                 tmp_song.song_duration_ms = recs.loc[i, :]['duration_ms']
#                 tmp_song.recommended_user = username
#                 tmp_song.date_created = time.time()
#                 tmp_song.parent_playlist_id = context[
#                     'chosen_playlist'].playlist_id
#                 tmp_song.album_cover_art = rec_tracks['tracks'][recs.index.get_loc(i)]['album']['images'][1]['url']
#                 tmp_song.save()

#             context['script_ran'] = True
#             context['no_recommendations'] = False
#         else:
#             context['remove_rec_button'] = True
#             context['no_recommendations'] = True
#             print('=> no recommendations!')

#         print(recs)
#         if len(recs) > 5:
#             context['recs'] = Song.objects.all().filter(recommended_user=username,
#                                                         parent_playlist_id=context['chosen_playlist'].playlist_id)[:5]
#         else:
#             context['recs'] = Song.objects.all().filter(recommended_user=username,
#                                                         parent_playlist_id=context['chosen_playlist'].playlist_id)

#         return context
