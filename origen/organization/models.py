from django.db import models

# Create your models here.
class Organization(models.Model):

    organization = models.CharField(max_length=100, null= True, blank=True)
    location = models.CharField(max_length=100, null= True, blank=True)
    description = models.TextField(default='', null=True, blank=True)
    color = models.CharField(max_length=7)
    field_name = models.SlugField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return self.organization
