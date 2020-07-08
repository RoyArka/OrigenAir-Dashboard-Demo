from django.urls import path, include 
from . import views

from django.conf.urls.static import static
from django.conf import settings


app_name = 'sensor'
  
urlpatterns = [
    path('', views.SensorList.as_view(), name='all'),
    path('create/', views.CreateSensor.as_view(), name='create'),
    path('<slug>/', views.SensorDetail.as_view(), name='single'),
    path('<slug>/update/', views.UpdateSensor.as_view(), name='update'),
]