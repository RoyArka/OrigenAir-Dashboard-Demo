from django.urls import path, include 
from . import views

from django.conf.urls.static import static
from django.conf import settings


app_name = 'sensor'
  
urlpatterns = [
    path('for/<slug>/', views.SensorList.as_view(), name='all'),
    path('for/<slug>/create/', views.CreateSensor.as_view(), name='create'),
    path('for/<slug>/<pk>', views.SensorDetail.as_view(), name='single'),
    path('for/<slug>/<pk>/update/', views.UpdateSensor.as_view(), name='update'),
]