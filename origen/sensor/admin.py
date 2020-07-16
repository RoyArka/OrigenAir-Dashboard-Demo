from django.contrib import admin
from sensor.models import Sensor, Record

# Register your models here.
admin.site.register(Sensor)
admin.site.register(Record)