from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'tourists', views.TouristView, 'tourist')
router.register(r'travelagencies', views.TraveAgencyView, 'travelagency')
router.register(r'programstable', views.ProgramsTableView, 'program')
router.register(r'programslocation', views.ProgramsLocationsView, 'programloc')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.LoginView.as_view()),
    path('api/', include(router.urls)),
    path('', include(router.urls)),

   
]
