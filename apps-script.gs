/**
 * furi. matcha survey — backend
 *
 * Setup:
 * 1. Create a new Google Sheet.
 * 2. Extensions > Apps Script.
 * 3. Delete any starter code, paste this whole file in.
 * 4. Deploy > New deployment > type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL and paste it into ENDPOINT_URL in index.html.
 */

var SHEET_NAME = 'Responses';

var HEADERS = [
  'Timestamp',
  'How often do you drink matcha',
  'Where do you usually buy matcha',
  'Where else (other)',
  'Q1 rating (overall experience)',
  'Q1 what influenced rating',
  'Q1 other',
  'Q2 rating (vs other matcha)',
  'Q2 what makes it different',
  'Q2 other',
  'Q3 what would make them buy regularly',
  'Q3 other',
  'Usual matcha spend',
  'Feeling about our price',
  'Appropriate price (free text)',
  'Purchase intent',
  'Why (reasons)',
  'Why other'
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Ignore obvious bot submissions (honeypot field filled client-side already
    // skips sending, this is just defense in depth).
    if (data.company) {
      return ContentService.createTextOutput(JSON.stringify({ result: 'ignored' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      data.freq || '',
      data.location || '',
      data.location_other || '',
      data.q1_rating || '',
      data.q1_factors || '',
      data.q1_factors_other || '',
      data.q2_rating || '',
      data.q2_diff || '',
      data.q2_diff_other || '',
      data.q3_expect || '',
      data.q3_expect_other || '',
      data.q4_spend || '',
      data.q4_pricefeel || '',
      data.q4_appropriate || '',
      data.q5_intent || '',
      data.q5_reasons || '',
      data.q5_reasons_other || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you sanity-check the deployment URL by opening it in a browser.
function doGet(e) {
  return ContentService.createTextOutput('furi. survey endpoint is live.');
}
