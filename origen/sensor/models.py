from django.db import models
from django.utils import timezone
from organization.models import Organization
from django.utils.text import slugify
from django.urls import reverse

# Create your models here.

class Sensor(models.Model):

    #Types of sensors 
    # TYPES = (
    #     ('Temperature', 'Temperature'),
    #     ('Humidity', 'Humidity'),
    #     ('Solar Intensity', 'Solar Intensity'),
    #     ('2CO', '2CO'),
    # )
    
    name = models.CharField(max_length=25, null=False, blank=False)
    # organization = models.ForeignKey(Organization, related_name='sensor', null=True, blank=True, on_delete=models.CASCADE)
    # sensor_type = models.CharField(max_length=100, choices=TYPES, default='None')
    slug = models.SlugField(allow_unicode=True, unique=True)
    
    def __str__(self):
        return self.name
    
    def save(self,*args,**kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse("sensor:single", kwargs={"slug": self.slug})

class Record(models.Model):
    sensor = models.ForeignKey(Sensor, related_name='records', null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, null=False)
    values = models.DecimalField(max_digits=10, decimal_places=5)