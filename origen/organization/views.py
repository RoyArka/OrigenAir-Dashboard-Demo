from django.shortcuts import render, redirect
from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from . import forms
from . models import Organization
from django.http import Http404 

# Create your views here.
class CreateOrg(CreateView):
    form_class = forms.OrganizationCreateForm
    template_name = 'organization/'

class OrgProfile(DetailView):

class OrgProfileMembers(ListView):

class OrgProfileUpdate(UpdateView):

class OrgList(ListView):

