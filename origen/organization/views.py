from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from . forms import OrganizationUpdateForm
from . import forms
from . models import Organization
from django.http import Http404 
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic
from django.urls import reverse
from django.shortcuts import get_object_or_404

# Create your views here.
class CreateOrg(LoginRequiredMixin, CreateView):
    form_class = forms.OrganizationCreateForm
    template_name = 'organization/organization_create.html'

    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)
        
class OrgProfile(DetailView):
    model = Organization
    template_name = 'organization/organization_profile.html'

class OrgMembers(DetailView):
    model = Organization
    template_name = 'organization/organization_members.html'

class OrgProfileUpdate(LoginRequiredMixin, UpdateView):
    model = Organization
    form_class = OrganizationUpdateForm
    template_name = 'organization/organization_update.html'

class OrgList(ListView): 
    model = Organization
    template_name = 'organization/organization_list.html'

class JoinOrg(LoginRequiredMixin, generic.RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        return reverse('organization:single', kwargs={'slug':self.kwargs.get('slug')})

    def get(self, request, *args, **kwargs):
        organization = get_object_or_404(Organization, slug=self.kwargs.get('slug'))
        return super().get(request, *args, **kwargs)