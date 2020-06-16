from django.db import models
from users.models import User
from playlist.models import Playlist
from gaana.models import Music
# Create your models here.
class PlaylistSong(models.Model):
    playlistsongid = models.AutoField(primary_key = True)
    playlistid = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    songid = models.ForeignKey(Music, on_delete=models.CASCADE)
    serialid = models.IntegerField()

    def __str__(self):
        return str(self.playlistsongid)