from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from . forms import OrganizationUpdateForm
from . import forms
from . models import Organization
from accounts.models import Person
from django.http import Http404 
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views import generic
from django.urls import reverse
from django.shortcuts import get_object_or_404

class OrgAdminRequiredMixin(UserPassesTestMixin, LoginRequiredMixin):
    def test_func(self):
        self.object = self.get_object()
        return self.request.user == self.object.admin

# Create your views here.
class CreateOrg(LoginRequiredMixin, CreateView): 
    form_class = forms.OrganizationCreateForm
    template_name = 'organization/organization_create.html'

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.admin = self.request.user
        self.object.save()
        return super().form_valid(form)
     
class OrgProfile(DetailView):
    model = Organization
    template_name = 'organization/organization_profile.html'

class OrgMembers(DetailView):
    model = Organization
    template_name = 'organization/organization_members.html'

class OrgProfileUpdate(OrgAdminRequiredMixin, UpdateView):
    model = Organization
    form_class = OrganizationUpdateForm
    template_name = 'organization/organization_update.html'

    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('organization:single', kwargs={'slug': self.kwargs.get('slug')})

class OrgList(ListView): 
    model = Organization
    template_name = 'organization/organization_list.html'

class JoinOrg(LoginRequiredMixin, generic.RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        return reverse('organization:single', kwargs={'slug':self.kwargs.get('slug')})

    def get(self, request, *args, **kwargs):
        organization = get_object_or_404(Organization, slug=self.kwargs.get('slug'))
        if (self.request.user.person.organization):
            print("You're already in an organization!")
        else:
            self.request.user.person.organization = organization
            self.request.user.person.save()
        return super().get(request, *args, **kwargs)

class LeaveOrg(LoginRequiredMixin, generic.RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        return reverse('organization:single', kwargs={'slug':self.kwargs.get('slug')})
    
    def get(self, request, *args, **kwargs):
        organization = get_object_or_404(Organization, slug=self.kwargs.get('slug'))

        if (self.request.user.person.organization == organization):
            self.request.user.person.organization = None
            self.request.user.person.save()
        else:
            print("You're not a member of this organization!")
        return super().get(request, *args, **kwargs)

