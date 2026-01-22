# 🔧 Technical Reference

Quick reference for developers and learners.

---

## 🔌 API Endpoints

### GET /
Serves the main HTML page.

### POST /api/convert
Converts currency.

**Request:**
```json
{
  "amount": "100",
  "from_currency": "USD",
  "to_currency": "EUR"
}
```

**Response (Success):**
```json
{
  "success": true,
  "amount": 100,
  "from_currency": "USD",
  "to_currency": "EUR",
  "converted_amount": 92.5,
  "exchange_rate": 0.925,
  "source": "live",
  "timestamp": "2024-01-20T10:30:00"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Amount cannot be negative"
}
```

### GET /api/history
Get conversion history.

**Response:**
```json
[
  {
    "amount": 100,
    "from_currency": "USD",
    "to_currency": "EUR",
    "converted_amount": 92.5,
    "exchange_rate": 0.925,
    "source": "live",
    "timestamp": "2024-01-20T10:30:00"
  }
]
```

### POST /api/clear-history
Clear all history.

**Response:**
```json
{
  "success": true,
  "message": "History cleared"
}
```

### GET /api/currencies
Get all supported currencies.

**Response:**
```json
{
  "USD": "US Dollar",
  "EUR": "Euro",
  ...
}
```

---

## 🐍 Python Functions

### Validation

```python
def validate_amount(amount_str):
    """Returns (amount, error)"""
    return float(amount_str), None  # or (None, error_msg)

def validate_currency(currency):
    """Returns True if valid currency code"""
    return currency in CURRENCIES
```

### Conversion

```python
def convert_currency(amount, from_currency, to_currency):
    """
    Main conversion function
    Returns: (converted_amount, rate, error, source)
    """
```

### API Functions

```python
def get_exchange_rate(from_currency, to_currency):
    """
    Fetch rate from API or cache
    Returns: (rate, error, source)
    """

def load_cached_rates():
    """Load rates from cache file"""

def save_cached_rates(rates):
    """Save rates to cache file"""
```

### History Functions

```python
def load_history():
    """Load history from JSON"""

def save_history(history):
    """Save history to JSON"""
```

---

## 🌐 JavaScript Functions

### API Calls

```javascript
async function performConversion() {
    // POST to /api/convert
    // Display result
    // Add to history
}

async function fetchCurrencies() {
    // GET /api/currencies
    // Populate dropdowns
}

async function loadHistory() {
    // GET /api/history
    // Display history items
}
```

### UI Functions

```javascript
function displayResult(data) {
    // Update result section

function swapCurrencies() {
    // Swap from/to currencies

function showError(message) {
    // Display error message

function switchTab(tabName) {
    // Switch between tabs

function toggleTheme() {
    // Toggle dark/light mode

function loadTheme() {
    // Load saved theme preference
}
```

---

## 📁 File Locations

| Item | Location |
|------|----------|
| History | `conversion_history.json` |
| Cache | `exchange_rates_cache.json` |
| API Key | `.env` file |
| HTML | `templates/index.html` |
| CSS | `static/style.css` |
| JavaScript | `static/script.js` |
| Backend | `app.py` |

---

## 🎨 CSS Classes

```css
/* Main container */
.container
.header
.converter-section
.converter-box

/* Form */
.form-group
.input-wrapper
.currency-symbol

/* Buttons */
.swap-btn
.convert-btn
.theme-toggle
.tab-btn

/* Results */
.result-section
.result-box
.result-item
.rate-info

/* History */
.history-list
.history-item
.history-conversion

/* Tabs */
.tabs
.tab-content

/* Theme */
.dark-mode
```

---

## 📦 Dependencies

```
Flask==2.3.2          Web framework
requests==2.31.0      HTTP library
python-dotenv==1.0.0  Environment variables
```

Install with:
```bash
pip install -r requirements.txt
```

---

## 🌍 Supported Currencies

```python
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
```

---

## 🔑 Environment Variables

Create `.env` file:
```
EXCHANGE_RATE_API_KEY=your_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

---

## 🎯 Configuration Constants

```python
# API
API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/'
API_KEY = os.getenv('EXCHANGE_RATE_API_KEY', '')

# Files
HISTORY_FILE = 'conversion_history.json'
CACHE_FILE = 'exchange_rates_cache.json'

# Limits
MAX_HISTORY = 50
MAX_AMOUNT = 1000000000
```

---

## 🧪 Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Invalid input | Empty amount/currency |
| 400 | Amount cannot be negative | Negative number |
| 400 | Enter valid number | Non-numeric input |
| 400 | Invalid currency | Unknown currency code |
| 400 | API Error | Network/API failure |
| 404 | Page not found | Wrong URL |
| 500 | Internal error | Server error |

---

## 📊 Data Formats

### Amount Format
```
Min: 0
Max: 1000000000
Decimals: 2
```

### Exchange Rate Format
```
Precision: 6 decimal places
Example: 0.925300
```

### Timestamp Format
```
ISO 8601: 2024-01-20T10:30:00
```

---

## 🚀 Startup

```python
if __name__ == '__main__':
    app.run(
        debug=True,
        host='localhost',
        port=5000
    )
```

Access at: `http://localhost:5000`

---

## 🔐 Security

- Input validation on both frontend and backend
- No sensitive data in responses
- HTTPS for API calls
- CSRF protection from Flask
- XSS protection from template rendering

---

## 📈 Performance

- API caching: Avoid repeated calls
- History limit: Last 50 conversions
- Timeout: 5 seconds for API calls
- JSON caching: For offline support

---

## 🐛 Debug Mode

Enable in Flask:
```python
app.run(debug=True)  # Auto-reload on changes
```

Browser console debugging:
- Press F12 → Console tab
- Check console logs
- Monitor network requests

---

## 📱 Responsive Breakpoints

```css
Mobile: < 480px
Tablet: 480px - 768px
Desktop: > 768px
```

---

## 🎓 Key Concepts

| Concept | Example |
|---------|---------|
| **Route** | `@app.route('/api/convert')` |
| **JSON** | `{'amount': 100, ...}` |
| **Async** | `async function performConversion()` |
| **Cache** | Stored in `exchange_rates_cache.json` |
| **DOM** | `document.getElementById('amount')` |
| **Fetch** | `fetch('/api/convert')` |
| **LocalStorage** | `localStorage.setItem('theme', 'dark')` |

---

## 📚 External Resources

- [Flask Docs](https://flask.palletsprojects.com/)
- [ExchangeRate-API](https://www.exchangerate-api.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.com](https://www.javascript.com/)

---

**Quick Reference Ready! 🚀**
