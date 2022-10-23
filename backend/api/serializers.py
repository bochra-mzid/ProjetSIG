from rest_framework import serializers

from .models import *

class TouristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = ['username','email','password','address','phone','date_of_birth']



class TravelAgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = ['username','email','password','address','phone']


