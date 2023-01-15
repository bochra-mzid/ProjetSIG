from django.contrib import admin

# Register your models here.
from .models import Tourist
from .models import TravelAgency
from .models import ProgramsTable
from .models import ProgramsLocations
from .models import Interest

class TouristAdmin(admin.ModelAdmin):
    list_display = ('id', 'username','email','password','nationality','phone','age','language','gender', 'interest_list')
    def interest_list(self, obj):
        return ", ".join([str(interest.name) for interest in obj.interest.all()])

        
class TravelAgencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'password', 'phone', 'state', 'city','postalcode','country')

class ProgramsTableAdmin(admin.ModelAdmin):
    list_display =('id','title','date','description','nbinscriptions','price','deadline','capacity','gallery')
    """def inscriptions_list(self, obj):
        return ", ".join([str(inscription.username) for inscription in obj.inscriptions.all()])"""

class ProgramsLocationsAdmin(admin.ModelAdmin):
    list_display = ('program','id','name','duration','datedebut','datefin','category','details','longitude','latitude')
    list_filter = ('program', 'category')
# Register your models here.

class InterestAdmin(admin.ModelAdmin):
    list_display = ('id','name')


admin.site.register(Tourist, TouristAdmin)
admin.site.register(TravelAgency, TravelAgencyAdmin)
admin.site.register(ProgramsTable, ProgramsTableAdmin)
admin.site.register(ProgramsLocations, ProgramsLocationsAdmin)
admin.site.register(Interest, InterestAdmin)

