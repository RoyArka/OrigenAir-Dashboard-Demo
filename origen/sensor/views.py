from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from django.shortcuts import render, redirect
from . models import Sensor
from . import forms

# Create your views here.

class CreateSensor(CreateView):
    form_class = forms.SensorCreateForm
    template_name = 'sensor/sensor_create.html'
        
    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)

class SensorDetail(DetailView):
    model = Sensor
    template_name = 'sensor/' 

class UpdateSensor(UpdateView):
    model = Sensor
    form_class = forms.SensorUpdateForm
    template_name = 'sensor/sensor_update.html'

    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)