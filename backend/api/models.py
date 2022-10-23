from unittest.util import _MAX_LENGTH
from django.db import models
from datetime import datetime
# Create your models here.

class Tourist(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50,unique=True)
    password = models.CharField(max_length=100)
    address = models.TextField(max_length=100)
    phone = models.IntegerField()
    date_of_birth = models.DateTimeField()

class TravelAgency(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50,unique=True)
    password = models.CharField(max_length=100)
    address = models.TextField(max_length=100)
    phone = models.IntegerField()

     
    