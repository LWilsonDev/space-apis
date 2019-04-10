from django import forms
from django.core.exceptions import ValidationError
from datetime import date
from django.forms import widgets


#class DateForm(forms.Form):
#    date = forms.DateField(required = True, help_text="Please use the following format: <em>YYYY-MM-DD</em>.",
#                            widget=forms.widgets.DateInput(format="%Y/%m/%d"))



class DateForm(forms.Form):
    date = forms.DateTimeField(input_formats=['%Y-%m-%d'])
