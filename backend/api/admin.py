from django.contrib import admin

# Register your models here.
from .models import Tourist
from .models import TravelAgency
from .models import ProgramsTable
from .models import ProgramsLocations

class TouristAdmin(admin.ModelAdmin):
    list_display = ('username','email','password','nationality','phone','age','language','gender')

class TravelAgencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'password', 'phone', 'state', 'city','postalcode','country')

class ProgramsTableAdmin(admin.ModelAdmin):
    list_display =('id','title','date','description','nbinscriptions','price','deadline','capacity','gallery','payment')
    
class ProgramsLocationsAdmin(admin.ModelAdmin):
    list_display = ('program','id','name','duration','datedebut','datefin','category','details','longitude','latitude')
    list_filter = ('program', 'category')
# Register your models here.

admin.site.register(Tourist, TouristAdmin)
admin.site.register(TravelAgency, TravelAgencyAdmin)
admin.site.register(ProgramsTable, ProgramsTableAdmin)
admin.site.register(ProgramsLocations, ProgramsLocationsAdmin)

