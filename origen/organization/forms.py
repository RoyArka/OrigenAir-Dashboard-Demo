from django import forms
from organization.models import Organization
from django.forms import ModelForm

class OrganizationCreateForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ('name', 'email', 'phone', 'location', 'description', 'color')

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputName',
                                        'placeholder': 'Organization Name',
                                        'name': 'Org-name'}),
            'email': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputEmail',
                                        'placeholder': 'Contact Email',
                                        'name': 'Org-email'}),
            'phone': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputPhone',
                                        'placeholder': 'Phone Number',
                                        'name': 'Org-phone'}),
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

    def __init__(self, *args, **kwargs):
        super(OrganizationCreateForm, self).__init__(*args, **kwargs)
        

class OrganizationUpdateForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ('name', 'email', 'location', 'description')

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control',
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