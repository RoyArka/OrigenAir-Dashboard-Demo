from django.db import models
from django.contrib import auth
# Create your models here.

class Person(models.Model):

    import pytz
    pytz.all_timezones

    TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))

    user = models.OneToOneField(auth.models.User, on_delete=models.CASCADE, primary_key=True)
    # organization = models.ForeignKey()
    
    biography = models.TextField(null=True, blank=True)
    job_title = models.CharField(max_length=120, null= True, blank=True)
    alerts = models.BooleanField(default=True)
    time_zone = models.CharField(max_length=100, choices = TIMEZONES, default='PST')

    def __str__(self):
        return self.user