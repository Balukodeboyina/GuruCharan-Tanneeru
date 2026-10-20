import { ResumeHero } from './components/ResumeHero.js';
import { ResumeActions } from './components/ResumeActions.js';
import { ResumePreview } from './components/ResumePreview.js';
import { ResumeViewer } from './components/ResumeViewer.js';
import { PrintResumeButton } from './components/PrintResumeButton.js';
import { DownloadResumeButton } from './components/DownloadResumeButton.js';

/**
 * Main Application Orchestrator
 */
class ResumeApp {
  constructor() {
    this.pdfUrl = './assets/GuruCharan_Resume.pdf';
    this.pdfFileName = 'GuruCharan_Resume.pdf';
    this.pageImages = [
      './assets/page-1.png',
      './assets/page-2.png',
      './assets/page-3.png'
    ];

    this.viewer = null;
    this.preview = null;
    this.actions = null;
    this.hero = null;
  }

  init() {
    console.info('Initializing GuruCharan Resume Application...');

    // 1. Initialize Dedicated Fullscreen Viewer
    this.viewer = new ResumeViewer({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName
    });
    document.body.appendChild(this.viewer.render());

    // 2. Initialize Hero Section
    this.hero = new ResumeHero();
    const heroMount = document.getElementById('heroMountPoint');
    if (heroMount) {
      heroMount.appendChild(this.hero.render());
    }

    // 3. Initialize Hero Action Bar
    this.actions = new ResumeActions({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName,
      onViewClick: () => this.viewer.open(),
      onPrintClick: () => console.log('Print initiated from hero action bar')
    });
    const actionBarMount = document.getElementById('heroActionBarContainer');
    if (actionBarMount) {
      actionBarMount.appendChild(this.actions.render());
    }

    // 4. Initialize Resume Preview Section
    this.preview = new ResumePreview({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName,
      pageImages: this.pageImages,
      onExpandClick: () => this.viewer.open()
    });
    const previewMount = document.getElementById('previewMountPoint');
    if (previewMount) {
      previewMount.appendChild(this.preview.render());
    }

    // 5. Initialize Header Actions
    this.initHeaderActions();

    // 6. Global Keyboard Shortcuts
    this.initKeyboardShortcuts();

    console.info('GuruCharan Resume Application initialized successfully.');
  }

  initHeaderActions() {
    const headerViewBtn = document.getElementById('headerViewBtn');
    const headerPrintBtn = document.getElementById('headerPrintBtn');
    const headerDownloadBtn = document.getElementById('headerDownloadBtn');

    if (headerViewBtn) {
      headerViewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.viewer.open();
      });
    }

    if (headerPrintBtn) {
      const printer = new PrintResumeButton({
        pdfUrl: this.pdfUrl,
        pdfFileName: this.pdfFileName
      });
      headerPrintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        printer.triggerPrint();
      });
    }

    if (headerDownloadBtn) {
      headerDownloadBtn.href = this.pdfUrl;
      headerDownloadBtn.download = this.pdfFileName;
    }
  }

  initKeyboardShortcuts() {
    const printer = new PrintResumeButton({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName
    });

    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      // Check for 'p' or 'P' without modifiers (or allow Cmd/Ctrl+P to trigger our dedicated print toast)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        // Intercept standard window.print to prevent printing the web HTML,
        // redirecting directly to the authoritative PDF print!
        e.preventDefault();
        printer.triggerPrint();
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.key === 'v' || e.key === 'V') {
          this.viewer.open();
        } else if (e.key === 'd' || e.key === 'D') {
          const downloadAnchor = document.createElement('a');
          downloadAnchor.href = this.pdfUrl;
          downloadAnchor.download = this.pdfFileName;
          downloadAnchor.click();
        }
      }
    });
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new ResumeApp();
  app.init();
});
