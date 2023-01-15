from rest_framework import serializers

from .models import *

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ('id', 'name')

class TouristSerializer(serializers.ModelSerializer):
    interest = InterestSerializer(read_only=True, many=True)
    class Meta:
        model = Tourist
        fields = ('id','username','email','password','nationality','phone','age','language','gender','image','interest')


class TravelAgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelAgency
        fields = ['name', 'email', 'password', 'phone', 'state', 'city','postalcode','country']


class ProgramsTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramsTable
        fields = ['id','title','date','description','nbinscriptions','price','deadline','capacity','gallery','payment']

class ProgramsLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramsLocations
        fields = ['program','id','name','duration','datedebut','datefin','category','details','longitude','latitude']