from django.db import models
from datetime import datetime

# Create your models here.
class Music(models.Model):
    musicid = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    audio = models.FileField(upload_to='music/')
    published_at = models.DateTimeField(default=datetime.now , blank=True)


    def __str__(self):
        return str(self.musicid)