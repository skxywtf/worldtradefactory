# signup and login
from django.urls import path
#from .views import UserSignupView, UserLoginView, ImageUploadView

# contact us
#from .views import ContactCreateView

# for 3rd-party data saving into our database
from .views import (
    fetch_country_data, fetch_economic_data, fetch_education_data, fetch_employment_data,
    fetch_environmental_data, fetch_health_data, fetch_social_data,
    display_country_data, display_economic_data, display_education_data, 
    display_employment_data, display_environment_data, display_health_data, 
    display_social_data, fetch_exchange_rates, list_exchange_rates, #get_exchange_rate_by_code,
    save_exchange_rates, fetch_trades, list_trades, save_trades, UserSignupView, UserLoginView, ImageUploadView,
    ContactCreateView,FileUploadView, ImageUploadView_FileProcessing, AllLiveStockDataAPIView
)

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'), #done
    path('ai/', ImageUploadView.as_view(), name='ai'), #done
    path('listai/', ImageUploadView.as_view(), name='listai'), #done

    # for 3rd-party data saving into our db
    #path('fetch-country-data/', fetch_country_data, name='fetch_country_data'),
    #path('fetch-economic-data/', fetch_economic_data, name='fetch_economic_data'),
    #path('fetch-education-data/', fetch_education_data, name='fetch_education_data'),
    #path('fetch-employment-data/', fetch_employment_data, name='fetch_employment_data'),
    #path('fetch-environmental-data/', fetch_environmental_data, name='fetch_environmental_data'),
    #path('fetch-health-data/', fetch_health_data, name='fetch_health_data'),
    #path('fetch-social-data/', fetch_social_data, name='fetch_social_data'),
    path('country-data/', display_country_data, name='country_data'),
    path('economic-data/', display_economic_data, name='economic_data'),
    path('education-data/', display_education_data, name='education_data'),
    path('employment-data/', display_employment_data, name='employment_data'),
    path('environmental-data/', display_environment_data, name='environment_data'),
    path('health-data/', display_health_data, name='health_data'),
    path('social-data/', display_social_data, name='social_data'),
    # New paths for country-specific data
    path('country-data/<str:country_code>/', display_country_data, name='display_country_data'),
    path('economic-data/<str:country_code>/', display_economic_data, name='display_economic_data'),
    path('education-data/<str:country_code>/', display_education_data, name='display_education_data'),
    path('employment-data/<str:country_code>/', display_employment_data, name='display_employment_data'),
    path('environmental-data/<str:country_code>/', display_environment_data, name='display_environment_data'),
    path('health-data/<str:country_code>/', display_health_data, name='display_health_data'),
    path('social-data/<str:country_code>/', display_social_data, name='display_social_data'),

    # for exchange rate fetch and saving data in our db
    path('load-exchange-rate', fetch_exchange_rates, name='exchange_rate_load'),# fetch live
    path('save-exchange-rate', save_exchange_rates, name='save_exchange_rates'), #(call load before save to save in the db) save in database with post=yes
    path('get-exchange-rate', list_exchange_rates, name='get'), # fetch from database
    #path('get/<str:target_currency_code>', get_exchange_rate_by_code, name='get_by_code'), # works for the commented v0 code of exchange rate only

    # for coin-ems
    path('load-coin-ems-trades', fetch_trades, name='coin_ems_load'), # use this to show live
    path('get-coin-ems-trades', list_trades, name='get_trades'), #use this to show from database
    path('save-coin-ems-trades', save_trades, name='save_trades'), #use this with post=yes to save in database

    # for file processing ai
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('upload-image/', ImageUploadView_FileProcessing.as_view(), name='image-upload'),

    # team1 last 5 years stock price
    # fetches live data based on ticker and do not saves in db otherwise db will crack
    # since more than 7000 tickers are there
    path('live/<str:ticker>/', AllLiveStockDataAPIView.as_view(), name='live-stock-data'),
]
