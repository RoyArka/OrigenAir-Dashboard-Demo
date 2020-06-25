from django.db import models
from django.contrib import auth 


# Create your models here.
class Organization(models.Model):

    organization = models.CharField(max_length=100, null= True, blank=True)
    location = models.CharField(max_length=100, null= True, blank=True)
    description = models.TextField(default='', null=True, blank=True)
    

