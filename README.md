# 💱 Currency Converter Web Application

A modern, user-friendly web application for converting currencies using real-time exchange rates.

## ✨ Features

- ✅ **Real-time Exchange Rates**: Fetch live currency conversion rates from ExchangeRate-API
- ✅ **20+ Supported Currencies**: Convert between USD, EUR, GBP, JPY, INR, and many more
- ✅ **Conversion History**: Track your recent conversions
- ✅ **Swap Currencies**: Quickly reverse source and target currencies
- ✅ **Offline Fallback**: Uses cached rates when internet is unavailable
- ✅ **Dark/Light Mode**: Toggle between themes for comfortable viewing
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Beautiful UI**: Modern, gradient-based design with smooth animations

## 📸 Screenshots

**Converter Interface:**
- Clean, intuitive input fields
- Real-time conversion results
- Exchange rate display
- Error handling with helpful messages

**History Tab:**
- View recent conversions
- Clear history option
- Timestamp tracking

**About Tab:**
- Feature list
- Supported currencies
- How to use instructions

## 🛠️ Tech Stack

- **Backend**: Python with Flask
- **Frontend**: HTML5 + CSS3 + JavaScript
- **API**: ExchangeRate-API (free tier available)
- **Data Storage**: JSON files (history & cached rates)

## 📋 Prerequisites

- Python 3.7+
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for fetching real-time rates)

## 🚀 Quick Start

### 1. Clone/Download the Project

```bash
cd currencyconvert
```

### 2. Create Virtual Environment (Optional but Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

### 5. Open in Browser

Open your web browser and navigate to:
```
http://localhost:5000
```

## 📖 Usage Guide

### Basic Conversion

1. Enter the amount you want to convert
2. Select the source currency (from)
3. Select the target currency (to)
4. Click the "Convert" button
5. View the result with the exchange rate used

### Swap Currencies

Click the circular **⇄** button to instantly swap the source and target currencies.

### View History

Click the **📋 History** tab to see your recent conversions. Each entry shows:
- Conversion amounts
- Currencies used
- Exchange rate
- Timestamp

### Toggle Theme

Click the **🌙** (moon) button in the top-right corner to switch between light and dark modes.

### Clear History

In the History tab, click "Clear History" to remove all conversion records.

## 🔧 Configuration

### Adding an API Key (Optional)

The application works without an API key, but you can add one for higher rate limits:

