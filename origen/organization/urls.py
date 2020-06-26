from django.urls import path, include 
from django.contrib.auth import views as auth_views
from . import views 

app_name = 'organization'

urlpatterns = [
    path('organization_create/', views.CreateOrg.as_view(), name='create_org'),
    # path('<organization>/', views.OrgProfile.as_view(), name='org_profile'),
    path('organization_members/', views.OrgMembers.as_view(), name='org_members'),
    path('update/', views.OrgProfileUpdate.as_view(), name='org_update'),
    path('organization_list/', views.OrgList.as_view(), name='org_list'),

]