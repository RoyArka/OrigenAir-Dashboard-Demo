from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from .forms import MyPasswordResetForm, MySetPasswordForm, MyPasswordChangeForm

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.SignUp.as_view(), name='signup'),
<<<<<<< HEAD
]
=======
    path('login/', views.Login.as_view(redirect_authenticated_user=True), name='login'),
    path('logout/',auth_views.LogoutView.as_view(),name='logout'),
    path('password_reset/', auth_views.PasswordResetView.as_view(from_email='forgot-password@origenair.com', form_class=MyPasswordResetForm), name='password_reset'), 
    # TODO: Above email account needs to be created, and email details must be included in Settings.py
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(form_class=MySetPasswordForm), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('password_change/', auth_views.PasswordChangeView.as_view(form_class=MyPasswordChangeForm), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(), name='password_change_done'),
    path('profile/<username>', views.UserProfile.as_view(), name='profile'),
    path('profile/update/', views.UserProfileUpdate.as_view(), name='profile_update'), 
]
>>>>>>> development
