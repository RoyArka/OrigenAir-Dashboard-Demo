from django.urls import path, include 
from . import views

app_name = 'organization'

urlpatterns = [
    path('', views.OrgList.as_view(), name='all'),
    path('create/', views.CreateOrg.as_view(), name='create'),
    path('<slug>/', views.OrgProfile.as_view(), name='single'),
    path('<slug>/members/', views.OrgMembers.as_view(), name='members'),
    path('<slug>/update/', views.OrgProfileUpdate.as_view(), name='update'),   
    path('<slug>/join/', views.JoinOrg.as_view(), name='join')
]
