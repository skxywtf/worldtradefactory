from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from django.conf import settings
from alpaca_config import APCA_API_KEY_ID, APCA_API_SECRET_KEY

# This is for orders

@api_view(['POST'])
def place_order(request):
    # Extract order details from the request body
    side = request.data.get('side')
    order_type = request.data.get('type')
    time_in_force = request.data.get('time_in_force')
    symbol = request.data.get('symbol')
    qty = request.data.get('qty')

    if not all([side, order_type, time_in_force, symbol, qty]):
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    url = "https://paper-api.alpaca.markets/v2/orders"
    payload = {
        "side": side,
        "type": order_type,
        "time_in_force": time_in_force,
        "symbol": symbol,
        "qty": qty
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200 or response.status_code == 201:
        data = response.json()
    else:
        data = {
            'error': 'Failed to place order',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['GET'])
def get_order(request):
    url = "https://paper-api.alpaca.markets/v2/orders?status=all"
    # url = "https://api.alpaca.markets/v2/orders"

    headers = {
        "accept": "application/json",
        # "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to fetch order',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['GET'])
def get_order_id(request, order_id):
    url = f"https://paper-api.alpaca.markets/v2/orders/{order_id}"
    # url = "https://api.alpaca.markets/v2/orders"

    headers = {
        "accept": "application/json",
        # "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to fetch order',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['DELETE'])
def delete_order(request, order_id):
    url = f"https://paper-api.alpaca.markets/v2/orders/{order_id}"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 204:
        data = {'status': 'Order deleted successfully'}
    elif response.status_code == 404:
        data = {'error': 'Order not found', 'status_code': response.status_code}
    else:
        data = {'error': 'Failed to delete order', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

@api_view(['DELETE'])
def delete_all_orders(request):
    url = "https://paper-api.alpaca.markets/v2/orders"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 204:
        data = {'status': 'All orders deleted successfully'}
    else:
        data = {'error': 'Failed to delete all orders', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

# This is for account activities

@api_view(['GET'])
def get_account_activities(request):
    url = "https://paper-api.alpaca.markets/v2/account/activities?direction=desc"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve account activities',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['GET'])
def get_activity(request, activity_type):
    url = f"https://paper-api.alpaca.markets/v2/account/activities/{activity_type}?direction=desc"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {'error': 'Failed to retrieve activity', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

# This is for account configuraion

@api_view(['GET'])
def get_account_configuration(request):
    url = "https://paper-api.alpaca.markets/v2/account/configurations"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve account configuration',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

# This is for market calendar

@api_view(['GET'])
def get_market_calendar(request):
    url = "https://paper-api.alpaca.markets/v2/calendar"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve market calendar',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

# This is for market clock

@api_view(['GET'])
def get_market_clock(request):
    url = "https://paper-api.alpaca.markets/v2/clock"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve market clock',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

# This is for account portfolio history

@api_view(['GET'])
def get_portfolio_history(request):
    url = "https://paper-api.alpaca.markets/v2/account/portfolio/history"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve portfolio history',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

# This is for account details

@api_view(['GET'])
def get_account(request):
    url = "https://paper-api.alpaca.markets/v2/account"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve account',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

# This is for watchlist

@api_view(['GET'])
def get_watchlist(request):
    url = "https://paper-api.alpaca.markets/v2/watchlists"
    # url = "https://api.alpaca.markets/v2/orders"

    headers = {
        "accept": "application/json",
        # "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to fetch watchlists',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['POST'])
def create_watchlist(request):
    url = "https://paper-api.alpaca.markets/v2/watchlists"
    payload = request.data
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {'error': 'Failed to create watchlist', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

@api_view(['GET'])
def get_watchlist_id(request, watchlist_id):
    url = f"https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {'error': 'Failed to retrieve watchlist', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

@api_view(['GET'])
def get_watchlist_name(request, name):
    url = f"https://paper-api.alpaca.markets/v2/watchlists:by_name?name={name}"  

    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {'error': 'Failed to retrieve watchlist', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

@api_view(['DELETE'])
def delete_watchlist_id(request, watchlist_id):
    url = f"https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 204:
        data = {'status': 'Watchlist deleted successfully'}
    elif response.status_code == 404:
        data = {'error': 'No watchlist found', 'status_code': response.status_code}
    else:
        data = {'error': 'Failed to delete watchlist', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

@api_view(['DELETE'])
def delete_watchlist_name(request, name):
    url = f"https://paper-api.alpaca.markets/v2/watchlists:by_name?name={name}"  

    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 204:
        data = {'status': 'Watchlist deleted successfully'}
    elif response.status_code == 404:
        data = {'error': 'No watchlist found', 'status_code': response.status_code}
    else:
        data = {'error': 'Failed to delete watchlist', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

@api_view(['DELETE'])
def delete_watchlist_symbol(request):
    watchlist_id = request.data.get('watchlist_id')
    symbols = request.data.get('symbols')

    if not watchlist_id or not symbols:
        return Response(
            {'error': 'watchlist_id and symbols are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    url = f"https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}/{symbols}"
    headers = {
        'accept': 'application/json',
        'APCA-API-KEY-ID': APCA_API_KEY_ID,
        'APCA-API-SECRET-KEY': APCA_API_SECRET_KEY
    }

    response = requests.delete(url, headers=headers)

    if response.status_code == 204:
        data = {'status': 'Symbol deleted from watchlist successfully'}
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    elif response.status_code == 404:
        data = {'error': 'Watchlist or symbol not found', 'status_code': response.status_code}
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    elif response.status_code == 200:
        watchlist_response = requests.get(f"https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}", headers=headers)
        if watchlist_response.status_code == 200:
            watchlist_data = watchlist_response.json()
            symbols = [asset['symbol'] for asset in watchlist_data.get('assets', [])]
            if symbols not in symbols:
                data = {'status': 'Symbol deleted from watchlist successfully'}
                return Response(data, status=status.HTTP_204_NO_CONTENT)
            else:
                data = {'error': 'Failed to delete symbol from watchlist', 'status_code': response.status_code, 'message': 'Symbol still present in watchlist'}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {
                    'error': 'Failed to verify deletion',
                    'status_code': watchlist_response.status_code,
                    'message': watchlist_response.text
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response(
            {
                'error': 'Failed to delete symbol from watchlist',
                'status_code': response.status_code,
                'message': response.text
            },
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['PUT'])
def update_watchlist(request, watchlist_id):
    url = f"https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}"

    name = request.data.get('name')
    symbols = request.data.get('symbols')

    if not name or not symbols:
        return Response(
            {'error': 'Name and symbols are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    payload = {
        'name': name,
        'symbols': symbols
    }
    headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
        'APCA-API-KEY-ID': APCA_API_KEY_ID,
        'APCA-API-SECRET-KEY': APCA_API_SECRET_KEY
    }

    response = requests.put(url, json=payload, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(
            {
                'error': 'Failed to update watchlist',
                'status_code': response.status_code,
                'message': response.text
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
@api_view(['PUT'])
def update_watchlist_name(request, name):
    url = f"https://paper-api.alpaca.markets/v2/watchlists:by_name?name={name}"

    name = request.data.get('name')
    symbols = request.data.get('symbols')

    if not name or not symbols:
        return Response(
            {'error': 'Name and symbols are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    payload = {
        'name': name,
        'symbols': symbols
    }
    headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
        'APCA-API-KEY-ID': APCA_API_KEY_ID,
        'APCA-API-SECRET-KEY': APCA_API_SECRET_KEY
    }

    response = requests.put(url, json=payload, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(
            {
                'error': 'Failed to update watchlist',
                'status_code': response.status_code,
                'message': response.text
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
# Position and assets

@api_view(['GET'])
def get_position(request):
    url = "https://paper-api.alpaca.markets/v2/positions"
    # url = "https://api.alpaca.markets/v2/orders"

    headers = {
        "accept": "application/json",
        # "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to fetch position',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['DELETE'])
def delete_all_positions(request):
    url = "https://paper-api.alpaca.markets/v2/positions"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }
    
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 204:
        data = {'status': 'All positions deleted successfully'}
    elif response.status_code == 404:
        data = {'error': 'No positions found', 'status_code': response.status_code}
    else:
        data = {'error': 'Failed to delete positions', 'status_code': response.status_code, 'message': response.text}
    
    return Response(data)

@api_view(['POST'])
def get_position_info(request):
    asset_id = request.data.get('asset_id')
    symbol = request.data.get('symbol')

    if not asset_id and not symbol:
        return Response(
            {'error': 'Either asset_id or symbol is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    identifier = asset_id if asset_id else symbol
    url = f"https://paper-api.alpaca.markets/v2/positions/{identifier}"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve position info',
            'status_code': response.status_code,
            'message': response.text
        }

    return Response(data)

# For assets
@api_view(['GET'])
def get_assets(request):
    url = "https://paper-api.alpaca.markets/v2/assets"
    # url = "https://api.alpaca.markets/v2/orders"

    headers = {
        "accept": "application/json",
        # "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to fetch assets',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['POST'])
def get_asset_info(request):
    asset_id = request.data.get('id')
    symbol = request.data.get('symbol')
    # We can accept either id or symbol

    if not asset_id and not symbol:
        return Response(
            {'error': 'Either id or symbol is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    identifier = asset_id if asset_id else symbol
    url = f"https://paper-api.alpaca.markets/v2/assets/{identifier}"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve asset info',
            'status_code': response.status_code,
            'message': response.text
        }

    return Response(data)

@api_view(['GET'])
def get_contracts(request):
    url = "https://paper-api.alpaca.markets/v2/options/contracts"
    # url = "https://api.alpaca.markets/v2/orders"

    headers = {
        "accept": "application/json",
        # "content-type": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to fetch contracts',
            'status_code': response.status_code,
            'message': response.text
        }
    
    return Response(data)

@api_view(['POST'])
def get_contract_info(request):
    contract_id = request.data.get('id')
    symbol = request.data.get('symbol')
    # We can accept either id or symbol

    if not contract_id and not symbol:
        return Response(
            {'error': 'Either id or symbol is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    identifier = contract_id if contract_id else symbol
    url = f"https://paper-api.alpaca.markets/v2/options/contracts/{identifier}"
    headers = {
        "accept": "application/json",
        "APCA-API-KEY-ID": APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": APCA_API_SECRET_KEY
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
    else:
        data = {
            'error': 'Failed to retrieve contract info',
            'status_code': response.status_code,
            'message': response.text
        }

    return Response(data)