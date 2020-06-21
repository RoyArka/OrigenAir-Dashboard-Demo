from django.db import models
from django.contrib import auth
from django.contrib.auth.models import User 
# Create your models here.

class Person(models.Model):

    import pytz
    pytz.all_timezones

    TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))

    user = models.OneToOneField(auth.models.User, on_delete=models.CASCADE, primary_key=True)
    # organization = models.ForeignKey()
    
    biography = models.TextField(default='', null=True, blank=True)
    job_title = models.CharField(max_length=120, null= True, blank=True)
    alerts = models.BooleanField(default=True)
    time_zone = models.CharField(max_length=100, choices = TIMEZONES, default='PST')
    
    # USED for profile images will need to pip install pillow for later
    # profile_image = models.ImageField(default='', blank=True, null='')

    def __unicode__(self):
        return self.user