from django.shortcuts import render
from .serializers import *
from django.http import HttpResponse,JsonResponse
from rest_framework .parsers import JSONParser
from rest_framework import viewsets
from .models import Tourist,TravelAgency
import os

# Create your views here.
class TouristView(viewsets.ModelViewSet):
    serializer_class = TouristSerializer
    queryset = Tourist.objects.all()

class TraveAgencyView(viewsets.ModelViewSet):
    serializer_class = TravelAgencySerializer
    queryset = TravelAgency.objects.all()

