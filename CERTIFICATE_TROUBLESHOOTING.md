# Certificate Troubleshooting Guide

## Current Issue
Certificate "View & Download" button not working.

## To Debug:

### 1. Open Browser Console
1. Press F12 (or right-click → Inspect)
2. Go to "Console" tab
3. Click "View & Download Certificate"
4. Look for any red error messages

### 2. Common Issues & Solutions

#### **Issue: Nothing happens when clicking button**
- **Solution:** Check console for JavaScript errors
- Look for errors related to: `Confetti`, `html2canvas`, `jsPDF`

#### **Issue: Certificate view is blank**
- **Solution:** Logo image may not be loading
- Check if `/tune-my-heart-logo.png` exists
- Try removing crossOrigin attribute

#### **Issue: PDF download fails**
- **Solution:** html2canvas or jsPDF error
- Check console for specific error
- Try printing instead of PDF download

### 3. Quick Workaround

If PDF download doesn't work, users can:
1. Click "View & Download Certificate"
2. Click "Print" button instead
3. In print dialog, choose "Save as PDF"

### 4. Browser Compatibility

The feature requires:
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Cookies enabled

### 5. Testing Steps

1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Try in incognito/private window
4. Try different browser

## Error Messages to Look For

- `Cannot find module 'html2canvas'` → Build issue
- `CORS error` → Logo image loading issue  
- `Failed to execute 'toDataURL'` → Canvas security error
- `Confetti is not defined` → react-confetti not loaded

## If Still Not Working

The completion celebration modal DOES work - you can:
- See celebration message ✓
- See confetti animation ✓  
- View stats ✓
- Click "Start Over" ✓

Only the certificate PDF generation may have issues.

## Temporary Solution

Print the certificate directly from the browser print dialog instead of using PDF download.
