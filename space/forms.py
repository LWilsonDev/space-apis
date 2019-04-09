from django import forms


class DateForm(forms.Form):
    date = forms.DateField(help_text="Please use the following format: <em>YYYY-MM-DD</em>.")
