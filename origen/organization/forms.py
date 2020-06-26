from django import forms
from organization.models import Organization
from django.forms import ModelForm

class OrganizationCreateForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ('organization', 'location', 'description', 'color')

        widgets = {
            'organization': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputOrganization',
                                        'placeholder': 'Organization Name',
                                        'name': 'Org-name'}),
            'location': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputLocation',
                                        'placeholder': 'Location',
                                        'name': 'location'}),
            'description': forms.Textarea(attrs={'class': 'form-control',
                                            'rows': '5',
                                            'id': 'inputDescription',
                                            'input type': 'text',
                                            'placeholder': 'Description',
                                            'name': 'description'}),
            'color': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputColor',
                                        'placeholder': 'Color',
                                        'name': 'color'}),
        }


class OrganizationUpdateForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ('organization', 'location', 'description')

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
            'color': forms.TextInput(attrs={'class': 'form-control', 
                                        'id': 'color-edit',
                                        'placeholder': 'Color',
                                        'name': 'color-edit'}),
        }