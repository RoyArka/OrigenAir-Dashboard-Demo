from django.db import models
from django.contrib import auth
# Create your models here.


class Person(models.Model):
    user = models.OneToOneField(auth.models.User, on_delete=models.CASCADE, primary_key=True)
    # organization = models.ForeignKey()
    