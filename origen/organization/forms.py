from django import forms
from organization.models import Organization
from django.forms import ModelForm

class OrganizationCreateForm(forms.ModelForm):

    class Meta:
        model = Organization
        fields = ('name', 'email', 'phone', 'website', 'street_name', 'street_number', 'city', 'country', 'description', 'color')

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
            'website': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputWebsite',
                                        'placeholder': 'Website',
                                        'name': 'Org-Website'}),            
            'street_name': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputStreetName',
                                        'placeholder': 'Street Name',
                                        'name': 'street-name'}),
            'street_number': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputStreetNumber',
                                        'placeholder': 'Street Number',
                                        'name': 'street-number'}),
            'city': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputCity',
                                        'placeholder': 'City',
                                        'name': 'city'}),
            'country': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputCountry',
                                        'placeholder': 'Country',
                                        'name': 'country'}),
            'description': forms.Textarea(attrs={'class': 'form-control abouttextbox',
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
        fields = ('name', 'email', 'phone', 'website', 'street_name', 'street_number', 'city', 'country', 'description', 'color')
        
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Organization Name',
                                        'name': 'Org-edit'}),
            'email': forms.EmailInput(attrs={'class': 'form-control',
                                        'placeholder': 'Contact Email',
                                        'name': 'Org-email-edit',
                                        'required': False}),
            'phone': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Phone Number',
                                        'name': 'Org-phone-edit'}),
            'website': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Website',
                                        'name': 'Org-Website-edit'}),
            'street_name': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputStreetName',
                                        'placeholder': 'Street Name',
                                        'name': 'street-name-edit'}),
            'street_number': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputStreetNumber',
                                        'placeholder': 'Street Number',
                                        'name': 'street-number-edit'}),
            'city': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputCity',
                                        'placeholder': 'City',
                                        'name': 'city-edit'}),
            'country': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputCountry',
                                        'placeholder': 'Country',
                                        'name': 'country-edit'}),
            'description': forms.Textarea(attrs={'class': 'form-control abouttextbox',
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