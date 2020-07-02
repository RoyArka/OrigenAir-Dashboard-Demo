from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.urls import reverse
from colorful.fields import RGBColorField

# Create your models here.
class Organization(models.Model):

    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null= True, blank=True)
    website = models.URLField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=12, null=True, blank=True)
    description = models.TextField(max_length=255, default='', null=True, blank=True)
    # color = models.CharField(max_length=7, default='#1B9A4B')
    color = RGBColorField()
    slug = models.SlugField(allow_unicode=True, unique=True)
    created_at = models.DateTimeField(default=timezone.now, null=False)
   
    def __str__(self):
        return self.name

    def save(self,*args,**kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("organization:single", kwargs={"slug": self.slug})