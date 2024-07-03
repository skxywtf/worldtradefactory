# signup and login
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import UserSignupSerializer, UserLoginSerializer

# contact us
from .serializers import ContactSerializer
from .models import Contact

# for stock img ai
from rest_framework import status, views
#from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from api.models import UploadedImage
from api.serializers import UploadedImageSerializer
from .ai import analyze_graph_sections  # assuming AI.py is renamed to ai.py and placed in the same app
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
    EnvironmentalData, EconomicData, SocialData
)
from .serializers import (
    CountryDataSerializer, EducationDataSerializer, HealthDataSerializer,
    EmploymentDataSerializer, EnvironmentalDataSerializer, EconomicDataSerializer,
    SocialDataSerializer
)

# Data from the UI will be received here
class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
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
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email
                },
                #"token": token.key
            }, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# contact us

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