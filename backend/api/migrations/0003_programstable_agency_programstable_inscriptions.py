# Generated by Django 4.1.5 on 2023-01-15 17:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_interests_tourist_interest'),
    ]

    operations = [
        migrations.AddField(
            model_name='programstable',
            name='agency',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to='api.travelagency'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='programstable',
            name='inscriptions',
            field=models.ManyToManyField(to='api.tourist'),
        ),
    ]