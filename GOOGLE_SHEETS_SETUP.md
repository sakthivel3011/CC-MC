# Google Sheets Setup Instructions for Enthusia Registration

This guide will help you set up Google Sheets integration for the Enthusia event registration system.

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Enthusia 2025 Registrations"
4. Note down the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 2: Set up Google Apps Script

1. In your Google Sheet, go to `Extensions` > `Apps Script`
2. Delete the default `myFunction()` code
3. Copy and paste the Google Apps Script code from `/src/services/Enthusia.js`
4. Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID

## Step 3: Deploy the Web App

1. In Apps Script, click `Deploy` > `New deployment`
2. Choose type: `Web app`
3. Set execute as: `Me`
4. Set access: `Anyone`
5. Click `Deploy`
6. Copy the Web app URL
7. Update `GOOGLE_APPS_SCRIPT_URL` in `/src/assets/enthusia/utils/Enthusia.js`

## Step 4: Set Permissions

1. When first running the script, you'll need to authorize permissions
2. Allow the script to access Google Sheets and Gmail (for sending emails)
3. Review and accept the permissions

## Step 5: Test the Integration

1. Try submitting a test registration from your Enthusia page
2. Check if data appears in your Google Sheet
3. Verify that confirmation emails are sent

## Optional: EmailJS Setup (Alternative Email Service)

If you prefer to use EmailJS instead of Gmail through Apps Script:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Update the EMAIL_CONFIG in `/src/services/Enthusia.js`

## Sheet Structure

The script will automatically create these columns:
- Timestamp
- Event Name
- Event Category
- Registration Fee
- Team Size
- Team Leader Name
- Team Leader Roll No
- Team Leader Department
- Team Leader Year
- Team Leader Contact
- Team Leader Email
- Team Members Data (JSON format)
- Registration ID

## Security Notes

- Keep your Google Apps Script URL private
- Consider adding additional validation in the script
- Regularly backup your registration data
- Monitor the script execution logs for errors

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure the web app is deployed with "Anyone" access
2. **Permission Denied**: Re-authorize the script permissions
3. **Email Not Sending**: Check Gmail quota limits and script permissions
4. **Data Not Saving**: Verify the spreadsheet ID and sheet name

### Checking Logs:
1. Go to Apps Script > Executions
2. View execution logs for errors
3. Check the Google Sheet for successful entries

## Support

For technical issues with Google Apps Script integration, refer to:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)