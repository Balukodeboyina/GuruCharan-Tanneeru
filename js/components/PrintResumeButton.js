/**
 * PrintResumeButton Component
 * Authoritative PDF print trigger preserving all 3 pages, original typography,
 * dimensions, and layout without printing website UI.
 */
export class PrintResumeButton {
  constructor(options = {}) {
    this.pdfUrl = options.pdfUrl || './assets/GuruCharan_Resume.pdf';
    this.pdfFileName = options.pdfFileName || 'GuruCharan_Resume.pdf';
    this.container = options.container || null;
    this.onPrintTriggered = options.onPrintTriggered || null;
    this._iframe = null;
  }

  render() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary btn-print';
    button.id = 'printResumeBtn';
    button.setAttribute('aria-label', 'Print original 3-page resume PDF');
    button.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      <span>Print Resume</span>
    `;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.triggerPrint();
    });

    return button;
  }

  /**
   * Primary print workflow:
   * 1. Opens the authoritative PDF directly in a new window/tab.
   * 2. Attempts silent iframe print dialog invocation where supported.
   * 3. Displays informative fallback guidance for Ctrl+P / Cmd+P.
   */
  triggerPrint() {
    this.showPrintGuidanceToast();

    // Open the PDF in a dedicated tab so the visitor has full native browser printing controls
    const printWindow = window.open(this.pdfUrl, '_blank');

    if (!printWindow || printWindow.closed || typeof printWindow.closed === 'undefined') {
      // Popup blocked - show explicit direct link
      this.showPopupBlockedAlert();
    } else {
      // Focus the new tab
      try {
        printWindow.focus();
      } catch (e) {
        console.warn('Could not focus print window:', e);
      }
    }

    // Secondary automatic print attempt via hidden iframe for browsers supporting inline PDF print
    this.attemptIframePrint();

    if (typeof this.onPrintTriggered === 'function') {
      this.onPrintTriggered();
    }
  }

  attemptIframePrint() {
    try {
      if (!this._iframe) {
        this._iframe = document.createElement('iframe');
        this._iframe.style.position = 'fixed';
        this._iframe.style.right = '0';
        this._iframe.style.bottom = '0';
        this._iframe.style.width = '0';
        this._iframe.style.height = '0';
        this._iframe.style.border = 'none';
        this._iframe.src = this.pdfUrl;
        document.body.appendChild(this._iframe);

        this._iframe.onload = () => {
          try {
            setTimeout(() => {
              if (this._iframe.contentWindow) {
                this._iframe.contentWindow.focus();
                this._iframe.contentWindow.print();
              }
            }, 600);
          } catch (err) {
            // Browsers often restrict cross-context PDF printing for security reasons
            console.info('Iframe direct print protected by browser sandbox; tab viewer used as primary print path.');
          }
        };
      } else {
        try {
          this._iframe.contentWindow.focus();
          this._iframe.contentWindow.print();
        } catch (e) {
          // Handled via opened tab
        }
      }
    } catch (e) {
      console.warn('Silent iframe printing not permitted:', e);
    }
  }

  showPrintGuidanceToast() {
    let toast = document.getElementById('printResumeToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'printResumeToast';
      toast.className = 'print-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcut = isMac ? '⌘ + P' : 'Ctrl + P';

    toast.innerHTML = `
      <div class="print-toast-header">
        <h5>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Printing Master PDF Resume
        </h5>
        <button type="button" class="btn btn-outline btn-sm" id="closePrintToast" style="color: #cbd5e1; border: none; padding: 2px 6px;">✕</button>
      </div>
      <div class="print-toast-body">
        <p>The original 3-page master PDF has been opened in your browser viewer.</p>
        <p>Press <span class="print-toast-shortcut">${shortcut}</span> or click the <strong>Print icon</strong> inside the PDF viewer to print all 3 pages with exact original layout.</p>
      </div>
      <div class="print-toast-footer">
        <a href="${this.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">Open PDF Direct</a>
        <button type="button" class="btn btn-sm btn-primary" id="dismissPrintToast">Got it</button>
      </div>
    `;

    toast.classList.add('show');

    const closeHandler = () => toast.classList.remove('show');
    toast.querySelector('#closePrintToast').addEventListener('click', closeHandler);
    toast.querySelector('#dismissPrintToast').addEventListener('click', closeHandler);

    // Auto dismiss after 9 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 9000);
  }

  showPopupBlockedAlert() {
    alert(
      'Your browser blocked opening the resume PDF in a new tab.\n\nPlease allow pop-ups for this site, or click "Open PDF Direct" to view and print your resume.'
    );
  }
}
