# Generated by Django 4.1.5 on 2023-01-15 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_travelagency_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.RemoveField(
            model_name='tourist',
            name='interest',
        ),
        migrations.AddField(
            model_name='tourist',
            name='interest',
            field=models.ManyToManyField(to='api.interest'),
        ),
    ]
