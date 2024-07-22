# validation will take place here
# signup and login
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Contact # for contact us
from api.models import UploadedImage # for stock img ai
from api.models import Contact
from api.models import CustomUser as User
# for data saving into database from 3rd-party
from .models import (
    CountryData, EducationData, HealthData, EmploymentData,
    EnvironmentalData, EconomicData, SocialData, Currency, ExchangeRate, Trade,
    UploadedFile, Stock
)

User = get_user_model()

# style parameter in password to hide password while typing
class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type':'password'}, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type':'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm') 
        #extra_kwargs={
        #    'password': {'write_only' : True}
        #}
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(style={'input_type':'password'}, required=True)

# contact us
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('first_name', 'last_name', 'email', 'phone', 'description')

    def validate_first_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("First name should not be greater than 100 letters.")
        return value

    def validate_last_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("Last name should not be greater than 100 letters.")
        return value

    def validate_email(self, value):
        if Contact.objects.email_exists(value):
            raise serializers.ValidationError("Email ID already used. Please use a different email.")
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number should be exactly 10 digits.")
        return value

    def validate_description(self, value):
        if len(value.split()) > 100:
            raise serializers.ValidationError("Description should not be more than 100 words.")
        return value
'''
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('first_name', 'last_name', 'email', 'phone', 'description')

    def validate_first_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("First name should not be greater than 100 letters.")
        return value

    def validate_last_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("Last name should not be greater than 100 letters.")
        return value

    def validate_email(self, value):
        # Check if the email has already been used for a contact message
        if Contact.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email ID already used. Please use a different email.")
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number should be exactly 10 digits.")
        return value

    def validate_description(self, value):
        if len(value.split()) > 100:
            raise serializers.ValidationError("Description should not be more than 100 words.")
        return value
'''

'''
# for contact us
# correct with less validation in email due to django and not code
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('first_name', 'last_name', 'email', 'phone', 'description')
# correct with less validation in email due to django and not code
'''
#User = get_user_model()
'''
# working correct but giving djongo and mongo db error due to validations in serializers.py
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('first_name', 'last_name', 'email', 'phone', 'description')

    def validate_first_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("First name should not be greater than 100 letters.")
        return value

    def validate_last_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("Last name should not be greater than 100 letters.")
        return value

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email ID not registered. Please register first.")
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number should be exactly 10 digits.")
        return value

    def validate_description(self, value):
        if len(value.split()) > 100:
            raise serializers.ValidationError("Description should not be more than 100 words.")
        return value
# working correct but giving djongo and mongo db error due to validations in serializers.py
'''
    
# for stock img ai
class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ['id', 'image', 'uploaded_at']
        '''
        def get_photo_url(self, obj):
            request=self.context.get('request')
            photo_url=obj.fingerprint.url
            return request.build_absolute_url(photo_url)
        '''

# for data saving into database from 3rd-party
class CountryDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryData
        fields = 'country', 'country_code', 'gdp', 'inflation', 'population', 'literacy_rate', 'updated_at'

class EducationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationData
        fields = 'country','country_code', 'literacy_rate', 'school_enrollment_primary', 'school_enrollment_secondary', 'education_expenditure', 'updated_at'

class HealthDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthData
        fields = 'country','country_code', 'life_expectancy', 'mortality_rate_under_5', 'health_expenditure', 'updated_at'

class EmploymentDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentData
        fields = 'country','country_code', 'unemployment_rate', 'labor_force_participation_rate', 'employment_agriculture', 'employment_industry', 'employment_services', 'updated_at'

class EnvironmentalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalData
        fields = 'country','country_code', 'co2_emissions', 'access_to_clean_water', 'renewable_energy_consumption', 'updated_at'

class EconomicDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicData
        fields = 'country','country_code', 'trade_balance', 'foreign_direct_investment', 'government_debt', 'updated_at'

class SocialDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialData
        fields = 'country','country_code', 'poverty_headcount_ratio', 'income_inequality_gini', 'social_protection_coverage', 'updated_at'

# for exchange rates
class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['code']

class ExchangeRateSerializer(serializers.ModelSerializer):
    base_currency_code = serializers.CharField(source='base_currency.code')
    target_currency_code = serializers.CharField(source='target_currency.code')

    class Meta:
        model = ExchangeRate
        fields = [
            'base_currency_code', 'target_currency_code', 'rate', 'date',
            'success', 'timestamp'
        ]

    def create(self, validated_data):
        base_currency_code = validated_data.pop('base_currency')['code']
        target_currency_code = validated_data.pop('target_currency')['code']

        base_currency, _ = Currency.objects.get_or_create(code=base_currency_code)
        target_currency, _ = Currency.objects.get_or_create(code=target_currency_code)

        return ExchangeRate.objects.create(base_currency=base_currency, target_currency=target_currency, **validated_data)

# for coin-ems
class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = 'symbol', 'price', 'size', 'taker_side', 'timestamp'

# for file-processing LLM
class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['file', 'uploaded_at']

# team1 API stock price for last 5 years
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'