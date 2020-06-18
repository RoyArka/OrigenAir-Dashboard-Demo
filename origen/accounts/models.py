from django.db import models
from django.contrib import auth
# Create your models here.

class Person(models.Model):
    user = models.OneToOneField(auth.models.User, on_delete=models.CASCADE, primary_key=True)
    # organization = models.ForeignKey()
    
    biography = models.TextField(blank=True)
    position = models.CharField(max_length=120, blank=True)
    alert = models.BooleanField(default=True)

    def __str__(self):
        return self.user