from django.contrib import admin

# Register your models here.
from .models import Tourist
from .models import TravelAgency

class TouristAdmin(admin.ModelAdmin):
    list_display = ('username','email','password','nationality','phone','age','language','gender')

class TravelAgencyAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone')

# Register your models here.

admin.site.register(Tourist, TouristAdmin)
admin.site.register(TravelAgency, TravelAgencyAdmin)

