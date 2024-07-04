from django.contrib.auth.models import AbstractUser # for signup and login
from django.db import models # for contactus

# Additional custom fields will go here. 
# Uncomment the: AUTH_USER_MODEL = 'yourapp.CustomUser' in settings.py
# register in the admin.py
# makemigartions and then migrate

class CustomUser(AbstractUser):
    pass

# contact us models

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    description = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# for stock image ai
class UploadedImage(models.Model):
    image = models.ImageField(upload_to='images')
    uploaded_at = models.DateTimeField(auto_now_add=True)


# Models for saving third-party fetch data
class CountryData(models.Model):
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3, default='DDD')  # Default value added
    gdp = models.FloatField(null=True, blank=True)
    inflation = models.FloatField(null=True, blank=True)
    population = models.BigIntegerField(null=True, blank=True)
    literacy_rate = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.country

class EducationData(models.Model):
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3, default='DDD')  # Default value added
    literacy_rate = models.FloatField(null=True, blank=True)
    school_enrollment_primary = models.FloatField(null=True, blank=True)
    school_enrollment_secondary = models.FloatField(null=True, blank=True)
    education_expenditure = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.country

class HealthData(models.Model):
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3, default='DDD')  # Default value added
    life_expectancy = models.FloatField(null=True, blank=True)
    mortality_rate_under_5 = models.FloatField(null=True, blank=True)
    health_expenditure = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.country

class EmploymentData(models.Model):
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3, default='DDD')  # Default value added
    unemployment_rate = models.FloatField(null=True, blank=True)
    labor_force_participation_rate = models.FloatField(null=True, blank=True)
    employment_agriculture = models.FloatField(null=True, blank=True)
    employment_industry = models.FloatField(null=True, blank=True)
    employment_services = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.country

class EnvironmentalData(models.Model):
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3, default='DDD')  # Default value added
    co2_emissions = models.FloatField(null=True, blank=True)
    access_to_clean_water = models.FloatField(null=True, blank=True) 
    renewable_energy_consumption = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.country

class EconomicData(models.Model):
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3, default='DDD')  # Default value added
    trade_balance = models.FloatField(null=True, blank=True)
    foreign_direct_investment = models.FloatField(null=True, blank=True)
    government_debt = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.country

class SocialData(models.Model):
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=3, default='DDD')  # Default value added
    poverty_headcount_ratio = models.FloatField(null=True, blank=True)
    income_inequality_gini = models.FloatField(null=True, blank=True)
    social_protection_coverage = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.country
    
# models for exchange rates
class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True)

    def __str__(self):
        return self.code

class ExchangeRate(models.Model):
    base_currency = models.ForeignKey(Currency, related_name='base_currency', on_delete=models.CASCADE)
    target_currency = models.ForeignKey(Currency, related_name='target_currency', on_delete=models.CASCADE)
    rate = models.DecimalField(max_digits=20, decimal_places=10)
    date = models.DateField()
    success = models.BooleanField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"{self.base_currency} to {self.target_currency} rate on {self.date}"
    
