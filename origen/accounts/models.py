from django.db import models
from django.contrib import auth
from django.contrib.auth.models import User 
# Create your models here.

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
    
    # last_name = models.CharField(max_length=32)
    
    # USED for profile images will need to pip install pillow for later
    # profile_image = models.ImageField(default='', blank=True, null='')

    def __unicode__(self):
        return self.user

    def __str__(self):
        return self.user.username

    # def get_biography(self):
    #     return self.person.biography

    # def get_email(self):
    #     return self.user.email

    # def get_job_title(self):
    #     return self.job_title

    # def get_last_name(self):
    #     return self.user.last_name

    # def get_organization(self):
    #     return self.organization

    # def get_phone(self):
    #     return self.phone_number
    
    # def get_time_zone(self):
    #     return self.person.time_zone