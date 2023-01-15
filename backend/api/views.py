from rest_framework import views
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from .models import TravelAgency


class TouristLoginView(views.APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")
        print(email, password)
        try:
            user = Tourist.objects.get(email=email)
            print(user.password)
            if (password==user.password):
                return Response({"message": "Logged In", "id": user.id}, status=200)
            else:
                return Response({"error": "Invalid Credentials"}, status=404)
        except Tourist.DoesNotExist:
            return Response({"error": "Invalid Credentials"}, status=404)


class AgencyLoginView(views.APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = TravelAgency.objects.get(email=email)
            if (password==user.password):
                return Response({"message": "Logged In", "id": user.id}, status=200)
            else:
                return Response({"error": "Invalid Credentials"}, status=404)
        except TravelAgency.DoesNotExist:
            return Response({"error": "Invalid Credentials"}, status=404)

class InterestApiView(APIView):
    def get(self, request, *args, **kwargs):
        interests = Interest.objects.all()
        serializer = InterestSerializer(interests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

#SignUp a tourist
class TouristSignupView(views.APIView):
    def post(self, request, format=None):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        password = password
        nationality = request.data.get("nationality", "")
        phone = request.data.get("phone", "")
        age = request.data.get("age", "")
        language = request.data.get("language", "")
        gender = request.data.get("gender", "")
        interest = request.data.get("interest", "")
        image = request.data.get("image", "")
        tourist = Tourist.objects.create(username=username, email=email, password=password, nationality=nationality, phone=phone, age=age, language=language, gender=gender, interest=interest, image=image)
        return Response({"message": "Tourist created"})
    
#SignUp a travelagency
class TravelagencySignUpView(views.APIView):

    def post(self, request, format=None):
        serializer = TravelAgencySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Travel agency created successfully"})
        return Response({"error": serializer.errors})
    
#get all tourists and a tourist by ID
class TouristListApiView(ListAPIView):
    queryset = Tourist.objects.all()
    serializer_class = TouristSerializer

class TouristRetrieveApiView(RetrieveAPIView):
    queryset = Tourist.objects.all()
    serializer_class = TouristSerializer
    lookup_field = 'id'
    
    def get_object(self):
        tourist_id = self.kwargs['id']
        try:
            return Tourist.objects.get(id=tourist_id)
        except Tourist.DoesNotExist:
            return None
    
#get all agenciess and an agency by ID
class TravelagencyListApiView(ListAPIView):
    queryset = TravelAgency.objects.all()
    serializer_class = TravelAgencySerializer

class TravelagencyRetrieveApiView(RetrieveAPIView):
    queryset = TravelAgency.objects.all()
    serializer_class = TravelAgencySerializer
    lookup_field = 'id'
    
    def get_object(self):
        agency_id = self.kwargs['id']
        try:
            return TravelAgency.objects.get(id=agency_id)
        except TravelAgency.DoesNotExist:
            return None

#Update Tourist
class TouristUpdateView(APIView):
    def put(self, request, tourist_id, format=None):
        tourist = Tourist.objects.get(id=tourist_id)
        serializer = TouristSerializer(tourist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#class TraveAgencyView(viewsets.ModelViewSet):
    #serializer_class = TravelAgencySerializer
    #queryset = TravelAgency.objects.all()

#class ProgramsTableView(viewsets.ModelViewSet):
    #serializer_class = ProgramsTableSerializer
    #queryset = ProgramsTable.objects.all()

#class ProgramsLocationsView(viewsets.ModelViewSet):
  #  serializer_class = ProgramsLocationsSerializer
   # queryset = ProgramsLocations.objects.all()