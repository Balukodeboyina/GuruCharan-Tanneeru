import { PrintResumeButton } from './PrintResumeButton.js';
import { DownloadResumeButton } from './DownloadResumeButton.js';

/**
 * ResumePreview Component
 * Embeds and displays the authoritative 3-page master PDF document.
 * Provides dual preview modes: Native PDF engine embed & Continuous high-res page scroll.
 */
export class ResumePreview {
  constructor(options = {}) {
    this.pdfUrl = options.pdfUrl || './assets/GuruCharan_Resume.pdf';
    this.pdfFileName = options.pdfFileName || 'GuruCharan_Resume.pdf';
    this.pageImages = options.pageImages || [
      './assets/page-1.png',
      './assets/page-2.png',
      './assets/page-3.png'
    ];
    this.onExpandClick = options.onExpandClick || null;
    this.currentMode = 'embed'; // 'embed' or 'continuous'
    this.zoomLevel = 100;
  }

  render() {
    const section = document.createElement('section');
    section.className = 'preview-section';
    section.id = 'resumePreviewSection';
    section.setAttribute('aria-label', 'Resume Master PDF Preview');

    section.innerHTML = `
      <div class="preview-card">
        <!-- Preview Toolbar -->
        <div class="preview-toolbar">
          <div class="toolbar-info">
            <div class="doc-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div class="doc-details">
              <h3>${this.pdfFileName}</h3>
              <span>Official 3-Page Document • Letter (612 × 792 pt)</span>
            </div>
          </div>

          <div class="toolbar-controls">
            <!-- View Mode Tabs -->
            <div class="view-tabs" role="tablist" aria-label="Preview display modes">
              <button type="button" class="view-tab-btn ${this.currentMode === 'embed' ? 'active' : ''}" id="tabNativeEmbed" role="tab" aria-selected="${this.currentMode === 'embed'}">
                Native Viewer
              </button>
              <button type="button" class="view-tab-btn ${this.currentMode === 'continuous' ? 'active' : ''}" id="tabContinuous" role="tab" aria-selected="${this.currentMode === 'continuous'}">
                Multi-Page View
              </button>
            </div>

            <!-- Fullscreen / Dedicated View -->
            <button type="button" class="toolbar-btn" id="openDedicatedModalBtn" title="Open Dedicated Fullscreen Viewer" aria-label="Open Fullscreen Viewer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
              <span>Full View</span>
            </button>

            <!-- Open in New Tab -->
            <a href="${this.pdfUrl}" target="_blank" rel="noopener noreferrer" class="toolbar-btn" title="Open PDF file directly in new tab">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>New Tab</span>
            </a>

            <!-- Toolbar Print Button -->
            <button type="button" class="toolbar-btn" id="toolbarPrintBtn" title="Print original PDF">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print</span>
            </button>

            <!-- Toolbar Download Button -->
            <a href="${this.pdfUrl}" download="${this.pdfFileName}" class="toolbar-btn" title="Download master PDF" style="text-decoration: none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download</span>
            </a>
          </div>
        </div>

        <!-- Document Viewport -->
        <div class="preview-viewport" id="previewViewportContainer">
          <!-- Dynamically switched between native embed & continuous pages -->
          <div id="viewportDisplayArea" style="width: 100%; display: flex; justify-content: center;"></div>
        </div>
      </div>
    `;

    this.bindEvents(section);
    this.renderDisplayArea(section.querySelector('#viewportDisplayArea'));

    return section;
  }

  renderDisplayArea(container) {
    if (!container) return;
    container.innerHTML = '';

    if (this.currentMode === 'embed') {
      const embedEl = document.createElement('object');
      embedEl.className = 'embed-pdf-container';
      embedEl.data = `${this.pdfUrl}#toolbar=1&navpanes=0&view=FitH`;
      embedEl.type = 'application/pdf';
      embedEl.setAttribute('aria-label', 'Embedded 3-page master PDF resume');

      // Fallback for browsers / mobile devices that don't support inline object PDF rendering
      embedEl.innerHTML = `
        <div class="embed-fallback-card">
          <h4>Master PDF Resume Ready</h4>
          <p>Your browser or device does not support inline PDF embedding directly inside this window frame. You can view all 3 pages seamlessly using our Multi-Page mode, or open the PDF directly.</p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary" id="switchContinuousFallbackBtn">
              Switch to Multi-Page View
            </button>
            <a href="${this.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              Open Native PDF Tab
            </a>
          </div>
        </div>
      `;

      container.appendChild(embedEl);

      const switchBtn = embedEl.querySelector('#switchContinuousFallbackBtn');
      if (switchBtn) {
        switchBtn.addEventListener('click', () => {
          this.setMode('continuous');
        });
      }
    } else {
      // Continuous Multi-Page View (3 high-fidelity pages rendered identically to PDF)
      const multiContainer = document.createElement('div');
      multiContainer.className = 'multi-page-container';

      this.pageImages.forEach((imgSrc, idx) => {
        const pageWrapper = document.createElement('div');
        pageWrapper.className = 'resume-page-wrapper';
        pageWrapper.id = `resumePage${idx + 1}`;

        pageWrapper.innerHTML = `
          <div class="resume-page-header">Page ${idx + 1} of 3</div>
          <img src="${imgSrc}" alt="GuruCharan Tanneeru Resume - Page ${idx + 1} of 3" class="resume-page-img" loading="${idx === 0 ? 'eager' : 'lazy'}">
        `;

        multiContainer.appendChild(pageWrapper);
      });

      container.appendChild(multiContainer);
    }
  }

  setMode(mode) {
    if (this.currentMode === mode) return;
    this.currentMode = mode;

    const tabNative = document.getElementById('tabNativeEmbed');
    const tabContinuous = document.getElementById('tabContinuous');

    if (tabNative && tabContinuous) {
      if (mode === 'embed') {
        tabNative.classList.add('active');
        tabNative.setAttribute('aria-selected', 'true');
        tabContinuous.classList.remove('active');
        tabContinuous.setAttribute('aria-selected', 'false');
      } else {
        tabContinuous.classList.add('active');
        tabContinuous.setAttribute('aria-selected', 'true');
        tabNative.classList.remove('active');
        tabNative.setAttribute('aria-selected', 'false');
      }
    }

    const displayArea = document.getElementById('viewportDisplayArea');
    if (displayArea) {
      this.renderDisplayArea(displayArea);
    }
  }

  bindEvents(section) {
    const tabNative = section.querySelector('#tabNativeEmbed');
    const tabContinuous = section.querySelector('#tabContinuous');
    const openDedicatedModalBtn = section.querySelector('#openDedicatedModalBtn');
    const toolbarPrintBtn = section.querySelector('#toolbarPrintBtn');

    if (tabNative) {
      tabNative.addEventListener('click', () => this.setMode('embed'));
    }
    if (tabContinuous) {
      tabContinuous.addEventListener('click', () => this.setMode('continuous'));
    }

    if (openDedicatedModalBtn) {
      openDedicatedModalBtn.addEventListener('click', () => {
        if (typeof this.onExpandClick === 'function') {
          this.onExpandClick();
        }
      });
    }

    if (toolbarPrintBtn) {
      const printer = new PrintResumeButton({
        pdfUrl: this.pdfUrl,
        pdfFileName: this.pdfFileName
      });
      toolbarPrintBtn.addEventListener('click', () => printer.triggerPrint());
    }
  }
}
