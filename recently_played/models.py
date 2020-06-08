from django.db import models
from users.models import User
from gaana.models import Music
from datetime import datetime

# Create your models here.
class RecentlyPlayed(models.Model):
    RecentlyPlayedid = models.AutoField(primary_key = True)
    user  = models.ForeignKey(User, on_delete=models.CASCADE,related_name ="recentlyplayed")
    songid = models.ForeignKey(Music, on_delete=models.CASCADE)
    published_at = models.DateTimeField(default=datetime.now , blank=True)

    def __str__(self):
        return str(self.RecentlyPlayedid)
