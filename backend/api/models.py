from unittest.util import _MAX_LENGTH
from django.db import models
from datetime import datetime
# Create your models here.

#TouristRegistration
class Tourist(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50,unique=True)
    password = models.CharField(max_length=100)
    nationality = models.TextField(max_length=100)
    phone = models.IntegerField()
    statut = models.TextField(max_length=100)
    age = models.IntegerField()
    language = models.CharField(max_length=100)
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    image = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    INTEREST_CHOICES = [
        ('Sports','Sports'),
        ('hiking','hiking'),
        ('cycling','cycling'),
        ('skiing','skiing'),
        ('camping','camping'),
        ('Skydiving','Skydiving'),
        ('Ballooning','Ballooning'),
        ('Surfing','Surfing'),
        ('Swimming','Swimming'),
        ('Shopping','Shopping'),
    ]
    interest = models.CharField(max_length=100, choices=INTEREST_CHOICES)
    def _str_(self):
        return self.username

class TravelAgency(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50,unique=True)
    password = models.CharField(max_length=100)
    city = models.TextField(max_length=100)
    postalcode = models.IntegerField()
    country = models.TextField(max_length=100)
    age = models.IntegerField()
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    image = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    def _str_(self):
        return self.username

class ProgramsTable(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=100)
    date = models.DateField()
    description = models.TextField(max_length=200)
    nbinscriptions = models.IntegerField()
    price = models.FloatField()
    deadline = models.DateField()
    capacity = models.IntegerField()
    gallery = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    PAYMENT_OPTIONS = [
        ('P', 'paid'),
        ('NP', 'not paid'),
    ]
    payment = models.CharField(max_length=2, choices=PAYMENT_OPTIONS)
    def __str__(self):
        return self.title
    
class ProgramsLocations(models.Model):
    program = models.ForeignKey(ProgramsTable, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    datedebut = models.CharField(max_length=50)
    datefin = models.CharField(max_length=50)
    category = models.TextField(max_length=100)
    details = models.TextField(max_length=100)
    longitude = models.FloatField()
    latitude = models.FloatField()
    def __str__(self):
        return self.name
    
