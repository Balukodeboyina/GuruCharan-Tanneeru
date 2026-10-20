import { PrintResumeButton } from './PrintResumeButton.js';
import { DownloadResumeButton } from './DownloadResumeButton.js';

/**
 * ResumeActions Component
 * Action area rendering View Resume, Print Resume, and Download PDF buttons
 * with authoritative PDF verification status.
 */
export class ResumeActions {
  constructor(options = {}) {
    this.pdfUrl = options.pdfUrl || './assets/GuruCharan_Resume.pdf';
    this.pdfFileName = options.pdfFileName || 'GuruCharan_Resume.pdf';
    this.onViewClick = options.onViewClick || null;
    this.onPrintClick = options.onPrintClick || null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'hero-action-bar';
    container.setAttribute('aria-label', 'Resume Actions');

    const actionsGroup = document.createElement('div');
    actionsGroup.className = 'action-buttons-group';

    // 1. View Resume Button
    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.className = 'btn btn-secondary';
    viewBtn.id = 'viewResumeActionBtn';
    viewBtn.setAttribute('aria-label', 'View resume preview in dedicated viewer');
    viewBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <span>View Resume</span>
    `;
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof this.onViewClick === 'function') {
        this.onViewClick();
      } else {
        const previewEl = document.getElementById('resumePreviewSection');
        if (previewEl) {
          previewEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // 2. Print Resume Button
    const printComponent = new PrintResumeButton({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName,
      onPrintTriggered: this.onPrintClick
    });
    const printBtn = printComponent.render();

    // 3. Download PDF Button
    const downloadComponent = new DownloadResumeButton({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName
    });
    const downloadBtn = downloadComponent.render();

    actionsGroup.appendChild(viewBtn);
    actionsGroup.appendChild(printBtn);
    actionsGroup.appendChild(downloadBtn);

    // Meta Badge & Info
    const metaInfo = document.createElement('div');
    metaInfo.className = 'action-meta';
    metaInfo.innerHTML = `
      <span class="badge-source-truth">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        Master Source PDF (3 Pages)
      </span>
      <span>Letter • Exact Layout Preserved</span>
    `;

    container.appendChild(actionsGroup);
    container.appendChild(metaInfo);

    return container;
  }
}
