from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from organization.models import Organization
from django.forms import ModelForm


class OrganizationCreateForm(UserCreationForm):
    organization = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'inputOrg', 'placeholder': 'Organization Name', 'autocomplete': 'off'}), label='')
    location = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'inputUsername', 'placeholder': 'Username', 'autocomplete': 'off'}), label='')
    description = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': '5', 'input type': 'text', 'placeholder': 'Description', 'autocomplete': 'off'}), label='')
    
class OrganizationUpdateForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ('organization', 'description', 'location')

        widgets = {
            'organization': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Organization Name',
                                        'name': 'Org-edit'}),
            'location': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Location',
                                        'name': 'location-edit'}),
            'description': forms.Textarea(attrs={'class': 'form-control',
                                            'rows': '5',
                                            'id': 'description-edit',
                                            'input type': 'text',
                                            'placeholder': 'Description',
                                            'name': 'description-edit'}),
        }