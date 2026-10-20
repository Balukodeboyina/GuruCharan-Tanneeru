import { PrintResumeButton } from './PrintResumeButton.js';
import { DownloadResumeButton } from './DownloadResumeButton.js';

/**
 * ResumeViewer Component
 * Full-screen, distraction-free dedicated resume viewing modal.
 * Embeds the master PDF with dedicated Print, Download, and Navigation actions.
 */
export class ResumeViewer {
  constructor(options = {}) {
    this.pdfUrl = options.pdfUrl || './assets/GuruCharan_Resume.pdf';
    this.pdfFileName = options.pdfFileName || 'GuruCharan_Resume.pdf';
    this.modalEl = null;
    this.isOpen = false;
  }

  render() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'dedicatedResumeModal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Dedicated Resume Document Viewer');

    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title-area">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem; color: #ffffff;">GuruCharan Tanneeru — Master Resume</div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Original 3-Page Document • AI Manager_GuruCharan.pdf</div>
            </div>
          </div>

          <div class="modal-actions">
            <!-- Modal Print Button -->
            <button type="button" class="btn btn-sm btn-print" id="modalPrintBtn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print</span>
            </button>

            <!-- Modal Download Button -->
            <a href="${this.pdfUrl}" download="${this.pdfFileName}" class="btn btn-sm btn-secondary" style="text-decoration: none;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download</span>
            </a>

            <!-- Close Modal Button -->
            <button type="button" class="btn btn-sm btn-outline" id="closeModalBtn" style="color: #ffffff; border-color: rgba(255,255,255,0.2);" aria-label="Close dedicated viewer">
              ✕
            </button>
          </div>
        </div>

        <div class="modal-body" id="modalBodyArea">
          <iframe src="${this.pdfUrl}#toolbar=1&navpanes=0&view=FitH" title="Full Master Resume Document" width="100%" height="100%"></iframe>
        </div>
      </div>
    `;

    this.modalEl = overlay;
    this.bindEvents();

    return overlay;
  }

  bindEvents() {
    if (!this.modalEl) return;

    const closeBtn = this.modalEl.querySelector('#closeModalBtn');
    const modalPrintBtn = this.modalEl.querySelector('#modalPrintBtn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (modalPrintBtn) {
      const printer = new PrintResumeButton({
        pdfUrl: this.pdfUrl,
        pdfFileName: this.pdfFileName
      });
      modalPrintBtn.addEventListener('click', () => printer.triggerPrint());
    }

    // Click outside backdrop to close
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    if (!this.modalEl) return;
    this.modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('open');
    document.body.style.overflow = '';
    this.isOpen = false;
  }
}
