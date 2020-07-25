from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django import forms
from accounts.models import Person
from django.forms import ModelForm
import pytz
from django.forms.widgets import ClearableFileInput
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'inputUsername', 'placeholder': 'Username', 'autocomplete': 'off'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'id': 'inputPassword','placeholder':'Password'}))

class PersonCreateForm(UserCreationForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'inputFirstName', 'placeholder': 'First Name', 'autocomplete': 'off'}),label='')
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'inputLastName', 'placeholder': 'Last Name', 'autocomplete': 'off'}),label='')
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'inputUsername', 'placeholder': 'Username', 'autocomplete': 'off'}),label='')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'id': 'inputPassword', 'placeholder':'Password'}),label='')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'id': 'inputConfirmPassword', 'placeholder':'Confirm Password'}),label='')
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control', 'id': 'inputEmail', 'placeholder':'Email', 'autocomplete': 'off'}),label='')

    class Meta(UserCreationForm.Meta):
        model = get_user_model()

    def __init__(self, *args, **kwargs):
        super(PersonCreateForm, self).__init__(*args, **kwargs)

        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email is already in use")
        return self.cleaned_data.get('email')

    # def clean_username(self):
    #     username = self.cleaned_data.get('username')
    #     if User.objects.filter(username=username).exists():
    #         raise ValidationError("Username is already in use")
    #     return self.cleaned_data

    def save(self):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.email = self.cleaned_data.get('email')
        user.save()
        person = Person.objects.create(user=user)
        person.save()
        return user

from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm, PasswordChangeForm
class MyPasswordResetForm(PasswordResetForm):
    # email = forms.EmailField(label=_("Email"), max_length=254)
    # captcha = ReCaptchaField(widget=ReCaptchaV3)
    def __init__(self, *args, **kwargs):
        super(MyPasswordResetForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
            visible.field.widget.attrs['id'] = 'inputEmail'
            visible.field.widget.attrs['placeholder'] = 'Email Address'
            visible.field.widget.attrs['autocomplete'] = 'off'

class MySetPasswordForm(SetPasswordForm):

    def __init__(self, *args, **kwargs):
        super(MySetPasswordForm, self).__init__(*args, **kwargs)
        for i, visible in enumerate(self.visible_fields()):
            visible.field.widget.attrs['class'] = 'form-control'
            visible.field.widget.attrs['placeholder'] = 'New Password'
            visible.field.widget.attrs['autocomplete'] = 'off'
            visible.field.widget.attrs['id'] = 'inputNewPassword'
            if (i==1):
                visible.field.widget.attrs['placeholder'] = 'Confirm New Password'
                visible.field.widget.attrs['id'] = 'inputConfirmPassword'

class MyPasswordChangeForm(PasswordChangeForm):

    def __init__(self, *args, **kwargs):
        super(MyPasswordChangeForm, self).__init__(*args, **kwargs)
        for i, visible in enumerate(self.visible_fields()):
            visible.field.widget.attrs['class'] = 'form-control change-password-input'
            visible.field.widget.attrs['placeholder'] = 'Old Password'
            visible.field.widget.attrs['autocomplete'] = 'off'
            visible.field.widget.attrs['id'] = 'inputOldPassword'
            if (i==1):
                visible.field.widget.attrs['placeholder'] = 'New Password'
                visible.field.widget.attrs['id'] = 'inputNewPassword'
            if (i==2):
                visible.field.widget.attrs['placeholder'] = 'Confirm New Password'
                visible.field.widget.attrs['id'] = 'inputConfirmPassword'

class MyClearableFileInput(ClearableFileInput):
    initial_text = ''
    input_text = ''
    clear_checkbox_label = ''
    template_name = 'custom_clearable_file_input.html'

class PersonUpdateForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ('job_title', 'time_zone', 'phone_number', 'alerts', 'biography', 'avatar')

        widgets = {
            'job_title': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Job Title',
                                        'name': 'job-title-edit'}),
            'time_zone': forms.Select(choices=[(x, x) for x in pytz.common_timezones],
                                        attrs={'class': 'form-control',
                                        'placeholder': 'Time Zone',
                                        'name': 'time-zone-edit'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control',
                                        'placeholder': 'Phone Number',
                                        'name': 'phone-number-edit'}),
            'biography': forms.Textarea(attrs={'class': 'form-control',
                                            'rows': '5',
                                            'id': 'biography-edit',
                                            'input type': 'text',
                                            'placeholder': 'Biography',
                                            'name': 'biography-edit'}),
            'alerts': forms.CheckboxInput(attrs={'class': 'custom-control-input', 'id': 'subscribe_me', 'checked': ''}),
            'avatar': MyClearableFileInput()
        }