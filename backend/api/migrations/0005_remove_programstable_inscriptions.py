# Generated by Django 4.1.5 on 2023-01-15 17:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_travelagency_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='programstable',
            name='inscriptions',
        ),
    ]
