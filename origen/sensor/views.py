from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.urls import reverse
from . models import Sensor
from . import forms
from django.shortcuts import get_object_or_404
from organization.models import Organization

# Create your views here.

class CreateSensor(CreateView):
    form_class = forms.SensorCreateForm
    template_name = 'sensor/sensor_create.html'
    
    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.organization = self.request.user.person.organization
        self.object.save()
        return super().form_valid(form)
    
    def get_success_url(self):
        return reverse_lazy('sensor:single', kwargs={'slug': self.object.organization.slug, 'pk': self.object.pk})
        
class SensorDetail(DetailView):
    model = Sensor
    template_name = 'sensor/sensor_detail.html'

class UpdateSensor(UpdateView):
    model = Sensor
    form_class = forms.SensorUpdateForm
    template_name = 'sensor/sensor_update.html'

    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)

class SensorList(ListView):
    model = Sensor
    template_name = 'sensor/sensor_list.html'