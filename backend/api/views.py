from rest_framework import views
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
from .serializers import TravelAgencySerializer

class TravelAgencyApiView(APIView):
    def get(self, request, *args, **kwargs):
        agencies = TravelAgency.objects.all()
        serializer = TravelAgencySerializer(agencies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def get_object(self, agency_id):
        try:
            return TravelAgency.objects.get(id=agency_id)
        except TravelAgency.DoesNotExist:
            return None

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


#class TraveAgencyView(viewsets.ModelViewSet):
    #serializer_class = TravelAgencySerializer
    #queryset = TravelAgency.objects.all()

#class ProgramsTableView(viewsets.ModelViewSet):
    #serializer_class = ProgramsTableSerializer
    #queryset = ProgramsTable.objects.all()

#class ProgramsLocationsView(viewsets.ModelViewSet):
  #  serializer_class = ProgramsLocationsSerializer
   # queryset = ProgramsLocations.objects.all()