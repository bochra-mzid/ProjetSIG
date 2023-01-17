from rest_framework import serializers

from .models import *

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ('id', 'name')

class TouristSerializer(serializers.ModelSerializer):
    interest = InterestSerializer(read_only=True, many=True)
    image = serializers.ImageField(required=False)
    class Meta:
        model = Tourist
        fields = ('id','username','email','password','nationality','phone','age','language','gender','image', 'interest')


class TravelAgencySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = TravelAgency
        fields = ['name', 'email', 'password', 'phone', 'state', 'city','postalcode','country', 'description', 'image']


class ProgramsTableSerializer(serializers.ModelSerializer):
    gallery = serializers.ImageField(required=False)
    class Meta:
        model = ProgramsTable
        fields = ['id','title','date','description','nbinscriptions','price','deadline','capacity','gallery', 'agency', 'gallery']

class ProgramsLocationsSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = ProgramsLocations
        fields = ['program','id','name','datedebut','datefin','details','longitude','latitude', 'image']