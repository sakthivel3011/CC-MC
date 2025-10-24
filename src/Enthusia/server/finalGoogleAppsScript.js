// Configuration
const SHEET_HEADERS = {
  eventSheet: [
    'Registration ID',
    'Timestamp',
    'Team Leader Name',
    'Team Leader Email',
    'Team Leader Phone',
    'Team Leader Department',
    'Team Leader Year',
    'Team Leader Roll No',
    'Total Members',
    'Team Members',
    'Event Category',
    'Event Name',
    'Status'
  ],
  summarySheet: [
    'Event Name',
    'Total Teams',
    'Total Participants',
    'Last Registration',
    'Event Category',
    'Status',
    'Departments',
    'Years'
  ]
};

// Email template for confirmation
const EMAIL_TEMPLATE = {
  subject: "Enthusia 2025 - Event Registration Confirmation",
  getBody: (data) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50;">Registration Confirmed! 🎉</h1>
          <p style="color: #7f8c8d; font-size: 18px;">Your team is all set for ${data.event.name}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2c3e50; margin-bottom: 10px;">Registration Details</h2>
          <p><strong>Registration ID:</strong> ${data.registrationId}</p>
          <p><strong>Event:</strong> ${data.event.name}</p>
          <p><strong>Category:</strong> ${data.event.category}</p>
          <p><strong>Total Team Members:</strong> ${data.totalMembers}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50;">Team Details</h3>
          ${data.participants.map(p => `
            <div style="margin-bottom: 10px;">
              <strong>${p.role}:</strong> ${p.name} (${p.department}, ${p.year})
            </div>
          `).join('')}
        </div>
        
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 6px;">
          <h3 style="color: #2c3e50;">Important Notes</h3>
          <ul style="padding-left: 20px;">
            <li>Keep your Registration ID safe</li>
            <li>Arrive 30 minutes before your event</li>
            <li>Follow all event rules and guidelines</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
          <p>Good luck! 🌟</p>
          <p>For any queries, contact your event coordinator</p>
        </div>
      </div>
    `;
  }
};

function createOrGetSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  
  if (!sheet) {
    sheet = ss.insertSheet(name);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.protect().setDescription('Protected headers');
  }
  
  return sheet;
}

function createResponse(data, code = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doGet(e) {
  if (e.parameter.action === 'getIds') {
    const eventName = e.parameter.event;
    const sheetName = eventName.replace(/[^a-zA-Z0-9]/g, '');
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    let existingIds = [];
    if (sheet && sheet.getLastRow() > 1) {
      existingIds = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1)
        .getValues()
        .map(row => row[0])
        .filter(id => id);
    }
    
    return createResponse({
      status: 'success',
      ids: existingIds
    });
  }
  
  return createResponse({
    status: 'error',
    message: 'Invalid action'
  });
}

function doPost(e) {
  try {
    // Parse incoming data
    const formData = e.postData.contents;
    const data = JSON.parse(formData);
    
    // Setup sheets
    const eventName = data.event.name;
    const sheetName = eventName.replace(/[^a-zA-Z0-9]/g, ''); // Clean sheet name
    const sheet = createOrGetSheet_(sheetName, SHEET_HEADERS.eventSheet);
    const summarySheet = createOrGetSheet_('EventSummary', SHEET_HEADERS.summarySheet);
    
    // Check for duplicates
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existingData = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
      
      // Check if team leader already registered for this event
      const isDuplicateRegistration = existingData.some(row => 
        row[11] === data.event.name && // Same event
        (row[7] === data.rollNo || // Same roll number
         row[3] === data.email) // Same email
      );
      
      // Check if any team member's roll number is already registered for this event
      const memberRollNumbers = data.participants
        .filter(p => p.role !== 'Team Leader')
        .map(p => p.rollNo);
        
      const isDuplicateMember = existingData.some(row => {
        if (row[11] !== data.event.name) return false; // Different event is ok
        const teamMembers = JSON.parse(row[9] || '[]');
        return teamMembers.some(member => 
          memberRollNumbers.includes(member.rollNo)
        );
      });
      
      if (isDuplicateRegistration || isDuplicateMember) {
        return createResponse({
          status: 'error',
          message: 'Duplicate registration found. Team leader or team members are already registered for this event.'
        });
      }
    }
    
    // Format team members data for storage
    const teamMembersData = JSON.stringify(data.participants);
    
    // Add new registration
    const newRow = [
      data.registrationId,
      new Date().toLocaleString(),
      data.name,
      data.email,
      data.phone,
      data.department,
      data.year,
      data.rollNo,
      data.totalMembers,
      teamMembersData,
      data.event.category,
      data.event.name,
      'Active'
    ];
    
    // Send confirmation email
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: EMAIL_TEMPLATE.subject,
        htmlBody: EMAIL_TEMPLATE.getBody(data),
        noReply: true
      });
    } catch (error) {
      console.error('Failed to send email:', error);
    }
    
    sheet.appendRow(newRow);
    
    // Format the new row
    const newRowRange = sheet.getRange(sheet.getLastRow(), 1, 1, newRow.length);
    newRowRange.setWrap(true);
    newRowRange.setVerticalAlignment('top');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, SHEET_HEADERS.eventSheet.length);
    
    // Update summary
    updateEventSummary_(summarySheet, data.event.name, data.event.category);
    
    return createResponse({
      status: 'success',
      message: 'Registration successful',
      registrationId: data.registrationId
    });
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse({
      status: 'error',
      message: 'Registration failed: ' + error.message
    });
  }
}

function updateEventSummary_(summarySheet, eventName, eventCategory) {
  const lastRow = summarySheet.getLastRow();
  let eventRow = -1;
  
  // Find existing event entry
  for (let i = 2; i <= lastRow; i++) {
    if (summarySheet.getRange(i, 1).getValue() === eventName) {
      eventRow = i;
      break;
    }
  }
  
  // Get event sheet data
  const eventSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    eventName.replace(/[^a-zA-Z0-9]/g, '')
  );
  const registrationCount = Math.max(0, eventSheet.getLastRow() - 1);
  
  // Calculate total participants and department/year statistics
  const registrations = eventSheet.getRange(2, 1, registrationCount, eventSheet.getLastColumn()).getValues();
  const departments = new Set();
  const years = new Set();
  let totalParticipants = 0;
  
  registrations.forEach(row => {
    const teamData = JSON.parse(row[9] || '[]');
    departments.add(row[5]); // Team leader department
    years.add(row[6]); // Team leader year
    totalParticipants += parseInt(row[8] || 0); // Total members
    
    teamData.forEach(member => {
      departments.add(member.department);
      years.add(member.year);
    });
  });
  
  const departmentsList = Array.from(departments).join(', ');
  const yearsList = Array.from(years).join(', ');
  
  if (eventRow === -1) {
    // Add new event
    summarySheet.appendRow([
      eventName,
      registrationCount,
      totalParticipants,
      new Date().toLocaleString(),
      eventCategory,
      'Active',
      departmentsList,
      yearsList
    ]);
    eventRow = summarySheet.getLastRow();
  } else {
    // Update existing event
    summarySheet.getRange(eventRow, 1, 1, 8).setValues([[
      eventName,
      registrationCount,
      totalParticipants,
      new Date().toLocaleString(),
      eventCategory,
      'Active',
      departmentsList,
      yearsList
    ]]);
  }
  
  // Format summary sheet
  const dataRange = summarySheet.getRange(2, 1, summarySheet.getLastRow() - 1, SHEET_HEADERS.summarySheet.length);
  dataRange.setVerticalAlignment('middle');
  dataRange.setHorizontalAlignment('center');
  
  // Style improvements
  summarySheet.getRange(1, 1, 1, SHEET_HEADERS.summarySheet.length).setBackground('#4285f4').setFontColor('white').setFontWeight('bold');
  dataRange.setBorder(true, true, true, true, true, true);
  dataRange.setWrap(true);
  
  // Alternating row colors
  const numRows = summarySheet.getLastRow() - 1;
  for (let i = 2; i <= numRows + 1; i++) {
    const rowRange = summarySheet.getRange(i, 1, 1, SHEET_HEADERS.summarySheet.length);
    rowRange.setBackground(i % 2 === 0 ? '#f8f9fa' : '#ffffff');
  }
  
  // Auto-resize columns
  summarySheet.autoResizeColumns(1, SHEET_HEADERS.summarySheet.length);
  
  // Add total row at bottom with improved formatting
  const totalRow = summarySheet.getLastRow() + 1;
  const totalRange = summarySheet.getRange(totalRow, 1, 1, 8);
  totalRange.setValues([[
    'TOTAL',
    `=SUM(B2:B${totalRow-1})`,
    `=SUM(C2:C${totalRow-1})`,
    new Date().toLocaleString(),
    'All Categories',
    '',
    'All',
    'All'
  ]]);
  
  totalRange.setBackground('#34a853');
  totalRange.setFontColor('white');
  totalRange.setFontWeight('bold');
}