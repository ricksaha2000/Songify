# Generated by Django 2.2 on 2020-06-05 19:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFollow',
            fields=[
                ('user_follow_id', models.AutoField(primary_key=True, serialize=False)),
                ('follow_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follow_user', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='current_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
