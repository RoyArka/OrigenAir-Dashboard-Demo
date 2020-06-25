from django.urls import path, include 
from . import views 

app_name = 'organization'

urlpatterns = [
    path('organization_create/', views.CreateOrg.as_view(), name='create_org'),

]