# signup and login
from rest_framework import generics, status, views
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import login
#from .serializers import UserSignupSerializer, UserLoginSerializer

# contact us
#from .serializers import ContactSerializer
#from .models import Contact
from api.models import Contact, CustomUser
from django.core.exceptions import ValidationError
from api.models import CustomUser as User
#from django.contrib.auth.models import User
# for stock img ai
#from rest_framework import status, views
#from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from api.models import UploadedImage
from api.serializers import UploadedImageSerializer
from .ai import analyze_graph_sections  
from . import ai
from PIL import Image
import openai
#import os
#import cv2
from rest_framework.views import APIView

# for saving 3rd-party data into our database
import requests
#from django.shortcuts import render
from rest_framework.decorators import api_view
#from rest_framework.response import Response
from .models import (
    CountryData, EducationData, HealthData, EmploymentData,
    EnvironmentalData, EconomicData, SocialData, Currency, ExchangeRate, Contact,
    Trade, UploadedFile, Stock
)
from .serializers import (
    CountryDataSerializer, EducationDataSerializer, HealthDataSerializer,
    EmploymentDataSerializer, EnvironmentalDataSerializer, EconomicDataSerializer,
    SocialDataSerializer, ExchangeRateSerializer, CurrencySerializer, ContactSerializer,
    UserSignupSerializer, UserLoginSerializer, TradeSerializer, UploadedFileSerializer,
    StockSerializer
)

# for exchange rates
from django.shortcuts import render, get_object_or_404
#from rest_framework.decorators import api_view
#from rest_framework.response import Response
#from rest_framework import status
#import requests
#from .models import Currency, ExchangeRate
#from .serializers import ExchangeRateSerializer, CurrencySerializer
from datetime import datetime
from decimal import Decimal, InvalidOperation

# team1 last 5 years stock price
import yfinance as yf
import pandas as pd
import os

# for alphavantage core stock api
from django.http import JsonResponse


# Data from the UI will be received here
class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": {
                "username": user.username,
                "email": user.email
            },
            #"token": token.key
        }, status=status.HTTP_201_CREATED)
class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        if user is not None:
            # Log the user in
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            
            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email
                },
                # "token": token.key
            }, status=status.HTTP_200_OK)
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

