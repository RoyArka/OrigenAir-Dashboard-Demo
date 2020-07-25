from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from django.views.generic.edit import DeleteView
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.urls import reverse
from . models import Sensor, Record
from . import forms
from django.shortcuts import get_object_or_404
from organization.models import Organization
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
import datetime
from django.http import Http404

#Create your views here.

class SensorAdminRequiredMixin(UserPassesTestMixin, LoginRequiredMixin):
    def test_func(self):
        full_path = self.request.get_full_path()
        split_full_path = full_path.split("/")
        org_slug = split_full_path[3]
        org = Organization.objects.get(slug=org_slug)
        return self.request.user == org.admin
    
class CreateSensor(SensorAdminRequiredMixin, CreateView):
    model = Sensor
    form_class = forms.SensorCreateForm
    template_name = 'sensor/sensor_create.html'

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.organization = self.request.user.person.organization
        self.object.save()
        return super().form_valid(form)
    
    def get_success_url(self):
        return reverse_lazy('sensor:single', kwargs={'slug': self.object.organization.slug, 'pk': self.object.pk})
        
class SensorDetail(LoginRequiredMixin, DetailView):
    model = Sensor
    template_name = 'sensor/sensor_detail.html'

class UpdateSensor(SensorAdminRequiredMixin, UpdateView):
    model = Sensor
    form_class = forms.SensorUpdateForm
    template_name = 'sensor/sensor_update.html'

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.organization = self.request.user.person.organization
        self.object.save()
        return super().form_valid(form)
    
    def get_success_url(self):
        return reverse_lazy('sensor:single', kwargs={'slug': self.object.organization.slug, 'pk': self.object.pk})

class SensorList(LoginRequiredMixin, ListView):
    model = Sensor
    template_name = 'sensor/sensor_list.html'

class DeleteSensor(SensorAdminRequiredMixin, DeleteView):
    model = Sensor
    template_name = 'sensor/sensor_delete.html'
     
    def get_success_url(self):
        return reverse_lazy('sensor:all', kwargs={'slug': self.object.organization.slug})


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

class SensorDetailAPI(APIView):
    # authentication_classes = (authentication.SessionAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        return (get_object_or_404(Sensor, pk=pk))


    def get(self, request, *args, **kwargs):
        sensor = self.get_object(self.kwargs.get('pk'))

        data = {
            "name": sensor.name,
            "organization": sensor.organization.name,
            "type": sensor.sensor_type,
            "value": sensor.value,
            "min": sensor.threshold_min,
            "max": sensor.threshold_max,
        
        }
        return Response(data)

    
    def put(self, request, *args, **kwargs):
        sensor = self.get_object(self.kwargs.get('pk'))


        value = request.data['value']
        sensor.value = value
        sensor.save()

        data = {
            "name": sensor.name,
            "value": sensor.value,
            "updated": "True"
        }

        return Response(data)

class RecordTimeAPI(APIView):

    def get_object(self, pk):
        return (get_object_or_404(Sensor, pk=pk))

    def get(self, request, *args, **kwargs):
        sensor = self.get_object(self.kwargs.get('pk'))
        offset = int(self.kwargs.get('offset'))
        time = self.kwargs.get('time')

        if (time=="days"):
            start_time = datetime.datetime.utcnow() - datetime.timedelta(days=offset)
            end_time = start_time + datetime.timedelta(days=1)
        elif(time=="hours"):
            start_time = datetime.datetime.utcnow() - datetime.timedelta(hours=offset)
            end_time = start_time + datetime.timedelta(hours=1)
        else:
            raise Http404

        records = Record.objects.filter(sensor__id=sensor.id, created_at__range=(start_time, end_time))

        data = {
            
        }

        for record in records:
            data[record.pk] = {
                "created_at": record.created_at,
                "value": record.value,
            }
            
        return Response(data)


class SensorListAPI(APIView):

    def get_object(self, slug):
        organization = get_object_or_404(Organization, slug=slug)
        return Sensor.objects.filter(organization=organization)


    def get(self, request, *args, **kwargs):
        sensors = self.get_object(self.kwargs.get('slug'))

        data = {}
        
        for sensor in sensors:
            data[sensor.pk] = {
                "name": sensor.name,
                "organization": sensor.organization.name,
                "type": sensor.sensor_type,
                "value": sensor.value,
            }
            
        return Response(data)