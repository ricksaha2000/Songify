# Generated by Django 2.2 on 2020-06-23 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_spotify',
            field=models.BooleanField(default=False),
        ),
    ]
