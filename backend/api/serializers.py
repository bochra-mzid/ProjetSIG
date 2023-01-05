from rest_framework import serializers

from .models import *

class TouristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = ['username','email','password','nationality','phone','age','language','gender']



class TravelAgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = ['username','email','password','address','phone']


