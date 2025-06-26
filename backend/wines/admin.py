from django.contrib import admin
from .models import Wine

# Register your models here.
admin.site.site_header = "Virak's Wine Admin"
admin.site.site_title = "Virak's Wine Admin Portal"
admin.site.index_title = "Welcome to Virak's Wine Management"

admin.site.register(Wine)