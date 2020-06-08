# Generated by Django 2.2 on 2020-06-08 11:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('playlist', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SaveUserPlaylist',
            fields=[
                ('saveduserplaylistid', models.AutoField(primary_key=True, serialize=False)),
                ('belongsTo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL)),
                ('playlistid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlist.Playlist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_at_the_moment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
