/**
 * Google Apps Script for Enthusia Event Registration
 * This script handles form submissions and stores data in Google Sheets
 */

// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Google Sheets ID
const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // Replace with your Google Drive folder ID

/**
 * Main function to handle POST requests from the registration form
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Get or create spreadsheet
    const spreadsheet = getOrCreateSpreadsheet();
    
    // Get or create sheet for the specific event
    const sheet = getOrCreateEventSheet(spreadsheet, data.event, data.eventId);
    
    // Process and store the registration data
    const result = storeRegistrationData(sheet, data);
    
    // Send confirmation email
    sendConfirmationEmail(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration successful',
        registrationId: result.registrationId
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing registration:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Registration failed: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests - can be used for testing
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Enthusia Registration API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get existing spreadsheet or create a new one
 */
function getOrCreateSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (error) {
    // If spreadsheet doesn't exist, create a new one
    const spreadsheet = SpreadsheetApp.create('Enthusia 2025 - Event Registrations');
    
    // Move to specified folder if folder ID is provided
    if (FOLDER_ID) {
      const file = DriveApp.getFileById(spreadsheet.getId());
      const folder = DriveApp.getFolderById(FOLDER_ID);
      folder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);
    }
    
    console.log('Created new spreadsheet:', spreadsheet.getId());
    return spreadsheet;
  }
}

/**
 * Get existing event sheet or create a new one
 */
function getOrCreateEventSheet(spreadsheet, eventName, eventId) {
  const sheetName = `Event${eventId}_${eventName.replace(/[^a-zA-Z0-9]/g, '_')}`;
  
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    setupEventSheetHeaders(sheet, eventName);
    console.log('Created new sheet:', sheetName);
  }
  
  return sheet;
}

/**
 * Setup headers for event sheet
 */
function setupEventSheetHeaders(sheet, eventName) {
  const headers = [
    'Registration ID',
    'Timestamp',
    'Event Name',
    'Team Leader Name',
    'Team Leader Roll No',
    'Team Leader Department',
    'Team Leader Year',
    'Team Leader Contact',
    'Team Leader Email',
    'Sub Leaders Count',
    'Sub Leaders Details',
    'Team Members Count',
    'Team Members Details',
    'Total Members',
    'Registration Status'
  ];
  
  // Set headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

/**
 * Store registration data in the sheet
 */
function storeRegistrationData(sheet, data) {
  const registrationId = generateRegistrationId(data.eventId);
  const timestamp = new Date();
  
  // Prepare sub leaders details
  const subLeadersDetails = data.subLeaders.map(leader => 
    `${leader.name} (${leader.rollNo}) - ${leader.contact} - ${leader.email}`
  ).join('; ');
  
  // Prepare team members details
  const teamMembersDetails = data.teamMembers.map(member => 
    `${member.name} (${member.rollNo})`
  ).join('; ');
  
  const rowData = [
    registrationId,
    timestamp,
    data.event,
    data.teamLeader.name,
    data.teamLeader.rollNo,
    data.teamLeader.department,
    data.teamLeader.year,
    data.teamLeader.contact,
    data.teamLeader.email,
    data.subLeaders.length,
    subLeadersDetails,
    data.teamMembers.length,
    teamMembersDetails,
    data.totalMembers,
    'Registered'
  ];
  
  // Add row to sheet
  sheet.appendRow(rowData);
  
  // Format the new row
  const lastRow = sheet.getLastRow();
  const dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);
  dataRange.setBorder(true, true, true, true, true, true);
  
  // Alternate row colors
  if (lastRow % 2 === 0) {
    dataRange.setBackground('#f8f9fa');
  }
  
  console.log('Registration stored:', registrationId);
  
  return {
    registrationId: registrationId,
    rowNumber: lastRow
  };
}

/**
 * Generate unique registration ID
 */
function generateRegistrationId(eventId) {
  const timestamp = new Date().getTime().toString().slice(-6);
  const eventPrefix = eventId.toString().padStart(2, '0');
  return `ENT25-${eventPrefix}-${timestamp}`;
}

/**
 * Send confirmation email to the team leader
 */
