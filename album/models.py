from django.db import models
from datetime import datetime
from users.models import User
from genre.models import Genre
# Create your models here.
class Album(models.Model):
    albumid = models.AutoField(primary_key = True)
    title = models.CharField(max_length=200)
    user  = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='category')
    photo = models.ImageField(upload_to='album/')
    published_at = models.DateTimeField(default=datetime.now , blank=True )


    def __str__(self):
        return str(self.albumid)