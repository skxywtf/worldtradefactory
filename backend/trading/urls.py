from django.urls import path
from . import views

urlpatterns = [
    # URL for orders
    path('place-order', views.place_order, name='place_order'),
    path('load-order', views.get_order, name='get_order'),
    path('load-order/<str:order_id>', views.get_order_id, name='get_order_id'),# Use order id
    path('delete-order', views.delete_all_orders, name='delete_all_orders'),
    path('delete-order/<str:order_id>', views.delete_order, name='delete_order'),# Use order id
    # URL for portfolio history
    path('load-history', views.get_portfolio_history, name='get_portfolio_history'),
    # URL for account activities
    path('load-activity', views.get_account_activities, name='get_account_activities'),
    path('load-activity/<str:activity_type>', views.get_activity, name='get_activity'),# Use activity type
    # URL for account configuration
    path('load-config', views.get_account_configuration, name='get_account_configuration'),
    # URL for market calendar
    path('load-calendar', views.get_market_calendar, name='get_market_calendar'),
    # URL for market clock
    path('load-clock', views.get_market_clock, name='get_market_clock'),
    # URL for account details
    path('load-account', views.get_account, name='get_account'),

    # urls for watchlist
    path('create-watchlist', views.create_watchlist, name='create_watchlist'),
    path('load-watchlist', views.get_watchlist, name='get_watchlist'),
    path('load-watchlist/<str:watchlist_id>', views.get_watchlist_id, name='get_watchlist_id'),
    path('load-wname/<str:name>', views.get_watchlist_name, name='get_watchlist_name'),
    path('delete-watchlist/<str:watchlist_id>', views.delete_watchlist_id, name='delete_watchlist_id'),
    path('delete-wname/<str:name>', views.delete_watchlist_name, name='delete_watchlist_name'),
    path('delete-symbol', views.delete_watchlist_symbol, name='delete_watchlist_symbol'), 
    path('update-watchlist/<str:watchlist_id>', views.update_watchlist, name='update_watchlist'),
    path('update-wname/<str:name>', views.update_watchlist_name, name='update_watchlist_name'),

    #urls for Position and assets
    # For positions
    path('load-position', views.get_position, name='get_position'),
    path('delete-all', views.delete_all_positions, name='delete_all_positions'),
    path('load-posinfo', views.get_position_info, name='get_position_info'), # This can accept either asset_id or symbol
    # For assets
    path('load-asset', views.get_assets, name='get_assets'),
    path('load-assetinfo', views.get_asset_info, name='get_asset_info'), # This can accept either id or symbol
    path('load-contract', views.get_contracts, name='get_contracts'),
    path('load-contractinfo', views.get_contract_info, name='get_contract_info'), # This can accept either id or symbol
]