1. Sign up for a free account at [ExchangeRate-API](https://www.exchangerate-api.com/)
2. Create a `.env` file in the project root:

```env
EXCHANGE_RATE_API_KEY=your_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

3. Restart the application

### Supported Currencies

The app supports the following 20 currencies:

| Code | Currency | Code | Currency |
|------|----------|------|----------|
| USD | US Dollar | CHF | Swiss Franc |
| EUR | Euro | CNY | Chinese Yuan |
| GBP | British Pound | INR | Indian Rupee |
| JPY | Japanese Yen | MXN | Mexican Peso |
| AUD | Australian Dollar | SGD | Singapore Dollar |
| CAD | Canadian Dollar | HKD | Hong Kong Dollar |
| NZD | New Zealand Dollar | BRL | Brazilian Real |
| ZAR | South African Rand | RUB | Russian Ruble |
| KRW | South Korean Won | SEK | Swedish Krona |
| NOK | Norwegian Krone | DKK | Danish Krone |

## 📁 Project Structure

```
currencyconvert/
├── app.py                    # Flask backend application
├── requirements.txt          # Python dependencies
├── .env.example             # Example environment variables
├── conversion_history.json   # Stored conversion history (auto-created)
├── exchange_rates_cache.json # Cached exchange rates (auto-created)
├── README.md                # This file
├── GETTING_STARTED.md       # Detailed setup instructions
├── templates/
│   └── index.html           # Main HTML template
└── static/
    ├── style.css            # CSS styling
    └── script.js            # JavaScript functionality
```

## 🔄 How It Works

### Backend (Python)

1. **API Request**: When user clicks "Convert", Flask makes a request to ExchangeRate-API
2. **Data Processing**: Exchange rate is fetched and cached
3. **Validation**: Input validation for amount and currency codes
4. **Calculation**: Precise currency conversion using floating-point arithmetic
5. **Response**: JSON response with conversion result and metadata

### Frontend (JavaScript)

1. **User Input**: Captures amount and currency selections
2. **API Call**: Sends conversion request to Flask backend
3. **Result Display**: Shows converted amount and exchange rate
4. **History Tracking**: Stores conversion in browser memory
5. **Theme Persistence**: Saves theme preference in localStorage

### Data Storage

- **History**: Stored in `conversion_history.json` (last 50 conversions)
- **Cache**: Stored in `exchange_rates_cache.json` (for offline use)

## 🌐 API Details

**API Used**: ExchangeRate-API

**Free Tier Limits**:
- 1,500 requests per month
- 8 requests per minute
- Live rates updated daily

**Endpoint**: `https://api.exchangerate-api.com/v4/latest/{currency_code}`

## 🐛 Troubleshooting

### "Failed to fetch exchange rate"

**Solution**: 
- Check your internet connection
- Verify the API service is online
- The app will fall back to cached rates if available

### "Invalid currency selected"

**Solution**:
- Ensure both currencies are selected from the dropdown
- Refresh the page and try again

### Port 5000 Already in Use

**Solution**:
```bash
# Change port in app.py
# Change: app.run(port=5000)
# To: app.run(port=5001)
```

### Virtual Environment Issues

**Solution**:
```bash
# Deactivate and delete venv
deactivate
rmdir venv  # Windows
rm -rf venv  # macOS/Linux

# Create new virtual environment
python -m venv venv
```

## 💡 Learning Outcomes

This project teaches:

- **Python Fundamentals**:
  - Functions and error handling
  - JSON parsing and data structures
  - File I/O operations
  - API request handling

- **Web Development**:
  - Flask framework basics
  - HTTP requests and responses
  - HTML forms and templates
  - CSS styling and responsive design

- **JavaScript**:
  - DOM manipulation
  - Event listeners
  - Async/await for API calls
  - Local storage usage

- **Best Practices**:
  - Code organization and comments
  - Error handling
  - User input validation
  - Security considerations

## 🚀 Bonus Features Implemented

✅ **Swap Currencies Button** - Instantly reverse conversion
✅ **Conversion History** - Track last 50 conversions
✅ **Offline Fallback** - Uses cached rates when offline
✅ **Dark/Light Mode** - Theme toggle with persistence

## 📚 Additional Features You Can Add

1. **Multi-currency Comparison**: Convert to multiple currencies at once
2. **Chart Visualization**: Show exchange rate trends over time
3. **Favorites**: Pin frequently used currency pairs
4. **Email Conversion**: Send conversion results via email
5. **Mobile App**: Convert to React Native or Flutter
6. **Database Integration**: Use SQLite for persistent history
7. **Export Feature**: Download history as CSV/PDF

## 📝 Notes for Internship

This project demonstrates:

✅ Full-stack web development skills
✅ Clean, readable, well-commented code
✅ User-friendly interface design
✅ Error handling and validation
✅ API integration
✅ Responsive design principles
✅ Version control ready (add .gitignore if using Git)

Perfect for:
- Portfolio projects
- Internship applications
- Learning web development
- Practice with Flask and modern JavaScript

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Support

For issues or questions:
1. Check the GETTING_STARTED.md file
2. Review the code comments
3. Test in a different browser
4. Check console for error messages (F12 → Console)

## 🎓 Educational Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Python Requests Library](https://requests.readthedocs.io/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript Tutorial](https://www.javascript.com/)

---

**Happy Converting! 💱✨**

Made by Kartik Sadhu
