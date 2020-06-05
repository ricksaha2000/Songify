from django.db import models
from users.models import User
from datetime import datetime

# Create your models here.
class ArtistFollow(models.Model):
    artist_follow_id = models.AutoField(primary_key = True)
    user  = models.ForeignKey(User, on_delete=models.CASCADE,related_name='current')
    artist  = models.ForeignKey(User, on_delete=models.CASCADE,related_name='artist')


    def __str__(self):
        return str(self.artist_follow_id)
