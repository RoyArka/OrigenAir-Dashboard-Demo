from django.urls import path, include 
from . import views 

app_name = 'organization'

urlpatterns = [
    path('', views.OrgList.as_view(), name='all'),
    path('create/', views.CreateOrg.as_view(), name='create'),
    path('<name>/', views.OrgProfile.as_view(), name='single'),
    path('<name>/members/', views.OrgMembers.as_view(), name='members'),
    path('<name>/update/', views.OrgProfileUpdate.as_view(), name='update'),    
]
