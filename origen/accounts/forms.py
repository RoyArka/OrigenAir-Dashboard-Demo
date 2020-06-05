from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django import Forms

class PersonCreateForm(UserCreationForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control','placeholder': 'First Name', 'autocomplete': 'off'}),label='')
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control','placeholder': 'Last Name', 'autocomplete': 'off'}),label='')
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control','placeholder': 'Username', 'autocomplete': 'off'}),label='')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control','placeholder':'Password'}),label='')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control','placeholder':'Confirm Password'}),label='')
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control','placeholder':'Email', 'autocomplete': 'off'}),label='')

    class Meta(UserCreationForm.Meta):
        model = get_user_model()

    def __init__(self, *args, **kwargs):
        super(PersonCreateForm, self).__init__(*args, **kwargs)

        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None
    
    def save(self):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.email = self.cleaned_data.get('email')
        user.save()
        person = Person.objects.create(user=user)
        person.save()
        return user