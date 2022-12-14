# Generated by Django 4.1.4 on 2022-12-29 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tourist',
            old_name='address',
            new_name='nationality',
        ),
        migrations.RemoveField(
            model_name='tourist',
            name='date_of_birth',
        ),
        migrations.AddField(
            model_name='tourist',
            name='age',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tourist',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default=5, max_length=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tourist',
            name='language',
            field=models.CharField(default=5, max_length=100),
            preserve_default=False,
        ),
    ]
