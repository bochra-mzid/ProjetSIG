from unittest.util import _MAX_LENGTH
from django.db import models
from datetime import datetime
# Create your models here.

class Tourist(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50,unique=True)
    password = models.CharField(max_length=100)
    nationality = models.TextField(max_length=100)
    phone = models.IntegerField()
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
    address = models.TextField(max_length=100)
    phone = models.IntegerField()
    def _str_(self):
        return self.username
   


    