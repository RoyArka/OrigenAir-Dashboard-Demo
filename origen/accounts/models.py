from django.db import models
from django.contrib import auth
from django.contrib.auth.models import User 
from organization.models import Organization
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

def user_directory_path(instance, filename):
    return 'person/avatars/{0}/{1}'.format(instance.user.username, filename)

class Person(models.Model):

    import pytz

    TIMEZONES = tuple(zip(pytz.common_timezones, pytz.common_timezones))

    user = models.OneToOneField(auth.models.User, on_delete=models.CASCADE, primary_key=True)
    
    alerts = models.BooleanField(default=True)
    avatar = models.ImageField(upload_to=user_directory_path, default='person/avatars/default.png', null=True, blank=True)
    biography = models.TextField(max_length=180, default='', null=True, blank=True)
    job_title = models.CharField(max_length=20, null=True, blank=True)
    organization = models.ForeignKey(Organization, related_name='persons', null=True, blank=True, on_delete=models.SET_NULL)
    phone_number = PhoneNumberField(default='+12125552368')
    time_zone = models.CharField(max_length=100, choices = TIMEZONES, default='America/Vancouver')
    
    def __unicode__(self):
        return self.user

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)