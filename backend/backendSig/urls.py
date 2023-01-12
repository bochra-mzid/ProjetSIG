from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from api import views

router = routers.DefaultRouter()
router.register(r'tourists', views.TouristView, 'tourist')
router.register(r'travelagencies', views.TraveAgencyView, 'travelagency')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token)
]