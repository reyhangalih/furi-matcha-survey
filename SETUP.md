# furi. matcha survey — setup

## 1. Connect it to a Google Sheet (so answers land in Sheets)

1. Create a new Google Sheet (sheets.new).
2. Extensions → Apps Script.
3. Delete the placeholder code, paste in the contents of `apps-script.gs`.
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click Deploy, authorize it (it's your own script), then copy the **Web app URL** it gives you.
6. Open `index.html`, find this line near the bottom (`<script>` section):
   ```js
   var ENDPOINT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
   Replace the placeholder with the URL you copied.

A sheet tab called "Responses" will be created automatically on the first submission, with headers.

**Test it:** open `index.html` locally in a browser, fill out the form, submit, then check the Sheet — a new row should appear within a few seconds.

> Note: if you ever edit `apps-script.gs` again, you need to do **Deploy → Manage deployments → Edit → New version** for the changes to go live — saving alone doesn't republish it.

## 2. Deploy to Vercel

Easiest path (no CLI needed):

1. Go to vercel.com → **Add New → Project**.
2. Choose "Deploy without Git" / drag-and-drop, and drag in this folder (or just `index.html`).
3. Deploy. Vercel will serve `index.html` as a static site — no build step needed.

Or with the CLI, from this folder:
```
npx vercel
```
Follow the prompts (link/create a project, accept defaults for a static site).

## 3. Swap in the real logo (optional)

The intro/closing screens currently use a simple scribble-circle drawn in CSS/SVG as a placeholder for the furi. mark. To use your real logo:
1. Save your logo as `logo.png` in this folder.
2. In `index.html`, replace each `<div class="logo-mark">...</div>` block with:
   ```html
   <img src="logo.png" alt="furi." style="width:88px;height:88px;border-radius:50%;">
   ```

## Notes

- No sign-in, name, email, or phone number is ever collected.
- A hidden honeypot field silently discards obvious bot spam.
- Fully mobile-responsive, single page, ~2 minute flow matching your 8-screen spec.
