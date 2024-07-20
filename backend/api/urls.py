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
    ContactCreateView,FileUploadView, ImageUploadView_FileProcessing, AllLiveStockDataAPIView,
    load_stock_data,load_stock_monthly,load_stock_quote,load_stock_weekly,
    load_currency_exchange_rate, load_fxdaily, load_fxmonthly, load_fxweekly,
    load_cdaily,load_cmonthly,load_crypto_exchange_rate,load_cweekly,
    load_wti_data, load_aluminum_data, load_all_commodities, load_brent_data,
    load_coffee_data, load_copper_data, load_corn_data, load_cotton_data,
    load_natural_gas_data, load_sugar_data, load_wheat_data,
    load_capita_gdp,load_cpi,load_durable_goods_orders,load_federal_funds_rate,
    load_inflation,load_nonfarm_payroll,load_real_gdp,load_retail_sales,
    load_treasury_yield,load_unemployment_rate,load_historical_options,
    load_balance_sheet,load_cash_flow,load_dividends,load_earnings,
    load_income_statement,load_overview,load_splits,
    load_stock_gl,load_stock_news
)

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'), #done
    path('ai/', ImageUploadView.as_view(), name='ai'), #done
    path('listai/', ImageUploadView.as_view(), name='listai'), #done

    # for 3rd-party data saving into our db
    path('fetch-country-data/', fetch_country_data, name='fetch_country_data'),
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

    # alpha vantage core stock api, no need to store data in db , fetches from third-party directly
    path('load-daily/<str:symbol>', load_stock_data, name='load_stock_data'),
    path('load-weekly/<str:symbol>', load_stock_weekly, name='weekly_data'),
    path('load-monthly/<str:symbol>', load_stock_monthly, name='monthly_data'),
    path('load-quote/<str:symbol>', load_stock_quote, name='load_stock_quote'),

    #forex: POST with from_currency:usd,to_currency:eur
    path('load-forex', load_currency_exchange_rate, name='load_currency_exchange_rate'),
    path('load-fxdaily', load_fxdaily, name='load_fxdaily'),
    path('load-fxweekly', load_fxweekly, name='load_fxweekly'),
    path('load-fxmonthly', load_fxmonthly, name='load_fxmonthly'),

    # crypto
    path('load-crypto', load_crypto_exchange_rate, name='load_currency_exchange_rate'),
    path('load-cdaily', load_cdaily, name='load_cdaily'),
    path('load-cweekly', load_cweekly, name='load_cweekly'), 
    path('load-cmonthly', load_cmonthly, name='load_cmonthly'), 

    #commodities
    path('load-wti', load_wti_data, name='load_wti_data'),
    path('load-brent', load_brent_data, name='load_brent_data'),
    path('load-natural', load_natural_gas_data, name='load_natural_gas_data'),
    path('load-copper', load_copper_data, name='load_copper_data'),
    path('load-aluminum', load_aluminum_data, name='load_aluminum_data'),
    path('load-wheat', load_wheat_data, name='load_wheat_data'),
    path('load-corn', load_corn_data, name='load_corn_data'),
    path('load-cotton', load_cotton_data, name='load_cotton_data'),
    path('load-sugar', load_sugar_data, name='load_sugar_data'),
    path('load-coffee', load_coffee_data, name='load_coffee_data'),
    path('load-commodities', load_all_commodities, name='load_all_commodities'),

    # economic indicators
    path('load-rgdp', load_real_gdp, name='load_real_gdp'),
    path('load-cgdp', load_capita_gdp, name='load_capita_gdp'),
    path('load-treasury', load_treasury_yield, name='load_treasury_yield'),
    path('load-funds', load_federal_funds_rate, name='load_federal_funds_rate'),
    path('load-cpi', load_cpi, name='load_cpi'),
    path('load-retail', load_retail_sales, name='load_retail_sales'),
    path('load-durable', load_durable_goods_orders, name='load_durable_goods_orders'),
    path('load-unemployment', load_unemployment_rate, name='load_unemployment_rate'),
    path('load-nonfarm', load_nonfarm_payroll, name='load_nonfarm_payroll'),

    # options data
    path('load-hoptions/<str:symbol>', load_historical_options, name='load_historical_options'),

    # fundamental data
    path('load-overview/<str:symbol>', load_overview, name='load_overview'),
    path('load-dividends/<str:symbol>', load_dividends, name='load_dividends'),
    path('load-splits/<str:symbol>', load_splits, name='load_splits'),
    path('load-income/<str:symbol>', load_income_statement, name='load_income_statement'),
    path('load-sheet/<str:symbol>', load_balance_sheet, name='load_balance_sheet'),
    path('load-cash/<str:symbol>', load_cash_flow, name='load_cash_flow'),
    path('load-earnings/<str:symbol>', load_earnings, name='load_earnings'),

    # Alpha-Intelligence
    path('load-news/<str:symbol>', load_stock_news, name='load_stock_news'),
    path('load-gl', load_stock_gl, name='gain_loss'),
    #path('load-analytics', load_stock_analytics, name='analytics_data'),
]

