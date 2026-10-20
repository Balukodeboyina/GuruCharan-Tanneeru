# GuruCharan Tanneeru, PMP® — Pixel-Perfect Resume Website

A modern, high-performance personal resume website built for **GuruCharan Tanneeru, PMP®**, specialized in **AI Implementation, Technical Program Management, and API Integrations**.

The original 3-page master document (`AI Manager_GuruCharan.pdf`) is the single source of truth for all resume content and printing.

---

## Key Features

1. **Exact 3-Page PDF Printing (Zero Fidelity Loss)**:
   - Clicking **Print Resume** opens the original master PDF directly and triggers the native browser print interface.
   - It bypasses website HTML entirely, ensuring that margins, fonts, spacing, alignment, page breaks, and colors match the original 3-page PDF with 100% fidelity.
   - Includes graceful fallback guidance for keyboard printing (`Ctrl + P` / `⌘ + P`).

2. **Unmodified Master PDF Download**:
   - Clicking **Download PDF** provides the exact master PDF file with a clean, recruiter-friendly filename (`GuruCharan_Resume.pdf`).

3. **Dual-Mode Interactive Viewer**:
   - **Native PDF Viewer**: Uses the browser's native PDF viewing engine (`<object>`) with native zoom, pan, and page navigation.
   - **Multi-Page View**: Instant continuous high-DPI rendering of all 3 pages, optimal for mobile devices and uninterrupted reading.
   - **Dedicated Fullscreen Viewer**: Modal view accessible via **View Resume** or **Full View**.

4. **Recruiter-Friendly Hero & Verified Details**:
   - Clean white background with professional navy-blue accents (`#0a192f`, `#1b3a6b`, `#2563eb`).
   - Executive summary and core competencies extracted strictly from the master PDF.
   - Verified contact channels: Phone, Email, Location, LinkedIn, and personal website.

---

## File Structure

```text
d:\charan anna resume\
├── AI Manager_GuruCharan.pdf      # Original unmodified source PDF
├── assets\
│   ├── GuruCharan_Resume.pdf     # Primary authoritative resume asset
│   ├── AI Manager_GuruCharan.pdf # Canonical source duplicate
│   ├── page-1.png                # High-res preview of Page 1
│   ├── page-2.png                # High-res preview of Page 2
│   └── page-3.png                # High-res preview of Page 3
├── css\
│   └── style.css                 # Clean navy & white responsive design
├── js\
│   ├── app.js                    # Main application orchestrator
│   └── components\
│       ├── ResumeHero.js         # Candidate hero & executive overview
│       ├── ResumeActions.js      # Primary action bar
│       ├── ResumePreview.js      # Embedded PDF & continuous preview
│       ├── ResumeViewer.js       # Dedicated full-screen modal viewer
│       ├── PrintResumeButton.js  # High-priority native PDF print trigger
│       └── DownloadResumeButton.js# Direct master PDF download
├── public\                       # Public assets & sync directory
├── index.html                    # Semantic HTML5 entry point
├── server.js                     # Zero-dependency Node.js HTTP server
├── server.py                     # Zero-dependency Python 3 HTTP server
├── package.json                  # Project manifest and scripts
└── README.md                     # Documentation and verification report
```

---

## Running Locally

You can launch the site locally using Node.js or Python without installing third-party dependencies:

### Option A: Using Node.js (Recommended)
```bash
npm start
# or
node server.js
```
The website will be live at `http://localhost:3000`.

### Option B: Using Python 3
```bash
python server.py
```
The website will be live at `http://localhost:3000`.

---

## Deployment Instructions

### 1. GitHub Pages
1. Push this repository to GitHub.
2. In the repository settings, go to **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** and choose `main` / `root`.
4. Save and the website will be deployed at `https://<username>.github.io/<repo>/`.

### 2. Vercel / Netlify
- **Build Command**: Leave empty (static site).
- **Output Directory**: `.` (or `public`).

---

## Verification and Acceptance Report

| Test Item | Verification Method | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Source PDF Preservation** | SHA-256 Hash Comparison | **PASSED** | Hash: `d352bc207ad503fffa8e084b7121cebf015501f0a5620397c64e5571f9ea44d5` (Exact bit-for-bit match across all locations). |
| **Page Count** | PyPDF Page Inspection | **PASSED** | Exactly 3 pages. |
| **Page Dimensions** | PyPDF MediaBox Check | **PASSED** | Page 1, 2, and 3 are standard Letter size (`612.0 pt × 792.0 pt`). |
| **HTTP Serving & MIME Type** | HTTP HEAD Request | **PASSED** | Returns `200 OK`, `Content-Type: application/pdf`, `Content-Disposition: inline`. |
| **Download PDF** | Automated Link Verification | **PASSED** | Direct link downloads unmodified original document. |
| **View Resume** | DOM & Modal Verification | **PASSED** | Fullscreen modal and in-page preview both render original PDF directly. |
| **Print Resume UI Bypass** | Code Architecture Check | **PASSED** | Triggers direct browser printing of the PDF file rather than printing website HTML. |
| **Automated Browser Print Dialog** | Headless Chrome / Edge | **MANUAL VERIFICATION REQUIRED** | Automated print triggering requires a physical display/user-interactive window in Windows sandbox. Manual verification steps provided below. |

### Manual Print Verification Steps:
1. Start the server (`node server.js`).
2. Open `http://localhost:3000` in Google Chrome, Microsoft Edge, Firefox, or Safari.
3. Click the **Print Resume** button.
4. Confirm that the browser opens the master PDF tab and opens the native print dialog (or allows clicking the PDF viewer's Print icon).
5. In the print preview, verify that:
   - All 3 pages are displayed.
   - Text, headers, and section alignment match the original `AI Manager_GuruCharan.pdf`.
   - No website navigation bars, buttons, or footers appear in the print preview.
