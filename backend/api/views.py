from django.shortcuts import render
from .serializers import *
from django.http import HttpResponse,JsonResponse
from rest_framework .parsers import JSONParser
from django.views.decorators import csrf_exempt
from rest_framework import generics,filter
import os

# Create your views here.


@csrf_exempt
def create_tourist(request):
    if (request.method == 'POST'):
        data = JSONParser().parse(request)
        serializer = TouristSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)
        return JsonResponse(serializer.errors,status=400)


@csrf_exempt
def login_tourist(request,email):
    try:
        tourist = Tourist.objects.filter(email=email)
    except:
        return HttpResponse(status=404)

    if (request.method == 'GET'):
        serializer = TouristSerializer(tourist,many=True)
        return JsonResponse(serializer.data,safe=False)


@csrf_exempt
def get_tourist(request,id):
    try:
        tourist = Tourist.objects.get(pk=id)
    except:
        return HttpResponse(status=404)

    if (request.method == 'GET'):
        serializer = TouristSerializer(tourist)
        return JsonResponse(serializer.data)


@csrf_exempt
def create_travelagency(request):
    if (request.method == 'POST'):
        data = JSONParser().parse(request)
        serializer = TravelAgencySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)
        return JsonResponse(serializer.errors,status=400)

@csrf_exempt
def login_travelagency(request,email):
    try:
        travelagency = TravelAgency.objects.filter(email=email)
    except:
        return HttpResponse(status=404)

    if (request.method == 'GET'):
        serializer = TravelAgencySerializer(travelagency,many=True)
        return JsonResponse(serializer.data,safe=False)

@csrf_exempt
def get_travelagency(request,id):
    try:
        travelagency = TravelAgency.objects.get(pk=id)
    except:
        return HttpResponse(status=404)

    if (request.method == 'GET'):
        serializer = TravelAgencySerializer(travelagency)
        return JsonResponse(serializer.data)
