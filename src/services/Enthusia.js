// Google Apps Script Code for Google Sheets Integration
// This code should be deployed as a Google Apps Script web app

// Google Apps Script (GAS) Code - Copy this to your Google Apps Script project
/*
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'submitRegistration') {
      return submitRegistration(data.data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getRegistrations') {
      return getRegistrations();
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function submitRegistration(registrationData) {
  try {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('EnthuisiaRegistrations') || 
                  spreadsheet.insertSheet('EnthuisiaRegistrations');
    
    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Event Name',
        'Event Category',
        'Registration Fee',
        'Team Size',
        'Team Leader Name',
        'Team Leader Roll No',
        'Team Leader Department',
        'Team Leader Year',
        'Team Leader Contact',
        'Team Leader Email',
        'Team Members Data',
        'Registration ID'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Generate registration ID
    const registrationId = 'ENT' + Date.now().toString().slice(-6);
    
    // Prepare team members data
    const teamMembersData = registrationData.teamMembers.map(member => ({
      name: member.name,
      rollNo: member.rollNo,
      department: member.department,
      year: member.year,
      contact: member.contact,
      email: member.email
    }));
    
    // Prepare row data
    const rowData = [
      registrationData.timestamp,
      registrationData.eventName,
      registrationData.eventCategory,
      registrationData.registrationFee,
      registrationData.teamSize,
      registrationData.teamLeader.name,
      registrationData.teamLeader.rollNo,
      registrationData.teamLeader.department,
      registrationData.teamLeader.year,
      registrationData.teamLeader.contact,
      registrationData.teamLeader.email,
      JSON.stringify(teamMembersData),
      registrationId
    ];
    
    // Add row to sheet
    sheet.appendRow(rowData);
    
    // Send confirmation email (optional)
    try {
      const subject = `Enthusia 2025 Registration Confirmation - ${registrationData.eventName}`;
      const body = `
Dear ${registrationData.teamLeader.name},

Thank you for registering for Enthusia 2025!

Registration Details:
- Event: ${registrationData.eventName}
- Category: ${registrationData.eventCategory.toUpperCase()}
- Registration ID: ${registrationId}
- Team Size: ${registrationData.teamSize}
- Registration Fee: ₹${registrationData.registrationFee}

Event Schedule:
- Date: February 15-16, 2025
- Venue: Kongu Engineering College
- Time: 9:00 AM onwards

Important Notes:
- Please bring a printout of this confirmation email on the event day
- Report to the registration desk 30 minutes before your event
- Contact us at enthusia@kec.edu.in for any queries

Best regards,
Enthusia 2025 Organizing Committee
Kongu Engineering College
      `;
      
      MailApp.sendEmail(registrationData.teamLeader.email, subject, body);
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Registration successful!',
        registrationId: registrationId
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Registration failed: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getRegistrations() {
  try {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('EnthuisiaRegistrations');
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    const registrations = rows.map(row => {
      const registration = {};
      headers.forEach((header, index) => {
        registration[header] = row[index];
      });
      return registration;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: registrations }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Failed to fetch registrations: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Additional utility functions
function getEventStatistics() {
  try {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('EnthuisiaRegistrations');
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: {} }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    const stats = {
      totalRegistrations: rows.length,
      eventBreakdown: {},
      categoryBreakdown: {},
      totalRevenue: 0
    };
    
    rows.forEach(row => {
      const eventName = row[headers.indexOf('Event Name')];
      const category = row[headers.indexOf('Event Category')];
      const fee = row[headers.indexOf('Registration Fee')];
      
      // Event breakdown
      stats.eventBreakdown[eventName] = (stats.eventBreakdown[eventName] || 0) + 1;
      
      // Category breakdown
      stats.categoryBreakdown[category] = (stats.categoryBreakdown[category] || 0) + 1;
      
      // Total revenue
      stats.totalRevenue += fee || 0;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: stats }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Failed to fetch statistics: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

// Client-side JavaScript for the React application
export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// Email configuration
export const EMAIL_CONFIG = {
  SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
  TEMPLATE_ID: 'YOUR_EMAILJS_TEMPLATE_ID',
  USER_ID: 'YOUR_EMAILJS_USER_ID'
};

// Submit registration to Google Sheets
export const submitToGoogleSheets = async (registrationData) => {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'submitRegistration',
        data: registrationData
      }),
      mode: 'cors'
    });

    const result = await response.json();
    
    if (result.success) {
      return {
        success: true,
        message: result.message,
        registrationId: result.registrationId
      };
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Google Sheets submission error:', error);
    throw new Error('Failed to submit registration. Please try again.');
  }
};

// Get all registrations from Google Sheets
export const getRegistrationsFromSheets = async () => {
  try {
    const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=getRegistrations`, {
      method: 'GET',
      mode: 'cors'
    });

    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to fetch registrations:', error);
    throw error;
  }
};

// Get event statistics
export const getEventStatistics = async () => {
  try {
    const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=getEventStatistics`, {
      method: 'GET',
      mode: 'cors'
    });

    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    throw error;
  }
};

// Send confirmation email using EmailJS (alternative to Google Apps Script email)
export const sendConfirmationEmail = async (emailData) => {
  try {
    // Import EmailJS dynamically
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      to_name: emailData.teamLeaderName,
      to_email: emailData.teamLeaderEmail,
      event_name: emailData.eventName,
      registration_id: emailData.registrationId,
      team_size: emailData.teamSize,
      registration_fee: emailData.registrationFee,
      event_category: emailData.eventCategory
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAIL_CONFIG.USER_ID
    );

    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Validate registration data before submission
export const validateRegistrationData = (data) => {
  const errors = [];

  // Team leader validation
  if (!data.teamLeader.name?.trim()) {
    errors.push('Team leader name is required');
  }
  
  if (!data.teamLeader.rollNo?.trim()) {
    errors.push('Team leader roll number is required');
  }
  
  if (!data.teamLeader.email?.trim() || !/\S+@\S+\.\S+/.test(data.teamLeader.email)) {
    errors.push('Valid team leader email is required');
  }
  
  if (!data.teamLeader.contact?.trim() || !/^\d{10}$/.test(data.teamLeader.contact)) {
    errors.push('Valid 10-digit contact number is required');
  }

  // Team members validation for group events
  if (data.teamMembers && data.teamMembers.length > 0) {
    data.teamMembers.forEach((member, index) => {
      if (!member.name?.trim()) {
        errors.push(`Team member ${index + 1} name is required`);
      }
      if (!member.rollNo?.trim()) {
        errors.push(`Team member ${index + 1} roll number is required`);
      }
      if (!member.contact?.trim() || !/^\d{10}$/.test(member.contact)) {
        errors.push(`Team member ${index + 1} valid contact number is required`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Local storage utilities for draft saving
export const saveDraftRegistration = (eventId, formData) => {
  try {
    const drafts = JSON.parse(localStorage.getItem('enthusia_drafts') || '{}');
    drafts[eventId] = {
      ...formData,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('enthusia_drafts', JSON.stringify(drafts));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
};

export const getDraftRegistration = (eventId) => {
  try {
    const drafts = JSON.parse(localStorage.getItem('enthusia_drafts') || '{}');
    return drafts[eventId] || null;
  } catch (error) {
    console.error('Failed to get draft:', error);
    return null;
  }
};

export const clearDraftRegistration = (eventId) => {
  try {
    const drafts = JSON.parse(localStorage.getItem('enthusia_drafts') || '{}');
    delete drafts[eventId];
    localStorage.setItem('enthusia_drafts', JSON.stringify(drafts));
  } catch (error) {
    console.error('Failed to clear draft:', error);
  }
};

// Payment integration placeholder
export const initiatePayment = async (paymentData) => {
  // This would integrate with a payment gateway like Razorpay, Stripe, etc.
  // For now, we'll simulate a payment process
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would:
    // 1. Create payment order with payment gateway
    // 2. Open payment modal
    // 3. Handle payment success/failure
    // 4. Update registration status
    
    return {
      success: true,
      transactionId: 'TXN' + Date.now(),
      amount: paymentData.amount,
      status: 'completed'
    };
  } catch (error) {
    console.error('Payment failed:', error);
    throw new Error('Payment processing failed');
  }
};

// Export all functions as default
export default {
  submitToGoogleSheets,
  getRegistrationsFromSheets,
  getEventStatistics,
  sendConfirmationEmail,
  validateRegistrationData,
  saveDraftRegistration,
  getDraftRegistration,
  clearDraftRegistration,
  initiatePayment
};