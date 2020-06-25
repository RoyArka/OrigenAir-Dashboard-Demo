from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from django.contrib.auth import login, get_user_model
from django.views.generic.list import ListView
from django.views.generic.edit import UpdateView
from django.http import Http404
from . forms import PersonUpdateForm
from . models import Person
from . import forms
User = get_user_model()

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

    def get_queryset(self):
        try:
            self.other_user = User.objects.get(username__iexact=self.kwargs.get('username'))
        except User.DoesNotExist:
            raise Http404
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['other_user'] = self.other_user
        return context

class UserProfileUpdate(UpdateView):
    model = Person 
    form_class = PersonUpdateForm
    template_name = 'accounts/profile_update.html'
    def get_success_url(self):
        return reverse_lazy('accounts:profile', kwargs={'username': self.object.user.username})

    def get_object(self):
        return self.request.user.person