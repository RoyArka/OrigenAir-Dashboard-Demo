from django.db import models
from django.utils import timezone
from organization.models import Organization

# Create your models here.

class Sensor(models.Model):

    #Types of sensors 
    TYPES = (
        ('Temperature', 'Temperature'),
        ('Humidity', 'Humidity'),
        ('Solar Intensity', 'Solar Intensity'),
        ('2CO', '2CO'),
    )
    
    name = models.CharField(max_length=25, null=False, blank=False)
    organization = models.ForeignKey(Organization, related_name='sensor', null=True, blank=True, on_delete=models.CASCADE)
    sensor_type = models.CharField(max_length=100, choices=TYPES, default='None')

    def __str__(self):
        return self.name

class Record(models.Model):
    sensors = models.ForeignKey(Sensor, related_name='records', null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, null=False)
    values = models.DecimalField(max_digits=10, decimal_places=5)