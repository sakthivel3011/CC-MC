# CC-MC AI Chatbot - Google Sheets Integration Setup

## 🚀 Features

Your new AI chatbot includes:

✅ **Fixed bottom-right positioning** - Appears on all pages  
✅ **Circular red design** with modern animations  
✅ **Smart responses** for coordinator info, events, contacts  
✅ **Google Sheets integration** for real-time data  
✅ **AOS animations** with enhanced effects  
✅ **Mobile responsive** design  
✅ **Unread message counter**  
✅ **Quick action buttons**  

## 📊 Google Sheets Setup

### Step 1: Create Google Sheets

Create a Google Sheet with these tabs:

#### **Coordinators Sheet** (Name: "Coordinators")
| Name | Role | Contact | Email | Department |
|------|------|---------|-------|------------|
| John Doe | President | +91 9876543210 | john@example.com | CSE |
| Jane Smith | Vice President | +91 9876543211 | jane@example.com | ECE |

#### **Events Sheet** (Name: "Events")  
| Name | Date | Venue | Contact | Description | Status |
|------|------|-------|---------|-------------|--------|
| Onam Celebration | 2025-09-15 | Main Auditorium | John Doe | Traditional celebration | upcoming |
| Raaga 2025 | 2025-11-20 | College Ground | Jane Smith | Music festival | upcoming |

#### **Contacts Sheet** (Name: "Contacts")
| Type | Value | Description | Priority |
|------|-------|-------------|----------|
| email | ccmc@kongu.edu | Official club email | high |
| phone | +91 4294 226000 | College main line | high |
| address | Kongu Engineering College, Perundurai | College address | normal |

### Step 2: Google Sheets API Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google Sheets API**:
   - Navigate to "APIs & Services" > "Library"
   - Search "Google Sheets API" and enable it
4. **Create API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

### Step 3: Configure the Bot

1. **Open** `src/services/GoogleSheetsService.js`
2. **Replace** the configuration:

```javascript
const GOOGLE_SHEETS_CONFIG = {
  apiKey: 'YOUR_ACTUAL_API_KEY_HERE', // Replace with your API key
  spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE', // Replace with your sheet ID
  sheets: {
    coordinators: 'Coordinators!A:E',
    events: 'Events!A:F', 
    contacts: 'Contacts!A:D'
  }
};
```

3. **Get Spreadsheet ID**: From your Google Sheets URL
   - URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

### Step 4: Make Sheet Public (Read-only)

1. **Open your Google Sheet**
2. **Click Share** button
3. **Change permissions**: "Anyone with the link" > "Viewer"
4. **Copy the link** (optional, for reference)

## 🎨 Customization Options

### Change Colors
Edit `src/assets/styles/AIChatbot.css`:

```css
/* Change main bot color from red to blue */
.chat-button {
  background: linear-gradient(135deg, #3182ce, #2c5282); /* Blue instead of red */
}

/* Change quick action hover colors */
.quick-actions button:hover {
  background: linear-gradient(135deg, #3182ce, #2c5282); /* Blue theme */
}
```

### Modify Responses
Edit `src/components/AIChatbot.jsx` in the `generateBotResponse` function:

```javascript
// Add custom responses
if (input.includes('fees') || input.includes('cost')) {
  return `💰 Membership is FREE! Just join and enjoy all activities! 🎉`;
}
```

### Add More Quick Actions
```javascript
<button onClick={() => setInputText('Club fees information')}>
  <FaDollarSign /> Fees
</button>
```

## 🔧 Testing

1. **Start development server**: `npm run dev`
2. **Look for red circular button** at bottom-right
3. **Click to open** chat window
4. **Test queries**:
   - "Who are the coordinators?"
   - "What events are coming up?"
   - "Contact information"
   - "How do I join?"

## 📱 Mobile Experience

The chatbot is fully responsive:
- **Smaller button** on mobile
- **Full-width chat** on small screens  
- **Touch-friendly** interactions
- **Optimized animations**

## 🚨 Troubleshooting

### Bot shows "Loading..." forever
- Check Google Sheets API key
- Verify spreadsheet ID
- Ensure sheet is publicly readable

### No responses from bot
- Check browser console for errors
- Verify sheet tab names match exactly
- Check API quotas in Google Cloud Console

### Styling issues
- Clear browser cache
- Check for CSS conflicts
- Verify AOS library is loaded

## 🎯 Next Steps

1. **Update Google Sheets** with real coordinator/event data
2. **Test on mobile** devices
3. **Customize colors** to match your brand
4. **Add more response patterns** based on user questions
5. **Monitor usage** and improve responses

## 💡 Pro Tips

- **Regular Updates**: Keep Google Sheets data current
- **Response Training**: Monitor user questions and add patterns
- **Performance**: Data is cached for 5 minutes to improve speed
- **Fallback**: Bot works even if Google Sheets is unavailable

Your AI chatbot is now ready to assist users with CC-MC information! 🎭✨