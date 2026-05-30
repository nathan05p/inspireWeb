/**
 * Google Apps Script Webhook for Camp 2026 Payments
 * 
 * Paste this script in Extensions > Apps Script in your Google Sheet.
 * Click Deploy > New Deployment. Choose "Web app".
 * Set "Execute as": "Me"
 * Set "Who has access": "Anyone"
 * Click Deploy and copy the Web App URL. Place it in your Vercel/local .env as GOOGLE_SHEETS_WEBHOOK_URL.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not, create them
    if (sheet.getLastRow() === 0) {
      setupProfessionalHeaders(sheet);
    }
    
    var numZile = data.zile === "toate" ? 6 : (data.zileAlese ? data.zileAlese.length : 0);
    var tipPlataStr = "Necunoscut";
    if (data.plata === "integral") {
      tipPlataStr = "Integral (Online)";
    } else if (data.plata === "avans") {
      tipPlataStr = "Avans 180 RON (Online)";
    } else if (data.plata === "cash") {
      tipPlataStr = "⚠️ ACHITĂ LA INFODESK (" + numZile + " zile)";
    }
    
    // Prepare the values row
    var rowData = [
      new Date(), // Timestamp
      data.nume || "",
      data.email || "",
      data.telefon || "",
      data.varsta ? parseInt(data.varsta) : "",
      data.transport || "",
      data.cazareCabana ? "Da" : "Nu",
      tipPlataStr,
      data.plata === "cash" ? 0 : (data.amount_paid ? parseFloat(data.amount_paid) : 0), // Amount Paid in RON
      data.zile === "toate" ? "Toate (6 zile)" : (data.zileAlese ? data.zileAlese.join(", ") : "Zile specifice"),
      data.stripe_session_id || ""
    ];
    
    // Append the row
    sheet.appendRow(rowData);
    
    // Format the newly added row
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, rowData.length);
    
    // Apply professional styles to the row
    applyRowFormatting(sheet, range, lastRow, data.plata);
    
    // Auto-fit columns
    for (var i = 1; i <= rowData.length; i++) {
      sheet.autoResizeColumn(i);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", row: lastRow }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupProfessionalHeaders(sheet) {
  var headers = [
    "Dată Înscriere (Plată)",
    "Nume Complet",
    "Adresă Email",
    "Număr Telefon",
    "Vârstă",
    "Tip Transport",
    "Cazare Cabană?",
    "Tip Plată",
    "Sumă Plătită (RON)",
    "Zile Participare",
    "ID Tranzacție Stripe"
  ];
  
  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  
  // Accountant-style Header Theme: Dark Slate Blue & White Text
  headerRange.setBackground("#2F3542");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Roboto");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  
  // Set row height for headers
  sheet.setRowHeight(1, 32);
}

function applyRowFormatting(sheet, range, rowNum, tipPlata) {
  // Set Font Family & Size
  range.setFontFamily("Roboto");
  range.setFontSize(10);
  range.setVerticalAlignment("middle");
  
  // Row highlighting based on payment type
  if (tipPlata === "cash") {
    // Highlight cash payments with a noticeable yellow/orange background
    range.setBackground("#FFF3CD"); 
    range.setFontColor("#856404");
    range.setFontWeight("bold");
  } else if (rowNum % 2 === 0) {
    // Zebra striping (alternate row colors) for premium readability
    range.setBackground("#F8F9FA"); // Very light gray
    range.setFontColor("#000000");
    range.setFontWeight("normal");
  } else {
    range.setBackground("#FFFFFF");
    range.setFontColor("#000000");
    range.setFontWeight("normal");
  }
  
  // Thin borders around cells
  range.setBorder(true, true, true, true, null, null, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);
  
  // Alignments: Left for text, Center for dates/booleans, Right for numbers
  var alignments = [
    "center", // Date
    "left",   // Name
    "left",   // Email
    "center", // Phone
    "center", // Age
    "center", // Transport
    "center", // Cabin Accommodation
    "center", // Payment Option
    "right",  // Amount Paid
    "left",   // Days
    "center"  // Transaction ID
  ];
  
  for (var col = 1; col <= alignments.length; col++) {
    sheet.getRange(rowNum, col).setHorizontalAlignment(alignments[col - 1]);
  }
  
  // Number Formats
  // Date format: DD.MM.YYYY HH:MM
  sheet.getRange(rowNum, 1).setNumberFormat("dd.MM.yyyy HH:mm");
  
  // Currency format for RON (e.g., 450.00 RON)
  sheet.getRange(rowNum, 9).setNumberFormat('#,##0.00" RON"');
  
  // Text format for phone
  sheet.getRange(rowNum, 4).setNumberFormat("@");
  
  // Set Row Height for data
  sheet.setRowHeight(rowNum, 26);
}
