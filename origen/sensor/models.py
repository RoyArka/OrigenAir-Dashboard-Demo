from django.db import models
from django.utils import timezone
from organization.models import Organization
from accounts.models import Person
from django.utils.text import slugify
from django.urls import reverse
from django.utils.translation import gettext as _

# Create your models here.

class Sensor(models.Model):
    TEMPERATURE = 'temperature'
    HUMIDITY = 'humidity'
    VOC = 'voc'
    CO2 = 'co2'
    #Types of sensors 
    TYPES = [
        (TEMPERATURE, _('Temperature')),
        (HUMIDITY, _('Humidity')),
        (VOC, _('Volatile Organic Compound')),
        (CO2, _('Carbon Dioxide')),
    ]
    
    name = models.CharField(max_length=25, null=False, blank=False)
    organization = models.ForeignKey(Organization, related_name='sensors', null=True, blank=True, on_delete=models.CASCADE)
    sensor_type = models.CharField(max_length=100, choices=TYPES, default='None')
    threshold_min = models.CharField(max_length=100, default='0')
    threshold_max = models.CharField(max_length=100, default='100')
    
    def __str__(self):
        return self.name
    
    # error here foreignkey instance of org has no slug member
    # self.organization.slug

    def get_absolute_url(self):
        return reverse('sensor:single', kwargs={'slug': self.organization,'pk': self.pk})

class Record(models.Model):
    sensor = models.ForeignKey(Sensor, related_name='records', null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, null=False)
    values = models.DecimalField(max_digits=10, decimal_places=2)