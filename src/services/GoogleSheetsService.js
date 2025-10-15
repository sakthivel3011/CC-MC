// Google Sheets API integration for AI Chatbot
// Replace with your actual Google Sheets API configuration

const GOOGLE_SHEETS_CONFIG = {
  apiKey: 'YOUR_GOOGLE_SHEETS_API_KEY', // Replace with your API key
  spreadsheetId: 'YOUR_SPREADSHEET_ID', // Replace with your Google Sheets ID
  sheets: {
    coordinators: 'Coordinators!A:E', // Sheet name and range
    events: 'Events!A:F',
    contacts: 'Contacts!A:D'
  }
};

class GoogleSheetsService {
  constructor() {
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  async fetchSheetData(sheetRange) {
    const cacheKey = sheetRange;
    const cachedData = this.cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiry) {
      return cachedData.data;
    }

    try {
      const url = `${this.baseUrl}/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${sheetRange}?key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const values = data.values || [];
      
      // Cache the data
      this.cache.set(cacheKey, {
        data: values,
        timestamp: Date.now()
      });
      
      return values;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      return this.getFallbackData(sheetRange);
    }
  }

  async getCoordinators() {
    const data = await this.fetchSheetData(GOOGLE_SHEETS_CONFIG.sheets.coordinators);
    if (data.length <= 1) return this.getFallbackCoordinators();
    
    return data.slice(1).map(row => ({
      name: row[0] || '',
      role: row[1] || '',
      contact: row[2] || '',
      email: row[3] || '',
      department: row[4] || ''
    }));
  }

  async getEvents() {
    const data = await this.fetchSheetData(GOOGLE_SHEETS_CONFIG.sheets.events);
    if (data.length <= 1) return this.getFallbackEvents();
    
    return data.slice(1).map(row => ({
      name: row[0] || '',
      date: row[1] || '',
      venue: row[2] || '',
      contact: row[3] || '',
      description: row[4] || '',
      status: row[5] || 'upcoming'
    }));
  }

  async getContacts() {
    const data = await this.fetchSheetData(GOOGLE_SHEETS_CONFIG.sheets.contacts);
    if (data.length <= 1) return this.getFallbackContacts();
    
    return data.slice(1).map(row => ({
      type: row[0] || '',
      value: row[1] || '',
      description: row[2] || '',
      priority: row[3] || 'normal'
    }));
  }

  // Fallback data when Google Sheets is not available
  getFallbackCoordinators() {
    return [
      { name: "John Doe", role: "President", contact: "+91 9876543210", email: "john@example.com", department: "CSE" },
      { name: "Jane Smith", role: "Vice President", contact: "+91 9876543211", email: "jane@example.com", department: "ECE" },
      { name: "Mike Johnson", role: "Secretary", contact: "+91 9876543212", email: "mike@example.com", department: "MECH" },
      { name: "Sarah Wilson", role: "Treasurer", contact: "+91 9876543213", email: "sarah@example.com", department: "EEE" }
    ];
  }

  getFallbackEvents() {
    return [
      { name: "Onam Celebration", date: "2025-09-15", venue: "Main Auditorium", contact: "John Doe", description: "Traditional Onam celebration with cultural programs", status: "upcoming" },
      { name: "Raaga 2025", date: "2025-11-20", venue: "College Ground", contact: "Jane Smith", description: "Annual music festival", status: "upcoming" },
      { name: "Cultural Night", date: "2025-12-15", venue: "Main Hall", contact: "Mike Johnson", description: "Cultural performances by students", status: "upcoming" },
      { name: "Music Competition", date: "2025-10-30", venue: "Auditorium", contact: "Sarah Wilson", description: "Inter-departmental music competition", status: "upcoming" }
    ];
  }

  getFallbackContacts() {
    return [
      { type: "email", value: "ccmc@kongu.edu", description: "Official club email", priority: "high" },
      { type: "phone", value: "+91 4294 226000", description: "College main line", priority: "high" },
      { type: "address", value: "Kongu Engineering College, Perundurai, Tamil Nadu", description: "College address", priority: "normal" }
    ];
  }

  getFallbackData(sheetRange) {
    if (sheetRange.includes('Coordinators')) return this.getFallbackCoordinators();
    if (sheetRange.includes('Events')) return this.getFallbackEvents();
    if (sheetRange.includes('Contacts')) return this.getFallbackContacts();
    return [];
  }
}

export default GoogleSheetsService;