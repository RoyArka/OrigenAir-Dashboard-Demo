from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from django.contrib.auth import login
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

