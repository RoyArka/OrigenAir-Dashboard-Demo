from django import forms
from organization.models import Organization
from django.forms import ModelForm
from django.core.exceptions import ValidationError
from django.forms.widgets import ClearableFileInput

class MyClearableFileInput(ClearableFileInput):
    initial_text = ''
    input_text = ''
    clear_checkbox_label = ''
    template_name = 'custom_clearable_file_input.html'


class OrganizationCreateForm(forms.ModelForm):

    class Meta:
        model = Organization
        fields = ('name', 'email', 'phone', 'website', 'street_name', 'street_number', 'city', 'country', 'description', 'color', 'logo')

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputName',
                                        'placeholder': 'Organization',
                                        'name': 'Org-name'}),
            'email': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputEmail',
                                        'placeholder': 'Contact Email',
                                        'name': 'Org-email',}),
            'phone': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputPhone',
                                        'placeholder': 'Phone Number',
                                        'name': 'Org-phone',
                                        'required': False}),
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
            'logo': MyClearableFileInput(),
        }

    def __init__(self, *args, **kwargs):
        super(OrganizationCreateForm, self).__init__(*args, **kwargs)
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if Organization.objects.filter(name=name).exists():
            raise ValidationError("Organization name is already in use")
        return self.cleaned_data.get('name')
    
class OrganizationUpdateForm(forms.ModelForm):
    
    class Meta:
        model = Organization
        fields = ('email', 'phone', 'website', 'street_name', 'street_number', 'city', 'country', 'description', 'color', 'logo')
        
        widgets = {
            'email': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Contact Email',
                                        'name': 'Org-email-edit',
                                        'required': False}),
            'phone': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Phone Number',
                                        'name': 'phone-number-edit',
                                        'required': False}),
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
            'logo': MyClearableFileInput(),
        }