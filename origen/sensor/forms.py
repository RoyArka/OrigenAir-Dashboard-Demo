from django import forms
from sensor.models import Sensor
from django.forms import ModelForm

class SensorCreateForm(forms.ModelForm):
    
    class Meta:
        model = Sensor
        fields = ('name',)

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'inputSensorName',
                                        'placeholder': 'Sensor Name',
                                        'name': 'sensor-name'}),
            # 'sensor_type': forms.TextInput(attrs={'class': 'form-control',
            #                             'id': 'inputType',
            #                             'placeholder': 'Sensor Type',
            #                             'name': 'sensor-type'}),
        }

    def __init__(self, *args, **kwargs):
        super(SensorCreateForm, self).__init__(*args, **kwargs)

class SensorUpdateForm(forms.ModelForm):
    
    class Meta:
        model = Sensor
        fields = ('name', )

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control',
                                        'id': 'SensorName-edit',
                                        'placeholder': 'Sensor Name',
                                        'name': 'sensor-name-edit'}),
            # 'sensor_type': forms.TextInput(attrs={'class': 'form-control',
            #                             'id': 'Type-edit',
            #                             'placeholder': 'Sensor Type',
            #                             'name': 'sensor-type-edit'}),
        }