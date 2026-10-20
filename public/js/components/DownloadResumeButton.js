/**
 * DownloadResumeButton Component
 * Downloads the unmodified master PDF resume directly with clean naming.
 */
export class DownloadResumeButton {
  constructor(options = {}) {
    this.pdfUrl = options.pdfUrl || './assets/GuruCharan_Resume.pdf';
    this.pdfFileName = options.pdfFileName || 'GuruCharan_Resume.pdf';
    this.container = options.container || null;
  }

  render() {
    const link = document.createElement('a');
    link.href = this.pdfUrl;
    link.download = this.pdfFileName;
    link.className = 'btn btn-download';
    link.id = 'downloadResumeBtn';
    link.setAttribute('role', 'button');
    link.setAttribute('aria-label', `Download original resume PDF: ${this.pdfFileName}`);
    link.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      <span>Download PDF</span>
    `;

    link.addEventListener('click', (e) => {
      // Allow default link download, but ensure robust execution
      this.handleDownload(e);
    });

    return link;
  }

  handleDownload(e) {
    console.info(`Triggering direct download for ${this.pdfFileName} from ${this.pdfUrl}`);
  }
}
