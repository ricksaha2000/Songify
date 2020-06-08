from django.db import models
from users.models import User
from playlist.models import Playlist
from gaana.models import Music
# Create your models here.
class SaveUserPlaylist(models.Model):
    saveduserplaylistid = models.AutoField(primary_key = True)
    user  = models.ForeignKey(User, on_delete=models.CASCADE,related_name ="user_at_the_moment")
    belongsTo = models.ForeignKey(User, on_delete=models.CASCADE,related_name ="owner")
    playlistid = models.ForeignKey(Playlist, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.saveduserplaylistid)
