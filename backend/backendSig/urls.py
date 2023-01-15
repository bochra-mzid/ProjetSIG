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
    path('agency/login/', views.AgencyLoginView.as_view()),
    path('agencies/', views.TravelAgencyApiView.as_view()),
    path('agency/<int:agency_id>/', views.TravelAgencyApiView.as_view()),
    path('api/', include(router.urls)),
    path('', include(router.urls)),  
]
