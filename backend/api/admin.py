from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Contact,UploadedImage # Contact for contact us
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

# for 3rd-party data saving into db
from .models import (
    CountryData, EducationData, HealthData, EmploymentData, EnvironmentalData,
    EconomicData, SocialData, Currency, ExchangeRate, Trade
)

# Invisible password
class CustomUserCreationForm(UserCreationForm):
    password1 = forms.CharField(
        label='Password',
        widget=forms.PasswordInput
    )
    password2 = forms.CharField(
        label='Password confirmation',
        widget=forms.PasswordInput
    )

    class Meta:
        model = CustomUser
        fields = ('username','email')

class CustomUserChangeForm(UserChangeForm):
    password = forms.CharField(
        label='Password',
        widget=forms.PasswordInput,
        help_text="Leave blank if unchanged."
    )

    class Meta:
        model = CustomUser
        fields = ('username','email', 'password')

# admin register code

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email')

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email')

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('username', 'email', 'is_staff', 'is_active')
    list_filter = ('username', 'email', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username','email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('username', 'email')
    ordering = ('username', 'email')

admin.site.register(CustomUser, CustomUserAdmin)

# for contact us
admin.site.register(Contact)
admin.site.register(UploadedImage)

# for 3rd-party data saving into our db
admin.site.register(CountryData)
admin.site.register(EducationData)
admin.site.register(HealthData)
admin.site.register(EmploymentData)
admin.site.register(EnvironmentalData)
admin.site.register(EconomicData)
admin.site.register(SocialData)

# for exchange rates
admin.site.register(Currency)
admin.site.register(ExchangeRate)

# for coin-ems
admin.site.register(Trade)