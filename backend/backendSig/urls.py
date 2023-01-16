from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
#router.register(r'tourists', views.TouristView, 'tourist')
#router.register(r'travelagencies', views.TraveAgencyView, 'travelagency')
#router.register(r'programstable', views.ProgramsTableView, 'program')
#router.register(r'programslocation', views.ProgramsLocationsView, 'programloc')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tourist/login/', views.TouristLoginView.as_view()),
    path('tourist/signup/', views.TouristSignupView.as_view(), name='signup'),
    path('tourists/', views.TouristListApiView.as_view()),
    path('tourist/<int:id>/', views.TouristRetrieveApiView.as_view()),
    path('touristupdate/<int:tourist_id>/', views.TouristUpdateView.as_view()),
    path('agencyupdate/<int:agency_id>/', views.AgencyUpdateView.as_view()),
    path('agency/login/', views.AgencyLoginView.as_view()),
    path('agency/signup/', views.TravelagencySignUpView.as_view()),
    path('agencies/', views.TravelagencyListApiView.as_view()),
    path('agency/<int:id>/', views.TravelagencyRetrieveApiView.as_view()),
    path('programs/<int:id>/', views.ProgramsListApiView.as_view()),
<<<<<<< HEAD
    path('programs-locations/', views.ProgramsLocationsApiView.as_view()),
    path('api/', include(router.urls)),
    path('', include(router.urls)),
    
   
=======
    path('interests/', views.InterestApiView.as_view()),
    path('api/', include(router.urls)),
>>>>>>> 6f21bb733b919cedf56b249ac327a7538ef66c9a
]
