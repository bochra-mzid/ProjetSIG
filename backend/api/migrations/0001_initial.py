
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ProgramsTable',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.TextField(max_length=100)),
                ('date', models.DateField()),
                ('description', models.TextField(max_length=200)),
                ('nbinscriptions', models.IntegerField(default=0, null=True)),
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
                ('nationality', models.TextField(blank=True, max_length=100, null=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('language', models.CharField(blank=True, max_length=100, null=True)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female')], max_length=1, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
                ('interest', models.CharField(blank=True, choices=[('Sports', 'Sports'), ('hiking', 'hiking'), ('cycling', 'cycling'), ('skiing', 'skiing'), ('camping', 'camping'), ('Skydiving', 'Skydiving'), ('Ballooning', 'Ballooning'), ('Surfing', 'Surfing'), ('Swimming', 'Swimming'), ('Shopping', 'Shopping')], max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='TravelAgency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('state', models.TextField(blank=True, max_length=100, null=True)),
                ('city', models.TextField(blank=True, max_length=100, null=True)),
                ('postalcode', models.IntegerField(blank=True, null=True)),
                ('country', models.TextField(blank=True, max_length=100, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
                ('facebook_url', models.TextField(blank=True, max_length=100, null=True)),
                ('instagram_url', models.TextField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(blank=True, max_length=350, null=True)),
                ('gallery', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
            ],
        ),
        migrations.CreateModel(
            name='Tourist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('nationality', models.TextField(blank=True, max_length=100, null=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('language', models.CharField(blank=True, max_length=100, null=True)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female')], max_length=1, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/images')),
                ('interests', models.ManyToManyField(to='api.interest')),
            ],
        ),
        migrations.CreateModel(
            name='ProgramsLocations',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('datedebut', models.CharField(max_length=50)),
                ('datefin', models.CharField(max_length=50)),
                ('details', models.TextField(max_length=100)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.programstable')),
            ],
        ),
    ]
