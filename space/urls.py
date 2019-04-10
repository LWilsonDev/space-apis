from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('iss', views.space_station, name='space_station'),
    path('get_location', views.get_location, name='get_location'),
    path('apod', views.apod, name='apod'),
]
