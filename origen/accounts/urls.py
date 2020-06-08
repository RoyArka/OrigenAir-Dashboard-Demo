from django.urls import path,include
from django.contrib.auth import views as auth_views
from . import views
from .views import get_data
# url immport added for testing json data
from django.conf.urls import url

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('login/', views.Login.as_view(), name='login'),
    # url added for testing json data
    url(r'^api/data/$', get_data, name='api-data')
]
