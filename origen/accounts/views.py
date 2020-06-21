from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from django.contrib.auth import login
from django.views.generic.list import ListView
from django.views.generic.edit import UpdateView
from . forms import PersonModelForm
from . models import Person
from . import forms

# Create your views here.
class SignUp(CreateView):
    form_class = forms.PersonCreateForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'

    def form_valid(self, form):
        user = form.save()
        login(self.request, user, backend='django.contrib.auth.backends.ModelBackend')
        return redirect('home')

class Login(LoginView):
    form_class = forms.LoginForm
    template_name = 'accounts/login.html'

class UserProfile(ListView):
    model = Person
    template_name = 'accounts/profile.html' 

class UserProfileUpdate(UpdateView):
    model = Person 
    form_class = PersonModelForm
    template_name = 'accounts/profile_update.html'
    success_url = '/accounts/profile'

    def get_object(self):
        return self.request.user
    


