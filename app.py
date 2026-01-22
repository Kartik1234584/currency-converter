"""
Currency Converter Web Application
A simple web app that converts between different currencies using real-time exchange rates
"""

from flask import Flask, render_template, request, jsonify
import requests
import json
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# API Configuration
API_KEY = os.getenv('EXCHANGE_RATE_API_KEY', '')
API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/'

# File to store conversion history
HISTORY_FILE = 'conversion_history.json'
CACHE_FILE = 'exchange_rates_cache.json'

# Supported currencies
CURRENCIES = {
    'USD': 'US Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'AUD': 'Australian Dollar',
    'CAD': 'Canadian Dollar',
    'CHF': 'Swiss Franc',
    'CNY': 'Chinese Yuan',
    'INR': 'Indian Rupee',
    'MXN': 'Mexican Peso',
    'SGD': 'Singapore Dollar',
    'HKD': 'Hong Kong Dollar',
    'NZD': 'New Zealand Dollar',
    'BRL': 'Brazilian Real',
    'ZAR': 'South African Rand',
    'RUB': 'Russian Ruble',
    'KRW': 'South Korean Won',
    'SEK': 'Swedish Krona',
    'NOK': 'Norwegian Krone',
    'DKK': 'Danish Krone'
}


def load_history():
    """Load conversion history from file"""
    try:
        if os.path.exists(HISTORY_FILE):
            with open(HISTORY_FILE, 'r') as f:
                return json.load(f)
    except:
        pass
    return []


def save_history(history):
    """Save conversion history to file"""
    try:
        with open(HISTORY_FILE, 'w') as f:
            json.dump(history, f, indent=2)
    except Exception as e:
        print(f"Error saving history: {e}")


def load_cached_rates():
    """Load cached exchange rates"""
    try:
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, 'r') as f:
                cache = json.load(f)
                return cache.get('rates', {})
    except:
        pass
    return {}


def save_cached_rates(rates):
    """Save exchange rates to cache"""
    try:
        cache = {'rates': rates, 'timestamp': datetime.now().isoformat()}
        with open(CACHE_FILE, 'w') as f:
            json.dump(cache, f, indent=2)
    except Exception as e:
        print(f"Error caching rates: {e}")


def validate_amount(amount_str):
    """Validate and convert amount to float"""
    try:
        amount = float(amount_str)
        if amount < 0:
            return None, "Amount cannot be negative"
        if amount > 1000000000:
            return None, "Amount is too large"
        return amount, None
    except ValueError:
        return None, "Please enter a valid number"


def validate_currency(currency):
    """Validate currency code"""
    if currency not in CURRENCIES:
        return False
    return True


def get_exchange_rate(from_currency, to_currency):
    """
    Fetch exchange rate from API or cache
    Returns: (rate, error_message, source)
    """
    try:
        # Try to fetch from API
        url = f"{API_BASE_URL}{from_currency}"
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            rate = data['rates'].get(to_currency)
            
            if rate:
                # Cache the rates
                save_cached_rates(data['rates'])
                return rate, None, "live"
        
        return None, f"Failed to fetch exchange rate: {response.status_code}", None
    
    except requests.exceptions.Timeout:
        return None, "Request timeout. Using cached rates...", None
    except requests.exceptions.RequestException as e:
        return None, f"API Error: {str(e)}", None
    except Exception as e:
        return None, f"Error: {str(e)}", None


def convert_currency(amount, from_currency, to_currency, use_cache=False):
    """
    Convert currency amount
    Returns: (converted_amount, exchange_rate, error_message, source)
    """
    # Validate inputs
    amount_valid, amount_error = validate_amount(amount)
    if amount_error:
        return None, None, amount_error, None
    
    if not validate_currency(from_currency) or not validate_currency(to_currency):
        return None, None, "Invalid currency selected", None
    
    if from_currency == to_currency:
        return amount_valid, 1.0, None, "same"
    
    # Get exchange rate
    rate, error, source = get_exchange_rate(from_currency, to_currency)
    
    # If API fails and not using cache, try cache
    if error and not use_cache:
        cached_rates = load_cached_rates()
        if to_currency in cached_rates:
            rate = cached_rates[to_currency]
            source = "cached"
            error = None
    
    if error:
        return None, None, error, None
    
    # Calculate converted amount
    converted_amount = round(amount_valid * rate, 2)
    
    return converted_amount, rate, None, source


@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html', currencies=CURRENCIES)


@app.route('/api/convert', methods=['POST'])
def api_convert():
    """API endpoint for currency conversion"""
    data = request.json
    
    amount = data.get('amount', '')
    from_currency = data.get('from_currency', '').upper()
    to_currency = data.get('to_currency', '').upper()
    
    # Convert currency
    converted, rate, error, source = convert_currency(amount, from_currency, to_currency)
    
    if error:
        return jsonify({
            'success': False,
            'error': error
        }), 400
    
    # Prepare response
    response_data = {
        'success': True,
        'amount': float(amount),
        'from_currency': from_currency,
        'to_currency': to_currency,
        'converted_amount': converted,
        'exchange_rate': rate,
        'source': source,
        'timestamp': datetime.now().isoformat()
    }
    
    # Save to history
    try:
        history = load_history()
        history.insert(0, response_data)
        history = history[:50]  # Keep only last 50 conversions
        save_history(history)
    except:
        pass
    
    return jsonify(response_data)


@app.route('/api/history', methods=['GET'])
def get_history():
    """Get conversion history"""
    history = load_history()
    return jsonify(history)


@app.route('/api/clear-history', methods=['POST'])
def clear_history():
    """Clear conversion history"""
    try:
        save_history([])
        return jsonify({'success': True, 'message': 'History cleared'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@app.route('/api/currencies', methods=['GET'])
def get_currencies():
    """Get list of supported currencies"""
    return jsonify(CURRENCIES)


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Page not found'}), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    # Use Render's assigned PORT when available; default to 5000 locally
    port = int(os.environ.get('PORT', 5000))
    host = '0.0.0.0'

    print("[*] Currency Converter Application Starting...")
    print(f"[*] Listening on http://{host}:{port}")
    print("[!] Make sure you have an internet connection for real-time rates")

    app.run(debug=False, host=host, port=port)
