# Google Apps Script Setup for Enthusia Registration

This guide will help you set up the Google Apps Script to handle event registrations and store data in Google Sheets.

## Step 1: Create a Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the content from `src/Enthusia/server/RegistrationHandler.js`
4. Save the project with name "Enthusia Registration Handler"

## Step 2: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Enthusia 2025 - Event Registrations"
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
5. Update the `SPREADSHEET_ID` variable in your Apps Script code

## Step 3: Create a Google Drive Folder (Optional)

1. Go to [Google Drive](https://drive.google.com/)
2. Create a new folder named "Enthusia 2025 Data"
3. Copy the folder ID from the URL
4. Update the `FOLDER_ID` variable in your Apps Script code

## Step 4: Deploy the Apps Script as a Web App

1. In your Apps Script project, click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Set the following configuration:
   - Execute as: "Me"
   - Who has access: "Anyone" (for public form submissions)
4. Click "Deploy"
5. Copy the Web App URL
6. Update the registration form to use this URL

## Step 5: Update the Registration Form

In `src/Enthusia/components/ERegistrationForm.jsx`, replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your actual Web App URL:

```javascript
const response = await fetch('YOUR_WEB_APP_URL_HERE', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(registrationData)
});
```

## Step 6: Test the Registration System

1. Run the `testRegistration()` function in Apps Script to verify setup
2. Submit a test registration through your website
3. Check if data appears in your Google Sheets
4. Verify that confirmation emails are sent

## Features Included

### Automatic Sheet Creation
- Each event gets its own sheet in the spreadsheet
- Sheets are named with event ID and name for easy identification
- Headers are automatically formatted and styled

### Data Storage
- All registration data is stored systematically
- Team leader details, sub-leaders, and team members are tracked
- Unique registration IDs are generated for each submission

### Email Confirmations
- Professional HTML email confirmations sent to team leaders
- Includes all registration details and important information
- Branded with Enthusia theme and colors

### Registration Statistics
- Built-in function to get registration statistics
- Track total registrations per event
- Monitor overall participation numbers

## Customization Options

### Email Templates
You can customize the email confirmation template in the `sendConfirmationEmail()` function to match your requirements.

### Data Fields
Add or modify form fields by updating both the frontend form and the `storeRegistrationData()` function.

### Validation Rules
Add server-side validation in the `doPost()` function for additional data integrity.

## Security Considerations

1. **CORS Settings**: The Apps Script is configured to accept requests from any domain. For production, consider restricting to your domain only.

2. **Data Validation**: Always validate incoming data before storing it.

3. **Error Handling**: The script includes comprehensive error handling to prevent crashes.

4. **Email Privacy**: Team leader emails are only used for confirmation emails and not shared.

## Troubleshooting

### Common Issues

1. **403 Forbidden Error**: Check deployment permissions and access settings
2. **Email Not Sending**: Verify Gmail quota and script permissions
3. **Data Not Storing**: Check spreadsheet ID and sheet creation permissions
4. **CORS Errors**: Ensure proper deployment configuration

### Debug Tips

1. Use `console.log()` statements in Apps Script for debugging
2. Check the Apps Script execution log for errors
3. Test individual functions separately before full integration
4. Verify all IDs (spreadsheet, folder) are correct

## Support

For additional help with Google Apps Script integration:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Reference](https://developers.google.com/sheets/api)
- [Gmail Service Documentation](https://developers.google.com/apps-script/reference/gmail)

## Sample Registration Flow

1. User fills out registration form on website
2. Form data is sent to Google Apps Script via POST request
3. Script validates data and generates unique registration ID
4. Data is stored in appropriate event sheet
5. Confirmation email is sent to team leader
6. Success response is sent back to website
7. User sees confirmation message

This setup provides a robust, scalable solution for managing event registrations with automatic data storage and email confirmations.