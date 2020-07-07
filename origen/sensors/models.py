from django.db import models

class Sensors(models.Model):

    name = models.CharField(max_length=25, null=False, blank=False)