function sendConfirmationEmail(data) {
  try {
    const subject = `Enthusia 2025 - Registration Confirmation for ${data.event}`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 2em;">ENTHUSIA 2025</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Registration Confirmation</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Registration Successful! 🎉</h2>
          
          <p>Dear <strong>${data.teamLeader.name}</strong>,</p>
          
          <p>Your registration for <strong>${data.event}</strong> has been successfully received.</p>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="margin-top: 0; color: #667eea;">Registration Details</h3>
            <p><strong>Event:</strong> ${data.event}</p>
            <p><strong>Team Leader:</strong> ${data.teamLeader.name}</p>
            <p><strong>Roll Number:</strong> ${data.teamLeader.rollNo}</p>
            <p><strong>Department:</strong> ${data.teamLeader.department}</p>
            <p><strong>Total Team Members:</strong> ${data.totalMembers}</p>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #2e7d32;">What's Next?</h4>
            <ul style="margin-bottom: 0;">
              <li>Keep this email for your records</li>
              <li>Check event schedule and guidelines</li>
              <li>Prepare for your performance</li>
              <li>Contact coordinators if you have any questions</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #856404;">Important Dates</h4>
            <p style="margin-bottom: 0;"><strong>Event Dates:</strong> March 15-16, 2025<br>
            <strong>Venue:</strong> College Campus<br>
            <strong>Reporting Time:</strong> Will be shared soon</p>
          </div>
          
          <p>For any queries, contact our event coordinators or visit the Enthusia help desk.</p>
          
          <p style="margin-top: 30px;">Best wishes for your performance!</p>
          
          <p><strong>Team Enthusia</strong><br>
          Cultural Club</p>
        </div>
        
        <div style="background: #667eea; padding: 20px; text-align: center;">
          <p style="color: white; margin: 0; font-size: 0.9em;">
            © 2025 Enthusia - Cultural Club. All rights reserved.
          </p>
        </div>
      </div>
    `;
    
    const plainBody = `
      ENTHUSIA 2025 - Registration Confirmation
      
      Dear ${data.teamLeader.name},
      
      Your registration for ${data.event} has been successfully received.
      
      Registration Details:
      - Event: ${data.event}
      - Team Leader: ${data.teamLeader.name}
      - Roll Number: ${data.teamLeader.rollNo}
      - Department: ${data.teamLeader.department}
      - Total Team Members: ${data.totalMembers}
      - Registration Date: ${new Date().toLocaleDateString()}
      
      Event Dates: March 15-16, 2025
      Venue: College Campus
      
      Keep this email for your records and prepare for an amazing performance!
      
      Best wishes,
      Team Enthusia
      Cultural Club
    `;
    
    MailApp.sendEmail({
      to: data.teamLeader.email,
      subject: subject,
      htmlBody: htmlBody,
      body: plainBody
    });
    
    console.log('Confirmation email sent to:', data.teamLeader.email);
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

/**
 * Test function - can be used to test the script
 */
function testRegistration() {
  const testData = {
    event: 'Solo Dance',
    eventId: 4,
    timestamp: new Date().toISOString(),
    teamLeader: {
      name: 'Test Student',
      rollNo: 'CS21001',
      department: 'Computer Science',
      year: '3rd Year',
      contact: '+91 9876543210',
      email: 'test@example.com'
    },
    subLeaders: [],
    teamMembers: [],
    totalMembers: 1
  };
  
  const spreadsheet = getOrCreateSpreadsheet();
  const sheet = getOrCreateEventSheet(spreadsheet, testData.event, testData.eventId);
  const result = storeRegistrationData(sheet, testData);
  
  console.log('Test registration result:', result);
}

/**
 * Function to get registration statistics
 */
function getRegistrationStats() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheets = spreadsheet.getSheets();
    
    const stats = {
      totalEvents: sheets.length,
      totalRegistrations: 0,
      eventStats: []
    };
    
    sheets.forEach(sheet => {
      const sheetName = sheet.getName();
      if (sheetName.startsWith('Event')) {
        const lastRow = sheet.getLastRow();
        const registrations = lastRow > 1 ? lastRow - 1 : 0; // Subtract header row
        
        stats.totalRegistrations += registrations;
        stats.eventStats.push({
          eventName: sheetName,
          registrations: registrations
        });
      }
    });
    
    console.log('Registration Statistics:', stats);
    return stats;
    
  } catch (error) {
    console.error('Error getting statistics:', error);
    return null;
  }
}