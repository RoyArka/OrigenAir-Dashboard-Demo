from django.shortcuts import render, redirect
from django.views.generic import CreateView 
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView 
from django.views.generic.detail import DetailView 
from . forms import OrganizationUpdateForm
from . import forms
from . models import Organization
from django.http import Http404 

# Create your views here.
class CreateOrg(CreateView):
    form_class = forms.OrganizationCreateForm
    template_name = 'organization/organization_create.html'

    def form_valid(self, form):
        form.save()
        return super(CreateOrg, self).form_valid(form)

class OrgProfile(DetailView):
    model = Organization
    template_name = 'organization/organization_profile.html'

    def get_queryset(self):
        try:
            self.other_org = Organization.objects.get(slug__iexact=self.kwargs.get('name'))
        except Organization.DoesNotExist:
            raise Http404

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['other_org'] = self.other_org
        return context 

class OrgMembers(ListView):
    model = Organization
    template_name = 'organization/organization_members.html'

class OrgProfileUpdate(UpdateView):
    model = Organization
    form_class = OrganizationUpdateForm
    template_name = 'organization/organization_update.html'

class OrgList(ListView): 
    model = Organization
    template_name = 'organization/organization_list.html'

    def queryset(self):
        return Organization.objects.all()
        