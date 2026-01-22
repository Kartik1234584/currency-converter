# 🚀 Getting Started - Currency Converter

A step-by-step guide to set up and run the Currency Converter application.

## 📌 Prerequisites

Before you begin, make sure you have:

- **Python 3.7 or higher** installed
  - [Download Python](https://www.python.org/downloads/)
  - During installation, **check "Add Python to PATH"**

- **pip** (usually comes with Python)
  - Verify: Open CMD/Terminal and type `pip --version`

- **A modern web browser** (Chrome, Firefox, Safari, or Edge)

- **Text editor** (VS Code, Notepad++, or any text editor)

## ✅ Step-by-Step Installation

### Step 1: Verify Python Installation

Open Command Prompt (Windows) or Terminal (Mac/Linux) and type:

```bash
python --version
```

You should see something like: `Python 3.x.x`

If you see an error, reinstall Python and make sure to check "Add Python to PATH".

### Step 2: Navigate to Project Directory

```bash
cd path/to/currencyconvert
```

**Example (Windows)**:
```bash
cd D:\Priv\MY PROJECTS\SaiKet Intern\currencyconvert
```

### Step 3: Create Virtual Environment (Recommended)

A virtual environment keeps dependencies isolated for this project.

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

After activation, you should see `(venv)` at the beginning of your terminal line.

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- requests (for API calls)
- python-dotenv (for environment variables)

**Expected output**: Installing collected packages: ... Successfully installed ...

### Step 5: Run the Application

```bash
python app.py
```

**Expected output**:
```
🚀 Currency Converter Application Starting...
📍 Open your browser and go to: http://localhost:5000
⚠️  Make sure you have an internet connection for real-time rates
 * Running on http://127.0.0.1:5000
```

### Step 6: Open in Browser

Open your web browser and go to:
```
http://localhost:5000
```

You should see the Currency Converter interface! 🎉

## 🎯 First Conversion

1. **Enter Amount**: Type a number (e.g., 100)
2. **Select Currencies**: 
   - From: USD (should be pre-selected)
   - To: EUR
3. **Click Convert**: Click the "Convert" button
4. **View Result**: See the converted amount and exchange rate

## 🛑 Stopping the Application

Press **Ctrl+C** in the terminal to stop the Flask server.

## 🔧 Configuration (Optional)

### Using with API Key

1. Create a file named `.env` in the project root
2. Add your API key:
```
EXCHANGE_RATE_API_KEY=your_key_here
```
3. Restart the application

Get a free API key from [ExchangeRate-API](https://www.exchangerate-api.com/)

## 🐛 Common Issues & Solutions

### Issue 1: "python: command not found"

**Solution**:
- Python is not in PATH
- Reinstall Python and check "Add Python to PATH"
- Or use `python3` instead of `python`

### Issue 2: "No module named 'flask'"

**Solution**:
```bash
# Make sure virtual environment is activated (you should see (venv))
pip install -r requirements.txt
```

### Issue 3: "Port 5000 already in use"

**Solution**:

Edit `app.py` and change:
```python
app.run(debug=True, host='localhost', port=5000)
```

To:
```python
app.run(debug=True, host='localhost', port=5001)
```

Then visit `http://localhost:5001`

### Issue 4: "Failed to fetch exchange rate"

**Solution**:
- Check internet connection
- API service might be down (rare)
- App will use cached rates if available
- Wait a moment and try again

### Issue 5: "Browser shows 'Connection refused'"

**Solution**:
- Make sure app.py is running in terminal
- Try `http://localhost:5000` again
- Check that Flask server shows "Running on..."

### Issue 6: Can't activate virtual environment

**Windows - If activation fails:**
```bash
# Try PowerShell execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try activating again
venv\Scripts\activate
```

## 📂 Project Layout

After running the app, your folder will have:

```
currencyconvert/
├── venv/                           # Virtual environment (created)
├── app.py                          # Main Python application
├── requirements.txt                # Dependencies list
├── .env                           # Your API key (optional)
├── conversion_history.json        # Auto-generated history
├── exchange_rates_cache.json      # Auto-generated cache
├── README.md                      # Full documentation
├── GETTING_STARTED.md            # This file
├── templates/
│   └── index.html                # Web page
└── static/
    ├── style.css                 # Styling
    └── script.js                 # Frontend logic
```

## 🧪 Testing the Features

### Test 1: Basic Conversion
- Convert 100 USD to EUR
- Should show result instantly

### Test 2: Swap Button
- Click the ⇄ button
- Currencies should swap
- Convert amount should update automatically

### Test 3: History
- Perform 3-4 conversions
- Click "📋 History" tab
- Should see all conversions listed

### Test 4: Dark Mode
- Click 🌙 button (top-right)
- Interface should turn dark
- Refresh page - dark mode should persist

### Test 5: Error Handling
- Try entering "abc" in amount
- Should show error message
- Try same "from" and "to" currency
- Should show error

## 📖 Understanding the Code

### app.py Structure

```python
# 1. Imports and Setup
from flask import Flask

# 2. Configuration
API_BASE_URL = 'https://...'

# 3. Helper Functions
def validate_amount(amount_str):
    # Check if amount is valid

# 4. Routes
@app.route('/')
def index():
    # Serve the main page

@app.route('/api/convert', methods=['POST'])
def api_convert():
    # Handle conversion requests

# 5. Startup
if __name__ == '__main__':
    app.run()
```

### Key Concepts

**API Request**: Gets exchange rates from an external service
```python
response = requests.get(url)
data = response.json()
```

**Validation**: Checks user input before processing
```python
if amount < 0:
    return None, "Amount cannot be negative"
```

**Caching**: Saves rates for offline use
```python
save_cached_rates(data['rates'])
```

## 🎓 Learning Tips

1. **Explore the Code**: Read comments and understand each function
2. **Modify Values**: Try changing supported currencies in CURRENCIES dict
3. **Experiment**: Change colors, fonts, layout in style.css
4. **Add Features**: Try implementing new buttons or UI elements
5. **Debug**: Use browser console (F12 → Console) to see messages

## 🚀 Next Steps

After getting the app running:

1. **Customize**: Change colors, fonts, or layout
2. **Add Features**: Implement more currency pairs
3. **Deploy**: Upload to Heroku, PythonAnywhere, or AWS
4. **Database**: Add SQLite for better history storage
5. **Mobile**: Make it more mobile-friendly

## 📞 Troubleshooting Checklist

- [ ] Python is installed and in PATH
- [ ] Virtual environment is created and activated
- [ ] Requirements are installed (`pip list` shows flask, requests)
- [ ] Flask server is running (see "Running on..." in terminal)
- [ ] Browser is accessing correct URL (http://localhost:5000)
- [ ] No errors in browser console (F12 → Console)
- [ ] Internet connection is active (for real-time rates)

## 🎉 You're Ready!

If you can see the Currency Converter in your browser and successfully convert currencies, you've completed the setup! 

Enjoy converting! 💱✨

---

**Need Help?**
- Check README.md for detailed documentation
- Review code comments
- Check browser console for errors (F12)
- Verify all prerequisites are met

**Questions?** Refer to the FAQ section in README.md
