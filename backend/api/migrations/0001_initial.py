# Generated by Django 3.2.16 on 2023-01-15 10:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramsTable',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.TextField(max_length=100)),
                ('date', models.DateField()),
                ('description', models.TextField(max_length=200)),
                ('nbinscriptions', models.IntegerField()),
                ('price', models.FloatField()),
                ('deadline', models.DateField()),
                ('capacity', models.IntegerField()),
                ('gallery', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
                ('payment', models.CharField(choices=[('P', 'paid'), ('NP', 'not paid')], max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Tourist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('nationality', models.TextField(max_length=100)),
                ('phone', models.IntegerField()),
                ('age', models.IntegerField()),
                ('language', models.CharField(max_length=100)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
                ('interest', models.CharField(choices=[('Sports', 'Sports'), ('hiking', 'hiking'), ('cycling', 'cycling'), ('skiing', 'skiing'), ('camping', 'camping'), ('Skydiving', 'Skydiving'), ('Ballooning', 'Ballooning'), ('Surfing', 'Surfing'), ('Swimming', 'Swimming'), ('Shopping', 'Shopping')], max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TravelAgency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('phone', models.IntegerField()),
                ('state', models.TextField(max_length=100)),
                ('city', models.TextField(max_length=100)),
                ('postalcode', models.IntegerField()),
                ('country', models.TextField(max_length=100)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
                ('facebook_url', models.TextField(max_length=100)),
                ('instagram_url', models.TextField(max_length=100)),
                ('description', models.TextField(max_length=350)),
                ('gallery', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
            ],
        ),
        migrations.CreateModel(
            name='ProgramsLocations',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('duration', models.CharField(max_length=50)),
                ('datedebut', models.CharField(max_length=50)),
                ('datefin', models.CharField(max_length=50)),
                ('category', models.TextField(max_length=100)),
                ('details', models.TextField(max_length=100)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.programstable')),
            ],
        ),
    ]
