# Generated by Django 3.0.6 on 2020-07-27 22:49

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0041_auto_20200726_1505'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, default='+12125552368', max_length=128, null=True, region=None),
        ),
    ]