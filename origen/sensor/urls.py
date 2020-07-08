from django.urls import path, include 
from . import views

from django.conf.urls.static import static
from django.conf import settings


app_name = 'sensor'

urlpatterns = [
    path('create/', views.CreateSensor.as_view(), name='create'),
    path('detail/', views.SensorDetail.as_view(), name='single'),
    path('update/', views.UpdateSensor.as_view(), name='update'),
    # path('', views..as_view(), name='all'),
]