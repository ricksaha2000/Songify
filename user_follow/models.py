from django.db import models
from users.models import User
from datetime import datetime

# Create your models here.
class UserFollow(models.Model):
    user_follow_id = models.AutoField(primary_key = True)
    user  = models.ForeignKey(User, on_delete=models.CASCADE,related_name='current_user')
    follow_user  = models.ForeignKey(User, on_delete=models.CASCADE,related_name='follow_user')


    def __str__(self):
        return str(self.user_follow_id)

