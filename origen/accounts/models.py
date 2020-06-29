from django.db import models
from django.contrib import auth
from django.contrib.auth.models import User 
# Create your models here.

def user_directory_path(instance, filename):
    return 'person/avatars/{0}/{1}'.format(instance.user.username, filename)

class Person(models.Model):

    import pytz
    pytz.all_timezones

    TIMEZONES = tuple(zip(pytz.common_timezones, pytz.common_timezones))

    user = models.OneToOneField(auth.models.User, on_delete=models.CASCADE, primary_key=True)
    # organization = models.ForeignKey()
    
    alerts = models.BooleanField(default=True)
    biography = models.TextField(default='', null=True, blank=True)
    job_title = models.CharField(max_length=100, null=True, blank=True)
    organization = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=100, null=True, blank=True)
    time_zone = models.CharField(max_length=100, choices = TIMEZONES, default='America/Vancouver')
    avatar = models.ImageField(upload_to=user_directory_path, default='person/avatars/default.png', null=True, blank=True)

    # last_name = models.CharField(max_length=32)
    
    
    def __unicode__(self):
        return self.user

    def __str__(self):
        return self.user.username

