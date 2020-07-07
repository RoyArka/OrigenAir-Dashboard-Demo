from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from django.shortcuts import render, redirect
from . models import Sensors
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.

class CreateSensor(LoginRequiredMixin, ListView):
    template_name = 'sensors/sensors_create.html'
    model = Sensors
    
class SensorDetail(DetailView):
    template_name = 'sensors/' 

class UpdateSensor(UpdateView):
    template_name = 'sensors/sensors_update.html'