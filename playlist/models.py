from django.db import models
from users.models import User
from datetime import datetime

# Create your models here.
class Playlist(models.Model):
    playlistid = models.AutoField(primary_key = True)
    title = models.CharField(max_length=200)
    user  = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    photo = models.ImageField(upload_to='album/',blank=True,null=True)
    published_at = models.DateTimeField(default=datetime.now , blank=True )


    def __str__(self):
        return str(self.playlistid)
