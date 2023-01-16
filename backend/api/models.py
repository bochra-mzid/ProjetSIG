from unittest.util import _MAX_LENGTH
from django.db import models
from datetime import datetime
# Create your models here.

#TouristRegistration
class Interest(models.Model):
    name = models.CharField(max_length=50)
    def _str_(self):
        return self.name
class Tourist(models.Model):
    username = models.CharField(max_length=50,null=False, blank=False)
    email = models.EmailField(max_length=50,unique=True, null=False, blank=False)
    password = models.CharField(max_length=100,null=False, blank=False)
    nationality = models.TextField(max_length=100,null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    #statut = models.TextField(max_length=100)
    age = models.IntegerField(null=True, blank=True)
    language = models.CharField(max_length=100,null=True, blank=True)
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES,null=True, blank=True)
    image = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    """INTEREST_CHOICES = [
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
    ]"""
    interest = models.ManyToManyField(Interest, blank=True)

    def _str_(self):
        return self.username

class TravelAgency(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(max_length=50,unique=True, null=False, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)
    phone = models.IntegerField(null=True, blank=True)
    state = models.TextField(max_length=100,null=True, blank=True)
    city = models.TextField(max_length=100,null=True, blank=True)
    postalcode = models.IntegerField(null=True, blank=True)
    country = models.TextField(max_length=100,null=True, blank=True)
    image = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    facebook_url = models.TextField(max_length=100,null=True, blank=True)
    instagram_url = models.TextField(max_length=100,null=True, blank=True)
    description = models.TextField(max_length=350,null=True, blank=True)
    gallery = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    def _str_(self):
        return self.username

class ProgramsTable(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=100)
    date = models.DateField()
    description = models.TextField(max_length=200)
    nbinscriptions = models.IntegerField(null=True, default=0)    
    price = models.FloatField()
    deadline = models.DateField()
    capacity = models.IntegerField()
    gallery = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    """PAYMENT_OPTIONS = [
        ('P', 'paid'),
        ('NP', 'not paid'),
    ]
    payment = models.CharField(max_length=2, choices=PAYMENT_OPTIONS)"""
    #inscriptions = models.ManyToManyField(Tourist)
    agency = models.ForeignKey(TravelAgency, on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    
class ProgramsLocations(models.Model):
    program = models.ForeignKey(ProgramsTable, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    datedebut = models.CharField(max_length=50)
    datefin = models.CharField(max_length=50)
    details = models.TextField(max_length=100)
    longitude = models.FloatField()
    latitude = models.FloatField()
    def __str__(self):
        return self.name
    