#contact us
class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact information saved successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
# correct with less validation in email due to django and not code
class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                self.perform_create(serializer)
                return Response({"message": "Contact information saved successfully!"}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        # Additional checks can be implemented here if necessary
        serializer.save()

    def validate_data(self, data):
        # Custom validation logic
        if len(data.get('first_name', '')) > 100:
            raise ValidationError({'first_name': ["First name should not be greater than 100 letters."]})
        if len(data.get('last_name', '')) > 100:
            raise ValidationError({'last_name': ["Last name should not be greater than 100 letters."]})
        if not CustomUser.objects.filter(email=data.get('email')).exists():
            raise ValidationError({'email': ["Email ID not registered. Please register first."]})
        if not data.get('phone', '').isdigit() or len(data.get('phone')) != 10:
            raise ValidationError({'phone': ["Phone number should be exactly 10 digits."]})
        if len(data.get('description', '').split()) > 100:
            raise ValidationError({'description': ["Description should not be more than 100 words."]})
        if Contact.objects.filter(email=data.get('email')).exists():
            raise ValidationError({'email': ["Email ID already used."]})
        if Contact.objects.filter(phone=data.get('phone')).exists():
            raise ValidationError({'phone': ["Phone number already used."]})

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }
# correct with less validation in email due to django and not code
'''
'''
# working correct but giving djongo and mongo db error due to validations in serializers.py
class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        phone = request.data.get('phone')
        
        if Contact.objects.filter(email=email).exists():
            return Response({"message": "Email ID already used."}, status=status.HTTP_400_BAD_REQUEST)
        
        if Contact.objects.filter(phone=phone).exists():
            return Response({"message": "Phone number already used."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact information saved successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #working correct but giving djongo and mongo db error
        '''
'''
        # Detailed error for csrf
        else:
            custom_error_message = "It looks like there is an error. Please check your input or try again later."
            error_response = {
                "message": custom_error_message,
                "errors": serializer.errors
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)
'''

# for stock img ai

openai.api_key = "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"

class ImageUploadView(views.APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_serializer = UploadedImageSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()

            # Retrieve the saved image file path
            image_path = file_serializer.instance.image.path
            
            # Perform AI analysis
            try:
                section_trends, cropped_images = analyze_graph_sections(image_path, num_sections=3)
                
                # Generate the overview using OpenAI
                prompt1 = f"The first third of the graph shows a {section_trends[0]} trend."
                prompt2 = f"The second third of the graph shows a {section_trends[1]} trend."
                prompt3 = f"The final third of the graph shows a {section_trends[2]} trend."

                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": f"Given the following information about the different sections of a graph:\n\n{prompt1}\n\n{prompt2}\n\n{prompt3}\n\nPlease provide a very detailed overview of the overall trend of the graph, including any potential implications or insights from a financial and stock market pov. Give an example of such trend from history and how the stock performed after that"}
                    ]
                )

                overview = response["choices"][0]["message"]["content"]
                
                # Response data
                response_data = {
                    "section_trends": section_trends,
                    "overview": overview
                }
                
                return Response(response_data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, format=None):
        candidates=UploadedImage.objects.all()
        serializer=UploadedImageSerializer(candidates,many=True)
        return Response({'status':'success','candidates':serializer.data},status=status.HTTP_200_OK)

# for 3rd-part data saving into our database

# List of hardcoded countries
COUNTRIES = ['AFG', 'ALB', 'DZA', 'AND', 'AGO', 'ATG', 'ARG', 'ARM', 'AUS', 'AUT', 
    'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BTN', 
    'BOL', 'BIH', 'BWA', 'BRA', 'BRN', 'BGR', 'BFA', 'BDI', 'CPV', 'KHM', 
    'CMR', 'CAN', 'CAF', 'TCD', 'CHL', 'CHN', 'COL', 'COM', 'COG', 'COD', 
    'CRI', 'CIV', 'HRV', 'CUB', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 
    'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'SWZ', 'ETH', 'FJI', 'FIN', 
    'FRA', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GRC', 'GRD', 'GTM', 'GIN', 
    'GNB', 'GUY', 'HTI', 'HND', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 
    'IRL', 'ISR', 'ITA', 'JAM', 'JPN', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 
    'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 
    'LTU', 'LUX', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MRT', 
    'MUS', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MAR', 'MOZ', 'MMR', 
    'NAM', 'NRU', 'NPL', 'NLD', 'NZL', 'NIC', 'NER', 'NGA', 'MKD', 'NOR', 
    'OMN', 'PAK', 'PLW', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'POL', 'PRT', 
    'QAT', 'ROU', 'RUS', 'RWA', 'KNA', 'LCA', 'VCT', 'WSM', 'SMR', 'STP', 
    'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SVK', 'SVN', 'SLB', 'SOM', 
    'ZAF', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SWE', 'CHE', 'SYR', 'TWN', 
    'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 
    'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'URY', 'UZB', 'VUT', 'VEN', 
    'VNM', 'YEM', 'ZMB', 'ZWE']

WORLD_BANK_API_URL = "https://api.worldbank.org/v2/country/{country}/indicator/{indicator}?format=json&date=2020&per_page=500"

INDICATORS = {
    'gdp': 'NY.GDP.MKTP.CD',
    'inflation': 'FP.CPI.TOTL',
    'population': 'SP.POP.TOTL',
    'literacy_rate': 'SE.ADT.LITR.ZS',
    'school_enrollment_primary': 'SE.PRM.ENRR',
    'school_enrollment_secondary': 'SE.SEC.ENRR',
    'education_expenditure': 'SE.XPD.TOTL.GD.ZS',
    'life_expectancy': 'SP.DYN.LE00.IN',
    'mortality_rate_under_5': 'SH.DYN.MORT',
    'health_expenditure': 'SH.XPD.CHEX.GD.ZS',
    'unemployment_rate': 'SL.UEM.TOTL.ZS',
    'labor_force_participation_rate': 'SL.TLF.CACT.ZS',
    'employment_agriculture': 'SL.AGR.EMPL.ZS',
    'employment_industry': 'SL.IND.EMPL.ZS',
    'employment_services': 'SL.SRV.EMPL.ZS',
    'co2_emissions': 'EN.ATM.CO2E.PC',
    'access_to_clean_water': 'SH.H2O.SAFE.ZS',
    'renewable_energy_consumption': 'EG.FEC.RNEW.ZS',
    'trade_balance': 'NE.RSB.GNFS.CD',
    'foreign_direct_investment': 'BX.KLT.DINV.CD.WD',
    'government_debt': 'GC.DOD.TOTL.GD.ZS',
    'poverty_headcount_ratio': 'SI.POV.DDAY',
    'income_inequality_gini': 'SI.POV.GINI',
    'social_protection_coverage': 'per_allsp.cov_pop_tot'
}

def fetch_indicator_data(country, indicator):
    response = requests.get(WORLD_BANK_API_URL.format(country=country, indicator=indicator))
    if response.status_code == 200:
        json_data = response.json()
        if isinstance(json_data, list) and len(json_data) > 1 and isinstance(json_data[1], list) and json_data[1]:
            return json_data[1][0]['value']
    return None

def fetch_all_countries():
    countries = []
    page = 1
    while True:
        response = requests.get(f"https://api.worldbank.org/v2/country?format=json&per_page=500&page={page}")
        if response.status_code != 200:
            break
        data = response.json()
        if len(data) < 2 or not data[1]:
            break
        countries.extend(data[1])
        if len(data[1]) < 500:
            break
        page += 1
    return countries

def fetch_and_store_data(model, indicators):
    model.objects.all().delete()  # Delete old data to avoid duplicates

    # Fetch the list of all countries with pagination
    all_countries = fetch_all_countries()

    # Combine hardcoded countries with dynamically fetched countries
    country_codes = {country['id']: country['name'] for country in all_countries}
    for country_code in COUNTRIES:
        if country_code not in country_codes:
            # Ensure all hardcoded countries are included
            country_codes[country_code] = country_code  # Fallback to code if name not found

    for country_code, country_name in country_codes.items():
        data = {
            'country': country_name,
            'country_code': country_code,  # Correctly set the country code
        }

        for key, indicator in indicators.items():
            data[key] = fetch_indicator_data(country_code, indicator)

        model.objects.create(**data)

@api_view(['GET'])
def fetch_country_data(request):
    fetch_and_store_data(CountryData, {key: INDICATORS[key] for key in ['gdp', 'inflation', 'population', 'literacy_rate']})
    return Response({"status": "Country data fetched and stored"})

@api_view(['GET'])
def fetch_education_data(request):
    fetch_and_store_data(EducationData, {key: INDICATORS[key] for key in ['literacy_rate', 'school_enrollment_primary', 'school_enrollment_secondary', 'education_expenditure']})
    return Response({"status": "Education data fetched and stored"})

@api_view(['GET'])
def fetch_health_data(request):
    fetch_and_store_data(HealthData, {key: INDICATORS[key] for key in ['life_expectancy', 'mortality_rate_under_5', 'health_expenditure']})
    return Response({"status": "Health data fetched and stored"})

@api_view(['GET'])
def fetch_employment_data(request):
    fetch_and_store_data(EmploymentData, {key: INDICATORS[key] for key in ['unemployment_rate', 'labor_force_participation_rate', 'employment_agriculture', 'employment_industry', 'employment_services']})
    return Response({"status": "Employment data fetched and stored"})

@api_view(['GET'])
def fetch_environmental_data(request):
    fetch_and_store_data(EnvironmentalData, {key: INDICATORS[key] for key in ['co2_emissions', 'access_to_clean_water', 'renewable_energy_consumption']})
    return Response({"status": "Environmental data fetched and stored"})

@api_view(['GET'])
def fetch_economic_data(request):
    fetch_and_store_data(EconomicData, {key: INDICATORS[key] for key in ['trade_balance', 'foreign_direct_investment', 'government_debt']})
    return Response({"status": "Economic data fetched and stored"})

@api_view(['GET'])
def fetch_social_data(request):
    fetch_and_store_data(SocialData, {key: INDICATORS[key] for key in ['poverty_headcount_ratio', 'income_inequality_gini', 'social_protection_coverage']})
    return Response({"status": "Social data fetched and stored"})

@api_view(['GET'])
def display_country_data(request, country_code=None):
    if country_code:
        country_data = CountryData.objects.filter(country_code=country_code.upper())
    else:
        country_data = CountryData.objects.all()
    serializer = CountryDataSerializer(country_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def display_education_data(request, country_code=None):
    if country_code:
        country_data = EducationData.objects.filter(country_code=country_code.upper())
    else:
        country_data = EducationData.objects.all()
    serializer = EducationDataSerializer(country_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def display_health_data(request, country_code=None):
    if country_code:
        country_data = HealthData.objects.filter(country_code=country_code.upper())
    else:
        country_data = HealthData.objects.all()
    serializer = HealthDataSerializer(country_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def display_employment_data(request, country_code=None):
    if country_code:
        country_data = EmploymentData.objects.filter(country_code=country_code.upper())
    else:
        country_data = EmploymentData.objects.all()
    serializer = EmploymentDataSerializer(country_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def display_environment_data(request, country_code=None):
    if country_code:
        country_data = EnvironmentalData.objects.filter(country_code=country_code.upper())
    else:
        country_data = EnvironmentalData.objects.all()
    serializer = EnvironmentalDataSerializer(country_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def display_economic_data(request, country_code=None):
    if country_code:
        country_data = EconomicData.objects.filter(country_code=country_code.upper())
    else:
        country_data = EconomicData.objects.all()
    serializer = EconomicDataSerializer(country_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def display_social_data(request, country_code=None):
    if country_code:
        social_data = SocialData.objects.filter(country_code=country_code.upper())
    else:
        social_data = SocialData.objects.all()
    serializer = SocialDataSerializer(social_data, many=True)
    return Response(serializer.data)

# for exchange rate v0 without y/n feature
'''
@api_view(['GET'])
def fetch_exchange_rates(request):
    access_key = 'f638ce07b446f7a900ded80b837af730'
    url = f"http://api.exchangeratesapi.io/v1/latest?access_key={access_key}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if 'rates' in data:
            # Change base currency code to USD
            base_currency_code = 'USD'
            base_currency, created = Currency.objects.get_or_create(code=base_currency_code)
            if created:
                base_currency.save()

            date = data['date']
            timestamp = datetime.utcfromtimestamp(data['timestamp']) if 'timestamp' in data else datetime.now()
            success = data.get('success', False)

            rates = data['rates']
            eur_to_usd_rate = rates.get('USD', None)

            if eur_to_usd_rate is None:
                return Response({"error": "USD rate not available in the API response"}, status=status.HTTP_400_BAD_REQUEST)

            # Clear old data
            ExchangeRate.objects.all().delete()

            for code, rate in rates.items():
                try:
                    if code == 'USD':
                        converted_rate = Decimal(rate)
                    else:
                        converted_rate = Decimal(rate) / Decimal(eur_to_usd_rate)
                    
                    target_currency, created = Currency.objects.get_or_create(code=code)
                    if created:
                        target_currency.save()
                    
                    ExchangeRate.objects.create(
                        base_currency=base_currency,
                        target_currency=target_currency,
                        rate=converted_rate,
                        date=date,
                        success=success,
                        timestamp=timestamp,
                    )
                except InvalidOperation:
                    continue

            return Response({"message": "Exchange rates fetched and saved successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Unexpected API response format"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": f"API request failed with status code {response.status_code}"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def list_exchange_rates(request):
    exchange_rates = ExchangeRate.objects.all()
    serializer = ExchangeRateSerializer(exchange_rates, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_exchange_rate_by_code(request, target_currency_code):
    target_currency_code = target_currency_code.upper()  # Normalize to uppercase
    exchange_rate = get_object_or_404(ExchangeRate, target_currency__code=target_currency_code)
    serializer = ExchangeRateSerializer(exchange_rate)
    return Response(serializer.data)
'''
# updated exchange rate with y/n feature
# Global variable to temporarily hold fetched data
temp_data = {}

@api_view(['GET'])
def fetch_exchange_rates(request):
    global temp_data
    access_key = 'f638ce07b446f7a900ded80b837af730'
    url = f"http://api.exchangeratesapi.io/v1/latest?access_key={access_key}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if 'rates' in data:
            base_currency_code = 'USD'
            date = data['date']
            timestamp = datetime.utcfromtimestamp(data['timestamp']) if 'timestamp' in data else datetime.now()
            success = data.get('success', False)

            rates = data['rates']
            eur_to_usd_rate = rates.get('USD', None)

            if eur_to_usd_rate is None:
                return Response({"error": "USD rate not available in the API response"}, status=status.HTTP_400_BAD_REQUEST)

            fetched_data = []

            for code, rate in rates.items():
                try:
                    if code == 'USD':
                        converted_rate = Decimal(rate)
                    else:
                        converted_rate = Decimal(rate) / Decimal(eur_to_usd_rate)
                    
                    fetched_data.append({
                        'base_currency': base_currency_code,
                        'target_currency': code,
                        'rate': str(converted_rate),
                        'date': date,
                        'success': success,
                        'timestamp': timestamp,
                    })
                except InvalidOperation:
                    continue

            temp_data['exchange_rates'] = fetched_data
            return Response({"message": "Exchange rates fetched successfully", "data": fetched_data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Unexpected API response format"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": f"API request failed with status code {response.status_code}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def save_exchange_rates(request):
    global temp_data

    user_response = request.data.get('response')
    if user_response is None:
        return Response({"error": "User response not provided"}, status=status.HTTP_400_BAD_REQUEST)

    if user_response.lower() == 'yes':
        try:    
            ExchangeRate.objects.all().delete()
            for rate_data in temp_data.get('exchange_rates', []):
                base_currency, _ = Currency.objects.get_or_create(code=rate_data['base_currency'])
                target_currency, _ = Currency.objects.get_or_create(code=rate_data['target_currency'])

                ExchangeRate.objects.create(
                base_currency=base_currency,
                target_currency=target_currency,
                rate=rate_data['rate'],
                date=rate_data['date'],
                success=rate_data['success'],
                timestamp=rate_data['timestamp'],
            )
            #print(base_currency)
            temp_data = {}
            return Response({"message": "Exchange rates saved successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to save exchange rates: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif user_response.lower() == 'no':
        temp_data = {}
        return Response({"message": "Exchange rates discarded"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid user response"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_exchange_rates(request):
    exchange_rates = ExchangeRate.objects.all()
    serializer = ExchangeRateSerializer(exchange_rates, many=True)
    return Response(serializer.data)

# for coin-ems v0 with no option for y/n
''' 
API_KEY = '24C1F795-41A0-4DD5-88A8-273B4DB96B65'
API_URL = 'https://rest.coinapi.io/v1/trades/latest?symbol=BITSTAMP_SPOT_BTC_USD'
HEADERS = {'X-CoinAPI-Key': API_KEY}

@api_view(['GET'])
def fetch_trades(request):
    response = requests.get(API_URL, headers=HEADERS)
    
    if response.status_code == 200:
        Trade.objects.all().delete()
        trades = response.json()
        for trade_data in trades:
            trade = Trade(
                symbol=trade_data['symbol_id'],
                price=trade_data['price'],
                size=trade_data['size'],
                taker_side=trade_data['taker_side'],
                timestamp=trade_data['time_exchange']
            )
            trade.save()
        return Response({'message': 'Trades fetched and saved successfully.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Failed to fetch data from CoinAPI'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_trades(request):
    trades = Trade.objects.all()
    serializer = TradeSerializer(trades, many=True)
    return Response(serializer.data)
'''
# for coin-ems with y/n feature before saving
API_KEY = '24C1F795-41A0-4DD5-88A8-273B4DB96B65'
API_URL = 'https://rest.coinapi.io/v1/trades/latest?symbol=BITSTAMP_SPOT_BTC_USD'
HEADERS = {'X-CoinAPI-Key': API_KEY}

# Global variable to temporarily hold fetched data
temp_trades = []

@api_view(['GET'])
def fetch_trades(request):
    global temp_trades
    response = requests.get(API_URL, headers=HEADERS)
    
    if response.status_code == 200:
        trades = response.json()
        temp_trades = []

        for trade_data in trades:
            temp_trades.append({
                'symbol': trade_data['symbol_id'],
                'price': trade_data['price'],
                'size': trade_data['size'],
                'taker_side': trade_data['taker_side'],
                'timestamp': trade_data['time_exchange']
            })

        return Response({'message': 'Trades fetched successfully.', 'data': temp_trades}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Failed to fetch data from CoinAPI'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def save_trades(request):
    global temp_trades

    user_response = request.data.get('response')
    if user_response is None:
        return Response({"error": "User response not provided"}, status=status.HTTP_400_BAD_REQUEST)

    if user_response.lower() == 'yes':
        try:
            Trade.objects.all().delete()
            for trade_data in temp_trades:
                trade = Trade(
                    symbol=trade_data['symbol'],
                    price=trade_data['price'],
                    size=trade_data['size'],
                    taker_side=trade_data['taker_side'],
                    timestamp=trade_data['timestamp']
                )
                trade.save()

            temp_trades = []
            return Response({"message": "Trades saved successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to save trades: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif user_response.lower() == 'no':
        temp_trades = []
        return Response({"message": "Trades discarded"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid user response"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_trades(request):
    trades = Trade.objects.all()
    serializer = TradeSerializer(trades, many=True)
    return Response(serializer.data)

# for file processing LLM
class FileUploadView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = UploadedFileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            file_instance = file_serializer.instance

            try:
                # Process the uploaded file
                document_text = ai.read_document(file_instance.file)
                document_chunks = ai.split_text(document_text, 1500)
                question = request.data.get('question', '')
                if not question:
                    return Response({'error': 'Question is required.'}, status=status.HTTP_400_BAD_REQUEST)
                answer = ai.ask_questionEd_about_document(document_chunks, question)

                return Response({'answer': answer}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ImageUploadView_FileProcessing(views.APIView): #ImageUploadView name for stock img
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            uploaded_image = request.FILES['file']
            image = Image.open(uploaded_image)
            encoded_image = ai.encode_image(image)
            image_url = f"data:image/png;base64,{encoded_image}"

            question = request.data.get('question', '')
            if not question:
                return Response({'error': 'Question is required.'}, status=status.HTTP_400_BAD_REQUEST)
            answer = ai.ask_question_about_image(question, image_url)

            return Response({'answer': answer}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# team1 last 5 years stock price
class AllLiveStockDataAPIView(APIView):
    # Path to the tickers.xlsx file
    tickers_file_path = os.path.join(os.path.dirname(__file__), 'data', 'ticker.xlsx')

    def get_predefined_tickers(self):
        # Read tickers from the Excel file
        df = pd.read_excel(self.tickers_file_path, sheet_name='Sheet1')  # Adjust sheet name if necessary
        tickers_list = df['Ticker'].tolist()  # Assuming 'Ticker' is the column header
        return tickers_list

    def get(self, request, ticker=None):
        if not ticker:
            # Delete all existing data if no ticker is provided
            self.clear_existing_data()

        if ticker:
            tickers_list = [ticker]
        else:
            tickers_list = self.get_predefined_tickers()

        data = []
        for ticker in tickers_list:
            try:
                stock_info = yf.Ticker(ticker).info
                company_data = {
                    'ticker': ticker,
                    'company_name': stock_info.get('shortName', 'N/A'),
                    'company_address': stock_info.get('address1', 'N/A'),
                    'company_location': f"{stock_info.get('city', 'N/A')}, {stock_info.get('state', 'N/A')}, {stock_info.get('country', 'N/A')}",
                    'avg_stock_price_5yrs': self.calculate_avg_stock_price(ticker),
                    'avg_revenue_5yrs': self.calculate_avg_revenue_5yrs(ticker),
                    'percentage_change': self.calculate_percentage_change(ticker)
                }
                data.append(company_data)

                # Save to database only if no specific ticker is provided
                #if not ticker:
                 #   self.save_to_database(company_data)
            except Exception as e:
                data.append({
                    'ticker': ticker,
                    'error': str(e)
                })
        return Response(data)

    def calculate_avg_stock_price(self, ticker):
        stock = yf.Ticker(ticker)
        hist = stock.history(period="5y")
        if hist.empty:
            return 'No data available'
        return hist['Close'].mean()

    def calculate_percentage_change(self, ticker):
        stock = yf.Ticker(ticker)
        hist = stock.history(period="5y")
        if hist.empty:
            return 'No data available'
        return ((hist['Close'].iloc[-1] - hist['Close'].iloc[0]) / hist['Close'].iloc[0]) * 100

    def calculate_avg_revenue_5yrs(self, ticker):
        stock = yf.Ticker(ticker)
        financials = stock.financials
        if financials.empty:
            return 'No data available'
        revenue = financials.loc['Total Revenue']
        return revenue.head(5).mean()

# alpha vantage core stock api, no need for models and serializers here
ALPHA_VANTAGE_API_KEY = 'JPCM9P87TQO7IG3N'
ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query'

@api_view(['GET'])
def load_stock_data(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TIME_SERIES_DAILY',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_stock_weekly(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TIME_SERIES_WEEKLY',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_stock_monthly(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TIME_SERIES_MONTHLY',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_stock_quote(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'GLOBAL_QUOTE',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

# forex
#ALPHA_VANTAGE_API_KEY = 'JPCM9P87TQO7IG3N'
#ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query'

@api_view(['POST'])
def load_currency_exchange_rate(request):
    # Get the 'from_currency' and 'to_currency' from the request body
    from_currency = request.data.get('from_currency')
    to_currency = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not from_currency or not to_currency:
        return JsonResponse({'status': 'error', 'message': 'Both from_currency and to_currency are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency={from_currency}&to_currency={to_currency}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def load_fxdaily(request):
    # Get the 'from_symbol' and 'to_symbol' from the request body
    from_symbol = request.data.get('from_currency')
    to_symbol = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not from_symbol or not to_symbol:
        return JsonResponse({'status': 'error', 'message': 'Both from_symbol and to_symbol are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol={from_symbol}&to_symbol={to_symbol}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def load_fxweekly(request):
    # Get the 'from_symbol' and 'to_symbol' from the request body
    from_symbol = request.data.get('from_currency')
    to_symbol = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not from_symbol or not to_symbol:
        return JsonResponse({'status': 'error', 'message': 'Both from_symbol and to_symbol are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol={from_symbol}&to_symbol={to_symbol}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def load_fxmonthly(request):
    # Get the 'from_symbol' and 'to_symbol' from the request body
    from_symbol = request.data.get('from_currency')
    to_symbol = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not from_symbol or not to_symbol:
        return JsonResponse({'status': 'error', 'message': 'Both from_symbol and to_symbol are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol={from_symbol}&to_symbol={to_symbol}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

#crypto
@api_view(['POST'])
def load_crypto_exchange_rate(request):
    # Get the 'from_currency' and 'to_currency' from the request body
    from_currency = request.data.get('from_currency')
    to_currency = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not from_currency or not to_currency:
        return JsonResponse({'status': 'error', 'message': 'Both from_currency and to_currency are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency={from_currency}&to_currency={to_currency}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def load_cdaily(request):
    # Get the 'symbol' and 'market' from the request body
    symbol = request.data.get('from_currency')
    market = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not symbol or not market:
        return JsonResponse({'status': 'error', 'message': 'Both symbol and market are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol={symbol}&market={market}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def load_cweekly(request):
    # Get the 'symbol' and 'market' from the request body
    symbol = request.data.get('from_currency')
    market = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not symbol or not market:
        return JsonResponse({'status': 'error', 'message': 'Both symbol and market are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol={symbol}&market={market}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def load_cmonthly(request):
    # Get the 'symbol' and 'market' from the request body
    symbol = request.data.get('from_currency')
    market = request.data.get('to_currency')
    
    # Validate that both currencies are provided
    if not symbol or not market:
        return JsonResponse({'status': 'error', 'message': 'Both symbol and market are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol={symbol}&market={market}&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

#commodities
@api_view(['GET'])
def load_wti_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=WTI&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_brent_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_natural_gas_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=NATURAL_GAS&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_copper_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=COPPER&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_aluminum_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_wheat_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_corn_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=CORN&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_cotton_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=COTTON&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_sugar_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=SUGAR&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_coffee_data(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_all_commodities(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=ALL_COMMODITIES&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

# Economic indicators
@api_view(['GET'])
def load_real_gdp(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_capita_gdp(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&interval=annual&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_treasury_yield(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_federal_funds_rate(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_cpi(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_inflation(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=INFLATION&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_retail_sales(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=RETAIL_SALES&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_durable_goods_orders(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=DURABLES&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_unemployment_rate(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_nonfarm_payroll(request):
    # Define the URL for the Alpha Vantage API request
    url = f'https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey={ALPHA_VANTAGE_API_KEY}'
    
    # Fetch data from Alpha Vantage
    response = requests.get(url)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'error', 'message': data["Error Message"]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Return the API response directly
    return JsonResponse(data, safe=False)

# options data
@api_view(['GET'])
def load_historical_options(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'HISTORICAL_OPTIONS',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

# fundamental data
@api_view(['GET'])
def load_overview(request, symbol):

    # Fetch new data from Alpha Vantage
    params = {
        'function': 'OVERVIEW',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_dividends(request, symbol):

    # Fetch new data from Alpha Vantage
    params = {
        'function': 'DIVIDENDS',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_splits(request, symbol):

    # Fetch new data from Alpha Vantage
    params = {
        'function': 'SPLITS',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_income_statement(request, symbol):

    # Fetch new data from Alpha Vantage
    params = {
        'function': 'INCOME_STATEMENT',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_balance_sheet(request, symbol):

    # Fetch new data from Alpha Vantage
    params = {
        'function': 'BALANCE_SHEET',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_cash_flow(request, symbol):

    # Fetch new data from Alpha Vantage
    params = {
        'function': 'CASH_FLOW',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_earnings(request, symbol):

    # Fetch new data from Alpha Vantage
    params = {
        'function': 'EARNINGS',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

# Alpha-Intelligence
@api_view(['GET'])
def load_stock_news(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'NEWS_SENTIMENT',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_stock_gl(request):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TOP_GAINERS_LOSERS',
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def load_stock_analytics(request):
    # Get the 'symbols' from the request body
    symbols = request.data.get('symbols')
    
    # Validate that symbols are provided
    if not symbols:
        return JsonResponse({'status': 'error', 'message': 'Symbols are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ANALYTICS_FIXED_WINDOW',
        'SYMBOLS': symbols,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'RANGE': '2024-01-01',
        'RANGE': '2024-07-01',
        'INTERVAL': 'DAILY', 
        'OHLC': 'close',
        'CALCULATIONS': 'MEAN,STDDEV,CORRELATION',
        # 'CALCULATIONS': 'MIN,MAX,MEAN,MEDIAN,CUMULATIVE_RETURN,VARIANCE,STDDEV,MAX_DRAWDOWN,HISTOGRAM,AUTOCORRELATION,COVARIANCE,CORRELATION',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

# Alpha vantage technical indicators
@api_view(['GET'])
def load_sma(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'SMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_ema(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'EMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_wma(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'WMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_dema(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'DEMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_tema(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TEMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_trima(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TRIMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_kama(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'KAMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_mama(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MAMA',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_tt(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'T3',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_tt(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'T3',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_macdext(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MACDEXT',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_stoch(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'STOCH',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_stochf(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'STOCHF',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_rsi(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'RSI',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_stochrsi(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'STOCHRSI',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_willr(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'WILLR',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_adx(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ADX',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_adxr(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ADXR',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_apo(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'APO',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_ppo(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'PPO',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_mom(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MOM',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_bop(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'BOP',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_cci(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'CCI',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_cmo(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'CMO',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_roc(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ROC',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_rocr(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ROCR',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_aroon(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'AROON',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_aroonosc(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'AROONOSC',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_mfi(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MFI',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_trix(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TRIX',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_ultosc(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ULTOSC',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_dx(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'DX',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_minus_di(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MINUS_DI',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_plus_di(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'PLUS_DI',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_minus_dm(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MINUS_DM',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_plus_dm(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'PLUS_DM',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_bbands(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'BBANDS',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_midpoint(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MIDPOINT',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_midprice(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'MIDPRICE',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_sar(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'SAR',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_trange(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'TRANGE',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_atr(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ATR',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_natr(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'NATR',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_ad(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'AD',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_adosc(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'ADOSC',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_obv(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'OBV',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_trendline(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'HT_TRENDLINE',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_sine(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'HT_SINE',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_trendmode(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'HT_TRENDMODE',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_dcperiod(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'HT_DCPERIOD',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_dcphase(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'HT_DCPHASE',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def load_dcphasor(request, symbol):
    # Fetch new data from Alpha Vantage
    params = {
        'function': 'HT_PHASOR',
        'symbol': symbol,
        'apikey': ALPHA_VANTAGE_API_KEY,
        'interval': 'weekly',
        'time_period': '10',
        'series_type': 'open',
    }
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    
    # Check if the response contains error message
    if "Error Message" in data:
        return JsonResponse({'status': 'Ticker not found', 'message': data["Error Message"]}, status=400)
    
    return JsonResponse(data, safe=False)