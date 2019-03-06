from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('space_station', views.space_station, name='space_station' ),

    path('get_location', views.get_location, name='get_location'),
]
