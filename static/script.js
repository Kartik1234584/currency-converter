// ============================================
// Currency Converter - JavaScript
// ============================================

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const errorMessage = document.getElementById('errorMessage');
const resultSection = document.getElementById('resultSection');
const themeToggle = document.getElementById('themeToggle');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const currenciesList = document.getElementById('currenciesList');

// Data
let currencies = {};
let conversionHistory = [];

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Currency Converter App Initialized');
    
    // Load saved theme
    loadTheme();
    
    // Fetch currencies
    fetchCurrencies();
    
    // Load history
    loadHistory();
    
    // Event Listeners
    convertBtn.addEventListener('click', performConversion);
    swapBtn.addEventListener('click', swapCurrencies);
    themeToggle.addEventListener('click', toggleTheme);
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Tab switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Allow Enter key to convert
    amountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performConversion();
    });
    
    // Real-time currency symbol update
    fromCurrencySelect.addEventListener('change', updateCurrencySymbol);
});

// ============================================
// Currency Functions
// ============================================

async function fetchCurrencies() {
    try {
        const response = await fetch('/api/currencies');
        currencies = await response.json();
        
        // Populate dropdowns
        populateDropdowns();
        
        // Populate info section
        populateCurrenciesList();
        
        console.log('✅ Currencies loaded:', Object.keys(currencies).length);
    } catch (error) {
        console.error('❌ Error fetching currencies:', error);
        showError('Failed to load currencies');
    }
}

function populateDropdowns() {
    // Clear dropdowns
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';
    
    // Add options
    Object.entries(currencies).forEach(([code, name]) => {
        const option1 = document.createElement('option');
        option1.value = code;
        option1.textContent = `${code} - ${name}`;
        fromCurrencySelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = code;
        option2.textContent = `${code} - ${name}`;
        toCurrencySelect.appendChild(option2);
    });
    
    // Set defaults
    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
    updateCurrencySymbol();
}

function populateCurrenciesList() {
    currenciesList.innerHTML = '';
    Object.entries(currencies).forEach(([code, name]) => {
        const badge = document.createElement('div');
        badge.className = 'currency-badge';
        badge.innerHTML = `<strong>${code}</strong><br>${name}`;
        currenciesList.appendChild(badge);
    });
}

function updateCurrencySymbol() {
    const currencyCode = fromCurrencySelect.value;
    const symbolMap = {
        'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥',
        'AUD': 'A$', 'CAD': 'C$', 'CHF': 'CHF', 'CNY': '¥',
        'INR': '₹', 'MXN': '$', 'SGD': 'S$', 'HKD': 'HK$',
        'NZD': 'NZ$', 'BRL': 'R$', 'ZAR': 'R', 'RUB': '₽',
        'KRW': '₩', 'SEK': 'kr', 'NOK': 'kr', 'DKK': 'kr'
    };
    
    const symbolEl = document.querySelector('.currency-symbol');
    if (symbolEl) {
        symbolEl.textContent = symbolMap[currencyCode] || '$';
    }
}

// ============================================
// Conversion Functions
// ============================================

async function performConversion() {
    // Clear previous error
    hideError();
    
    const amount = amountInput.value.trim();
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    
    // Validation
    if (!amount) {
        showError('Please enter an amount');
        return;
    }
    
    if (fromCurrency === toCurrency) {
        showError('Please select different currencies');
        return;
    }
    
    // Disable button during request
    convertBtn.disabled = true;
    convertBtn.textContent = 'Converting...';
    
    try {
        const response = await fetch('/api/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                from_currency: fromCurrency,
                to_currency: toCurrency
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayResult(data);
            addToHistory(data);
        } else {
            showError(data.error || 'Conversion failed');
        }
    } catch (error) {
        console.error('❌ Conversion error:', error);
        showError('Network error. Please check your connection.');
    } finally {
        convertBtn.disabled = false;
        convertBtn.textContent = 'Convert';
    }
}

function displayResult(data) {
    document.getElementById('resultAmount').textContent = data.amount.toFixed(2);
    document.getElementById('resultFromCurrency').textContent = data.from_currency;
    document.getElementById('resultConverted').textContent = data.converted_amount;
    document.getElementById('resultToCurrency').textContent = data.to_currency;
    document.getElementById('exchangeRate').textContent = data.exchange_rate.toFixed(6);
    document.getElementById('rateFromCurrency').textContent = data.from_currency;
    document.getElementById('rateToCurrency').textContent = data.to_currency;
    
    // Update source info
    const sourceInfo = document.getElementById('sourceInfo');
    if (data.source === 'live') {
        sourceInfo.textContent = '✅ Live exchange rate (updated in real-time)';
        sourceInfo.className = 'source-info live';
    } else if (data.source === 'cached') {
        sourceInfo.textContent = '⚠️ Cached rate (offline mode)';
        sourceInfo.className = 'source-info cached';
    } else if (data.source === 'same') {
        sourceInfo.textContent = '🔄 Same currency';
        sourceInfo.className = 'source-info';
    }
    
    // Show result section
    resultSection.style.display = 'block';
}

function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    updateCurrencySymbol();
    
    // Auto-convert if we have a result
    if (resultSection.style.display !== 'none') {
        performConversion();
    }
}

// ============================================
// History Functions
// ============================================

async function loadHistory() {
    try {
        const response = await fetch('/api/history');
        conversionHistory = await response.json();
        displayHistory();
    } catch (error) {
        console.error('❌ Error loading history:', error);
    }
}

function addToHistory(conversion) {
    conversionHistory.unshift(conversion);
    displayHistory();
}

function displayHistory() {
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No conversions yet. Start converting!</p>';
        return;
    }
    
    historyList.innerHTML = conversionHistory.slice(0, 20).map((item, index) => {
        const date = new Date(item.timestamp);
        const timeStr = date.toLocaleTimeString();
        
        return `
            <div class="history-item">
                <div>
                    <div class="history-conversion">
                        <span><strong>${item.amount.toFixed(2)} ${item.from_currency}</strong></span>
                        <span class="history-arrow">→</span>
                        <span><strong>${item.converted_amount} ${item.to_currency}</strong></span>
                    </div>
                    <small class="history-time">${timeStr}</small>
                </div>
                <small style="color: var(--text-muted);">Rate: ${item.exchange_rate.toFixed(4)}</small>
            </div>
        `;
    }).join('');
}

async function clearHistory() {
    if (!confirm('Are you sure you want to clear the conversion history?')) {
        return;
    }
    
    try {
        const response = await fetch('/api/clear-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        if (data.success) {
            conversionHistory = [];
            displayHistory();
            console.log('✅ History cleared');
        }
    } catch (error) {
        console.error('❌ Error clearing history:', error);
    }
}

// ============================================
// UI Functions
// ============================================

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    resultSection.style.display = 'none';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function switchTab(tabName) {
    // Update active button
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update active content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
            content.classList.add('active');
        }
    });
}

// ============================================
// Theme Toggle
// ============================================

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update button
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    console.log(`🌓 Theme switched to ${isDarkMode ? 'Dark' : 'Light'} mode`);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }
}

// ============================================
// Utility Functions
// ============================================

// Format currency for display
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Log app info
console.log(`
╔════════════════════════════════════╗
║   Currency Converter App           ║
║   Version 1.0.0                   ║
║   Ready to convert! 💱            ║
╚════════════════════════════════════╝
`);
